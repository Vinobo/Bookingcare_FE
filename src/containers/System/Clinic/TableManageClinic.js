import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import './TableManageClinic.scss';
import * as actions from "../../../store/actions";
import { deleteClinicService, getAllClinic } from '../../../services/userService';
import { toast } from 'react-toastify';


class TableManageClinic extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataCLinic: [],

    }
  }

  handleGetDataClinic = async () => {
    let res = await getAllClinic();
    if (res && res.errCode === 0) {
      this.setState({
        dataCLinic: res.data ? res.data.reverse() : []
      })
    }
  }

  async componentDidMount() {
    this.handleGetDataClinic()
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {

  }

  handleEditClinic = (clinic) => {
    if (this.props.history) {
      this.props.history.push(`/system/edit-clinic/${clinic.id}`)
    }
  }

  handleDeleteClinic = async (clinic) => {
    let res = await deleteClinicService(clinic.id);
    if (res && res.errCode === 0) {
      toast.success('Delete the clinic succeed!')
      this.handleGetDataClinic()
    } else {
      toast.error('Delete the clinic failed!')
    }
  }

  toCreateClinic = () => {
    if (this.props.history) {
      this.props.history.push(`/system/create-clinic`)
    }
  }

  render() {
    let dataCLinic = this.state.dataCLinic;

    return (
      <div className='mamage-clinic'>
        <div className='container'>
          <div className='title-mn-clinic'><FormattedMessage id="admin.manage-clinic.title" /></div>
          <div className='add-clinic'>
            <button onClick={() => this.toCreateClinic()} >
              <i className="fas fa-plus"></i> <FormattedMessage id="admin.manage-clinic.create-clinic" />
            </button>
          </div>
          <table id='table-manage-clinic'>
            <tbody>
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th>IntroHTML</th>
                <th><FormattedMessage id="user-manage.action" /></th>
              </tr>

              {dataCLinic && dataCLinic.length > 0 &&
                dataCLinic.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td className='img-customize' style={{ backgroundImage: `url(${item.image})` }}></td>
                      <td className='block-item'>{item.introHTML}</td>
                      <td className='btn-item'>
                        <button className='btn-edit'
                          onClick={() => this.handleEditClinic(item)}
                        >
                          <i className="far fa-edit"></i>
                        </button>
                        <button className='btn-delete'
                          onClick={() => this.handleDeleteClinic(item)}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </td>
                    </tr>
                  )
                })
              }

            </tbody>
          </table>
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TableManageClinic));

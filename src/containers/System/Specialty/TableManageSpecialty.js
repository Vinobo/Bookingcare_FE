import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import './TableManageSpecialty.scss';
import * as actions from "../../../store/actions";
import { getAllSpecialties } from '../../../services/userService';


class TableManageSpecialty extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSpecialty: [],

    }
  }

  async componentDidMount() {
    let res = await getAllSpecialties();
    if (res && res.errCode === 0) {
      this.setState({
        dataSpecialty: res.data ? res.data : []
      })
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listUsers !== this.props.listUsers) {
      this.setState({
        userRedux: this.props.listUsers
      })
    }
  }

  handleEditSpecialty = (specialty) => {
    if (this.props.history) {
      this.props.history.push(`/system/edit-specialty/${specialty.id}`)
    }
  }

  handleDeleteUser = (user) => {
    this.props.deleteUserRedux(user.id);
  }

  toCreateSpecialty = () => {
    if (this.props.history) {
      this.props.history.push(`/system/create-specialty`)
    }
  }

  render() {
    let dataSpecialty = this.state.dataSpecialty;
    console.log('check prosssss: ', this.props, dataSpecialty)

    return (
      <div className='mamage-specialty'>
        <div className='container'>
          <div className='title-mn-specialty'><FormattedMessage id="menu.specialty.manage-specialty" /></div>
          <div className='add-specialty'>
            <button onClick={() => this.toCreateSpecialty()} >
              <i className="fas fa-plus"></i> Them chuyen khoa
            </button>
          </div>
          <table id='table-manage-specialty'>
            <tbody>
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th>DescriptionHTML</th>
                <th><FormattedMessage id="user-manage.action" /></th>
              </tr>

              {dataSpecialty && dataSpecialty.length > 0 &&
                dataSpecialty.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td className='img-customize' style={{ backgroundImage: `url(${item.image})` }}></td>
                      <td>{item.descriptionHTML}</td>
                      <td>
                        <button className='btn-edit'
                          onClick={() => this.handleEditSpecialty(item)}
                        >
                          <i className="far fa-edit"></i>
                        </button>
                        <button className='btn-delete'
                          onClick={() => this.handleDeleteUser(item)}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TableManageSpecialty));

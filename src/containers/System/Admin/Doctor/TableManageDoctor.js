import React, { Component } from 'react';
// import { Redirect, Route, Switch } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import './TableManageDoctor.scss';
// import * as actions from "../../../../store/actions";
import { deleteDoctorInforService, getAllDoctorInfor } from '../../../../services/userService';
import { toast } from 'react-toastify';
import { LANGUAGES } from '../../../../utils';


class TableManageDoctor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataDoctor: [],

    }
  }

  handleGetDataDoctor = async () => {
    let res = await getAllDoctorInfor();
    if (res && res.errCode === 0) {
      this.setState({
        dataDoctor: res.data ? res.data.reverse() : []
      })
    }
  }

  async componentDidMount() {
    this.handleGetDataDoctor()
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.language !== this.props.language) {
      this.setState({
        dataDoctor: this.state.dataDoctor
      })
    }

    if (prevState.dataDoctor !== this.state.dataDoctor) {
      this.handleGetDataDoctor()
    }
  }

  handleDeleteDoctorInfor = async (doctor) => {
    let res = await deleteDoctorInforService(doctor.id);
    if (res && res.errCode === 0) {
      toast.success('Delete the doctor succeed!');
      this.handleGetDataDoctor()
    } else {
      toast.error('Delete the doctor failed!')
    }
  }

  toCreateDoctorInfor = () => {
    if (this.props.history) {
      this.props.history.push(`/system/create-doctor-infor`)
    }
  }

  render() {
    let dataDoctor = this.state.dataDoctor;
    let { language } = this.props

    return (
      <div className='mamage-doctor'>
        <div className='container'>
          <div className='title-mn-doctor'><FormattedMessage id="menu.admin.manage-doctor" /></div>
          <div className='add-doctor'>
            <button onClick={() => this.toCreateDoctorInfor()} >
              <i className="far fa-edit"></i> <FormattedMessage id="admin.manage-doctor.edit-doctor" />
            </button>
          </div>
          <table id='table-manage-doctor'>
            <tbody>
              <tr>
                <th>First name</th>
                <th>Last name</th>
                <th>Position</th>
                <th>Specialty</th>
                <th>Province</th>
                <th><FormattedMessage id="user-manage.action" /></th>
              </tr>

              {dataDoctor && dataDoctor.length > 0 &&
                dataDoctor.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.positionData ? (language === LANGUAGES.VI ? item.positionData.valueVi : item.positionData.valueEn) : ''}
                      </td>
                      <td>
                        {item.Doctor_Infor ? (item.Doctor_Infor.specialtyData.name) : ''}
                      </td>
                      <td>
                        {item.Doctor_Infor ? (language === LANGUAGES.VI ? item.Doctor_Infor.provinceData.valueVi : item.Doctor_Infor.provinceData.valueEn) : ''}
                      </td>
                      <td className='btn-item'>
                        <button className='btn-delete'
                          onClick={() => this.handleDeleteDoctorInfor(item)}
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
    language: state.app.language
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TableManageDoctor));

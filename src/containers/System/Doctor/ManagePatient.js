import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { LANGUAGES } from '../../../utils';
import { FormattedDate, FormattedMessage } from 'react-intl';
import './ManagePatient.scss';
import DatePicker from '../../../components/Input/DatePicker';
import { getAllPatientForDoctor } from '../../../services/userService';
import moment from 'moment';


class ManagePatient extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf('day').valueOf(),
      dataPatient: []
    }

  }

  async componentDidMount() {
    let { language, user } = this.props;
    let { currentDate } = this.state;
    let formatedDate = new Date(currentDate).getTime();

    this.getDataPatient(user, formatedDate)

  }

  getDataPatient = async (user, formatedDate) => {
    let res = await getAllPatientForDoctor({
      doctorId: user.id,
      date: formatedDate
    })
    if (res && res.errCode === 0) {
      this.setState({
        dataPatient: res.data
      })
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {

    }
  }

  handleOnchangeDatePiker = (date) => {
    this.setState({
      currentDate: date[0]
    }, () => {
      let { user } = this.props;
      let { currentDate } = this.state;
      let formatedDate = new Date(currentDate).getTime();

      this.getDataPatient(user, formatedDate)
    })
  }

  handleBtnConfirm = () => {

  }

  handleBtnRemedy = () => {

  }

  render() {
    let { language } = this.props;
    let { dataPatient } = this.state;
    console.log('checkkkkkkkk state: ', this.state)
    return (
      <div className='container manage-patient '>
        <div className='m-p-title'>
          <FormattedMessage id='manage-patient.title' />
        </div>
        <div className='container'>
          <div className='manage-patient-body'>
            <div className='select-date'>
              <label><FormattedMessage id='common.choose-date' /></label>
              <DatePicker
                className='date'
                onChange={this.handleOnchangeDatePiker}
                selected={this.state.currentDate}
              />
            </div>
            <div className='table-manage-patient'>
              <table>
                <tr>
                  <th>STT</th>
                  <th>Ho va ten</th>
                  <th>Gender</th>
                  <th>Address</th>
                  <th>Time</th>
                  <th>Actions</th>
                </tr>
                {dataPatient && dataPatient.length > 0 ?
                  dataPatient.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td >{index + 1}</td>
                        <td>{item.patientData ? item.patientData.firstName : ''}</td>
                        <td>{item.patientData.genderData.valueVi}</td>
                        <td>{item.patientData.address}</td>
                        <td>{item.timeTypeDataPatient.valueVi}</td>
                        <td className='btn-actions'>
                          <button className='btn-confirm'
                            onClick={() => this.handleBtnConfirm()}
                          >
                            Xác nhận
                          </button>
                          <button className='btn-remedy'
                            onClick={() => this.handleBtnRemedy()}
                          >
                            Gửi hóa đơn
                          </button>
                        </td>
                      </tr>
                    )
                  })
                  :
                  <tr>Không có bệnh nhân</tr>
                }

              </table>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

const mapStateToProps = state => {
  return {
    language: state.app.language,
    user: state.user.userInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);

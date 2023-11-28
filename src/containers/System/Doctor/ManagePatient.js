import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { LANGUAGES } from '../../../utils';
import { FormattedDate, FormattedMessage } from 'react-intl';
import './ManagePatient.scss';
import DatePicker from '../../../components/Input/DatePicker';
import { getAllPatientForDoctor, postSendRemedy } from '../../../services/userService';
import RemedyModal from './RemedyModal';
import moment from 'moment';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';

class ManagePatient extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf('day').valueOf(),
      dataPatient: [],
      isOpenRemedyModal: false,
      dataModal: {},
      isShowLoading: false,
    }

  }

  async componentDidMount() {
    this.getDataPatient()
  }

  getDataPatient = async () => {
    let { language, user } = this.props;
    let { currentDate } = this.state;
    let formatedDate = new Date(currentDate).getTime();

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
    }, async () => {
      await this.getDataPatient()
    })
  }

  handleBtnConfirm = (item) => {
    let data = {
      doctorId: item.doctorId,
      patientId: item.patientId,
      email: item.patientData.email,
      timeType: item.timeType,
      patientName: item.patientData.firstName
    }
    this.setState({
      isOpenRemedyModal: true,
      dataModal: data
    })
  }

  closeRemedyModal = () => {
    this.setState({
      isOpenRemedyModal: false,
      dataModal: {}
    })
  }

  sendRemedy = async (dataChild) => {
    let { dataModal } = this.state;
    this.setState({
      isShowLoading: true
    })
    let res = await postSendRemedy({
      email: dataChild.email,
      imgBase64: dataChild.imgBase64,
      doctorId: dataModal.doctorId,
      patientId: dataModal.patientId,
      timeType: dataModal.timeType,
      patientName: dataModal.patientName,
      language: this.props.language
    })
    if (res && res.errCode === 0) {
      this.setState({
        isShowLoading: false
      })
      toast.success('Send remedy succeed')
      this.closeRemedyModal();
      await this.getDataPatient()
    } else {
      this.setState({
        isShowLoading: false
      })
      toast.error('Something wrongs...');
      console.log('error send remedy: ', res)
    }
  }

  render() {
    let { language } = this.props;
    let { dataPatient, isOpenRemedyModal, dataModal } = this.state;
    console.log('cácgasfchgascgsa', this.state)

    return (
      <>
        <LoadingOverlay
          active={this.state.isShowLoading}
          spinner
          text='Loading...'
        >
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
                    value={this.state.currentDate}
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
                        let time = language === LANGUAGES.VI ?
                          item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn;
                        let gender = language === LANGUAGES.VI ?
                          item.patientData.genderData.valueVi : item.patientData.genderData.valueEn
                        return (
                          <tr key={index}>
                            <td >{index + 1}</td>
                            <td>{item.patientData ? item.patientData.firstName : ''}</td>
                            <td>{gender}</td>
                            <td>{item.patientData.address}</td>
                            <td>{time}</td>
                            <td className='btn-actions'>
                              <button className='btn-confirm'
                                onClick={() => this.handleBtnConfirm(item)}
                              >
                                Xác nhận
                              </button>
                            </td>
                          </tr>
                        )
                      })
                      :
                      <tr>
                        <td colSpan='6' style={{ textAlign: 'center' }}>Không có bệnh nhân</td>
                      </tr>
                    }

                  </table>
                </div>
              </div>
            </div>
          </div >
          <RemedyModal
            isOpenModal={isOpenRemedyModal}
            dataModal={dataModal}
            closeRemedyModal={this.closeRemedyModal}
            sendRemedy={this.sendRemedy}
          />
        </LoadingOverlay>
      </>
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

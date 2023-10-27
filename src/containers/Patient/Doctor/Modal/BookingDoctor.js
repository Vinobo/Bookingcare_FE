import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { LANGUAGES } from '../../../../utils';
import { FormattedMessage } from 'react-intl';
import './BookingDoctor.scss';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import { getAddressFeeDoctorById, postPatientBookAppointment } from '../../../../services/userService';
import { NumericFormat } from 'react-number-format';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions';
import Select from 'react-select';
import { toast } from 'react-toastify';
import moment from 'moment';
import localization from 'moment/locale/vi';



class BookingDoctor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      priceModal: {},

      fullName: '',
      selectedGender: '',
      birthday: '',
      phoneNumber: '',
      email: '',
      address: '',
      reason: '',
      doctorId: '',
      genders: '',
      timeType: '',
      date: ''
    }

  }

  async componentDidMount() {
    let { language } = this.props;
    this.props.getGender();

  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      this.setState({
        genders: this.buildDataGender(this.props.genders)
      })
    }

    if (this.props.dataTime.doctorId !== prevProps.dataTime.doctorId) {
      let res = await getAddressFeeDoctorById(this.props.dataTime.doctorId);

      if (res && res.errCode === 0) {

        this.setState({
          priceModal: res.data.priceData
        })
      }
    }
    if (this.props.dataTime !== prevProps.dataTime) {
      if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
        let doctorId = this.props.dataTime.doctorId;
        let timeType = this.props.dataTime.timeType;
        let date = this.props.dataTime.date
        this.setState({
          doctorId: doctorId,
          timeType: timeType,
          date: date
        })
      }
    }

    if (this.props.genders !== prevProps.genders) {

      this.setState({
        genders: this.buildDataGender(this.props.genders)
      })
    }
  }

  buildDataGender = (data) => {
    let result = [];
    let language = this.props.language;

    if (data && data.length > 0) {
      data.map(item => {
        let object = {};
        object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
        object.value = item.keyMap;
        result.push(object)
      })
    }
    return result;
  }

  handleOnchangeInput = (event, id) => {
    let valueInput = event.target.value;
    let stateCopy = { ...this.state };
    stateCopy[id] = valueInput;
    this.setState({
      ...stateCopy
    })
  }

  handleOnchangeDatePiker = (date) => {
    this.setState({
      birthday: date[0]
    })
  }

  handleChangeSelectGender = (selectedOption) => {
    this.setState({ selectedGender: selectedOption })
  }

  handleConfirmBooking = async () => {
    //validate input
    let birthday = new Date(this.state.birthday).getTime();
    let timeString = this.buildTimeBooking(this.props.dataTime);
    let doctorName = this.buildDoctorName(this.props.dataTime);

    let res = await postPatientBookAppointment({
      fullName: this.state.fullName,
      selectedGender: this.state.selectedGender.value,
      birthday: birthday,
      date: this.state.date,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      address: this.state.address,
      reason: this.state.reason,
      doctorId: this.state.doctorId,
      timeType: this.state.timeType,
      language: this.props.language,
      timeString: timeString,
      doctorName: doctorName
    })

    if (res && res.errCode === 0) {
      toast.success('Booking a new appointment succeed!')
      this.props.closeBookingDoctor();
    } else {
      toast.error('Booking a new appointment error!')
    }
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  buildTimeBooking = (dataTime) => {
    let { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi
        : dataTime.timeTypeData.valueEn;

      let date = language === LANGUAGES.VI ?
        this.capitalizeFirstLetter(moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY'))
        :
        moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY');

      return `${time} - ${date}`
    }
    return ''
  }

  buildDoctorName = (dataTime) => {
    let { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let name = language === LANGUAGES.VI ?
        `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
        :
        `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`;

      return name;
    }
    return ''
  }

  render() {
    let { language, isOpenModal, closeBookingDoctor, dataTime } = this.props;
    let { priceModal } = this.state;
    let doctorId = '';
    if (dataTime && !_.isEmpty(dataTime)) {
      doctorId = dataTime.doctorId
    }
    //another way
    // let doctorId = dataTime && _.isEmpty(dataTime) ? dataTime.doctorId : '';

    return (
      <Modal
        isOpen={isOpenModal}
        className='booking-modal-container'
        size='lg'
        centered
      >
        <div className='booking-modal-content'>
          <div className='booking-modal-header'>
            <div className='left'>
              <span className='booking-title'>
                <FormattedMessage id="patient.booking-modal.title" />
              </span>
              <div className='doctor-infor'>
                <ProfileDoctor
                  doctorId={doctorId}
                  dataTime={dataTime}
                  isShowDescriptionDoctor={false}
                />
              </div>
            </div>
            <span className='right'
              onClick={closeBookingDoctor}
            >
              <i className="far fa-window-close"></i>
            </span>
          </div>
          <div className='booking-modal-body'>
            <div className='booking-row'>
              <div className='booking-item'>
                <label><FormattedMessage id="patient.booking-modal.fullName" /></label>
                <input
                  value={this.state.fullName}
                  onChange={(event) => this.handleOnchangeInput(event, 'fullName')}
                ></input>
              </div>
              <div className='booking-item'>
                <label><FormattedMessage id="patient.booking-modal.gender" /></label>
                <Select
                  value={this.state.selectedGender}
                  onChange={this.handleChangeSelectGender}
                  options={this.state.genders}
                  placeholder={<FormattedMessage id='common.choose-gender' />}
                />
              </div>
              <div className='booking-item'>
                <label><FormattedMessage id="patient.booking-modal.birthday" /></label>
                <DatePicker
                  value={this.state.birthday}
                  onChange={this.handleOnchangeDatePiker}
                />
              </div>
              <div className='booking-item'>
                <label><FormattedMessage id="patient.booking-modal.phoneNumber" /></label>
                <input
                  value={this.state.phoneNumber}
                  onChange={(event) => this.handleOnchangeInput(event, 'phoneNumber')}
                ></input>
              </div>
              <div className='booking-item'>
                <label>Email</label>
                <input
                  value={this.state.email}
                  onChange={(event) => this.handleOnchangeInput(event, 'email')}
                ></input>
              </div>
              <div className='booking-item'>
                <label><FormattedMessage id="patient.booking-modal.address" /></label>
                <input
                  value={this.state.address}
                  onChange={(event) => this.handleOnchangeInput(event, 'address')}
                ></input>
              </div>
              <div className='booking-item reason'>
                <label><FormattedMessage id="patient.booking-modal.reason" /></label>
                <input
                  value={this.state.reason}
                  onChange={(event) => this.handleOnchangeInput(event, 'reason')}
                ></input>
              </div>
            </div>

            <div className='priceModal'>
              <span className='price-title'><FormattedMessage id="common.price-examination" /></span>
              <span className='price-approx'>
                {priceModal && language === LANGUAGES.VI
                  &&
                  <NumericFormat
                    className='currency-vnd'
                    value={priceModal.valueVi}
                    displayType={'text'}
                    thousandSeparator=","
                  />
                }
                {priceModal && language === LANGUAGES.EN
                  &&
                  <NumericFormat
                    value={priceModal.valueEn}
                    displayType={'text'}
                    thousandSeparator=","
                    suffix='$'
                  />
                }
              </span>
            </div>
          </div>
          <div className='booking-modal-footer'>
            <button className='btn-confirm'
              onClick={() => this.handleConfirmBooking()}
            ><FormattedMessage id="patient.booking-modal.confirm" />
            </button>
            <button className='btn-cancel'
              onClick={closeBookingDoctor}
            >
              <FormattedMessage id="common.cancel" />
            </button>
          </div>
        </div>
      </Modal >
    );
  }
}

const mapStateToProps = state => {
  return {
    language: state.app.language,
    genders: state.admin.genders,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getGender: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingDoctor);

import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { LANGUAGES } from '../../../../utils';
import { FormattedMessage } from 'react-intl';
import './BookingDoctor.scss';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import { getAddressFeeDoctorById } from '../../../../services/userService';
import { NumericFormat } from 'react-number-format';


class BookingDoctor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      priceModal: {}
    }

  }

  async componentDidMount() {
    let { language } = this.props;

  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {

    }
    if (this.props.dataTime.doctorId !== prevProps.dataTime) {
      let res = await getAddressFeeDoctorById(this.props.dataTime.doctorId);
      if (res && res.errCode === 0) {
        this.setState({
          priceModal: res.data
        })
      }
    }
  }

  render() {
    let { language, isOpenModal, closeBookingDoctor, dataTime } = this.props;
    let { priceModal } = this.state;
    let doctorId = '';
    if (dataTime && !_.isEmpty(dataTime)) {
      doctorId = dataTime.doctorId
    }

    // let doctorId = dataTime && _.isEmpty(dataTime) ? dataTime.doctorId : '';
    return (
      <Modal
        isOpen={isOpenModal}
        className='booking-modal-container'
        size='lg'
      >
        <div className='booking-modal-content'>
          <div className='booking-modal-header'>
            <div className='left'>
              <span className='booking-title'>Đặt lịch khám</span>
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
            <div className='priceModal'>
              Giá khám:
              <span className='price-approx'>
                {priceModal && priceModal.priceData && language === LANGUAGES.VI
                  &&
                  <NumericFormat
                    className='currency-vnd'
                    value={priceModal.priceData.valueVi}
                    displayType={'text'}
                    thousandSeparator=","
                  />
                }
                {priceModal && priceModal.priceData && language === LANGUAGES.EN
                  &&
                  <NumericFormat
                    value={priceModal.priceData.valueEn}
                    displayType={'text'}
                    thousandSeparator=","
                    suffix='$'
                  />
                }
              </span>
            </div>
            <div className='booking-row'>
              <div className='booking-item'>
                <label>Họ tên</label>
                <input></input>
              </div>
              <div className='booking-item'>
                <label>Giới tính</label>
                <input></input>
              </div>
              <div className='booking-item'>
                <label>Năm sinh</label>
                <input></input>
              </div>
              <div className='booking-item'>
                <label>Số điện thoại</label>
                <input></input>
              </div>
              <div className='booking-item'>
                <label>Địa chỉ liên hệ</label>
                <input></input>
              </div>
              <div className='booking-item'>
                <label>Đặt cho ai</label>
                <input></input>
              </div>
              <div className='booking-item reason'>
                <label>Lý do khám</label>
                <input></input>
              </div>
            </div>
          </div>
          <div className='booking-modal-footer'>
            <button className='btn-confirm'>Xác nhận đặt khám</button>
            <button className='btn-cancel'
              onClick={closeBookingDoctor}
            >
              Cancle
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = dispatch => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingDoctor);

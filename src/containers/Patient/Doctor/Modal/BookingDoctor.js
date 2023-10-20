import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { LANGUAGES } from '../../../../utils';
import { FormattedMessage } from 'react-intl';
import './BookingDoctor.scss';


class BookingDoctor extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }

  }

  async componentDidMount() {
    let { language } = this.props;

  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {

    }
  }

  render() {
    let { language, isOpenModal, closeBookingDoctor, dataTime } = this.props;

    return (
      <Modal
        isOpen={isOpenModal}
        toggle={() => { this.toggle() }}
        className='booking-modal-container'
        size='lg'
      >
        <div className='booking-modal-content'>
          <div className='booking-modal-header'>
            <div className='left'>
              <span>Đặt lịch khám</span>
              <div className='doctor-infor'>
                asdasd
              </div>
            </div>
            <span className='right'
              onClick={closeBookingDoctor}
            >
              <i className="far fa-window-close"></i>
            </span>
          </div>
          <div className='booking-modal-body'>
            <div className='price'>
              Giá khám 20000
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
            <button className='btn-confirm'>Xác nhận</button>
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

import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { LANGUAGES } from '../../utils';
import { FormattedMessage } from 'react-intl';
import { postVerifyAppointment } from '../../services/userService';
import Header from '../HomePage/Header';
import './VerifyEmail.scss'


class VerifyEmail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      statusVerify: false,
      errCode: 0
    }

  }

  async componentDidMount() {
    let { language } = this.props;

    if (this.props.location && this.props.location.search) {
      let urlParams = new URLSearchParams(this.props.location.search);
      let token = urlParams.get('token');
      let doctorId = urlParams.get('doctorId');

      let res = await postVerifyAppointment({
        token: token,
        doctorId: doctorId
      })

      if (res && res.errCode === 0) {
        this.setState({
          statusVerify: true,
          errCode: res.errCode
        })
      } else {
        this.setState({
          statusVerify: true,
          errCode: res && res.errCode ? res.errCode : -1
        })
      }
    }


  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {

    }
  }

  render() {
    let { language } = this.props;
    let { statusVerify, errCode } = this.state;

    return (
      <>
        <Header isShowBanner={false} />
        <div className='container verify-booking'>
          {statusVerify == - false ?
            <div className='infor-booking'>Loanding data...</div>
            :
            <div className='infor-booking'>
              {errCode === 0 ?
                <div className='verify-succed'>Xác nhận lịch hẹn thành công!</div>
                :
                <div className='verify-failed'>Lịch hẹn không tồn tại hoặc đã được xác nhận! </div>
              }
            </div>

          }
        </div>
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);

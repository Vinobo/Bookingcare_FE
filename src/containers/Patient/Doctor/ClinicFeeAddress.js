import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import './scss/ClinicFeeAddress.scss';
import { LANGUAGES } from '../../../utils';
import { getScheduleDoctorByDate } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';

// import

class ClinicFeeAddress extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isShowDetailInfor: false
    }

  }

  async componentDidMount() {
    let { language } = this.props;

  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {

      this.setState({

      })
    }
  }

  showHideFee = (status) => {
    this.setState({
      isShowDetailInfor: status
    })
  }

  render() {
    let { language } = this.props;
    let { isShowDetailInfor } = this.state

    return (
      <div className='container clinic-fee-address'>
        <div className='clinic-address'>
          <div className='text-title'>ĐỊA CHỈ KHÁM</div>
          <div className='name-clinic'>Phòng khám Bệnh viện Đại học Y Dược 1</div>
          <div className='address'>20-22 Dương Quang Trung, Phường 12, Quận 10, Tp. HCM</div>
        </div>
        <div className='fee'>
          {isShowDetailInfor === false ?
            <>
              <div>GIÁ KHÁM: 250.000đ - 500.000đ.
                <span className='btn-on-off'
                  onClick={() => this.showHideFee(true)}
                >
                  Xem chi tiết
                </span>
              </div>
            </>
            :
            <>
              <div className='text-title'>GIÁ KHÁM:</div>
              <div className='container-fee'>
                <div className='detail-fee'>
                  <div className='price'>
                    <span className='left'>Giá khám</span>
                    <span className='right'>250.000đ - 500.000đ</span>
                  </div>

                  <div className='note'>Giá tư vấn 15 phút: 250.000vnđ
                    Giá tư vấn 30 phút: 500.000vnđ
                  </div>
                </div>

                <div className='payment'>Phòng khám có thanh toán bằng hình thức tiền mặt và quẹt thẻ</div>
              </div>
              <div className='btn-on-off'>
                <span onClick={() => this.showHideFee(false)}>
                  Ẩn bảng giá
                </span>
              </div>
            </>
          }
        </div>
        <div className='insurance'></div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ClinicFeeAddress);

import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import './scss/AddressDoctor.scss';
import { LANGUAGES } from '../../../utils';
import { getAddressFeeDoctorById } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import { NumericFormat } from 'react-number-format';

// import

class AddressDoctor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isShowDetailFee: false,
      isShowDetailInsurance: false,
      addressFeeDoctor: {},
    }

  }

  async componentDidMount() {
    let { language } = this.props;

  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {

    }
    if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
      let res = await getAddressFeeDoctorById(this.props.doctorIdFromParent);
      if (res && res.errCode === 0) {
        this.setState({
          addressFeeDoctor: res.data
        })
      }

    }
  }



  showHideFee = (status) => {
    this.setState({
      isShowDetailFee: status
    })
  }

  showHideInsurance = (status) => {
    this.setState({
      isShowDetailInsurance: status
    })
  }

  render() {
    let { language } = this.props;
    let { isShowDetailFee, isShowDetailInsurance, addressFeeDoctor } = this.state
    console.log('Check stateeeeeeeeeeeeeeeeeeeeee: ', this.state)

    return (
      <div className='container address-doctor'>
        <div className='clinic-address'>
          <div className='text-title'>
            <FormattedMessage id="common.address-clinic" />
          </div>
          <div className='name-clinic'>
            {addressFeeDoctor && addressFeeDoctor.nameClinic ? addressFeeDoctor.nameClinic : ''}
          </div>
          <div className='address'>
            {addressFeeDoctor && addressFeeDoctor.addressClinic ? addressFeeDoctor.addressClinic : ''}
          </div>
        </div>
        <div className='fee'>
          {isShowDetailFee === false ?
            <>
              <div>
                <span className='text-title'>
                  <FormattedMessage id="common.price-examination" />
                </span>
                <span className='price-approx'>
                  {addressFeeDoctor && addressFeeDoctor.priceData && language === LANGUAGES.VI
                    &&
                    <NumericFormat
                      className='currency-vnd'
                      value={addressFeeDoctor.priceData.valueVi}
                      displayType={'text'}
                      thousandSeparator=","
                    />
                  }
                  {addressFeeDoctor && addressFeeDoctor.priceData && language === LANGUAGES.EN
                    &&
                    <NumericFormat
                      value={addressFeeDoctor.priceData.valueEn}
                      displayType={'text'}
                      thousandSeparator=","
                      suffix='$'
                    />
                  }
                </span>
                <span className='btn-showOn'
                  onClick={() => this.showHideFee(true)}
                >
                  <FormattedMessage id="common.see-details" />
                </span>
              </div>
            </>
            :
            <>
              <div className='container-fee'>
                <div className='text-title'>
                  <FormattedMessage id="common.price-examination" />
                </div>
                <div className='detail-fee'>
                  <div className='price'>
                    <span className='left'>
                      <FormattedMessage id="common.price-examination" />
                    </span>
                    <span className='right'>
                      {addressFeeDoctor && addressFeeDoctor.priceData && language === LANGUAGES.VI
                        &&
                        <NumericFormat
                          className='currency-vnd'
                          value={addressFeeDoctor.priceData.valueVi}
                          displayType={'text'}
                          thousandSeparator=","
                        />

                      }

                      {addressFeeDoctor && addressFeeDoctor.priceData && language === LANGUAGES.EN
                        &&
                        <NumericFormat
                          value={addressFeeDoctor.priceData.valueEn}
                          displayType={'text'}
                          thousandSeparator=","
                          suffix='$'
                        />
                      }

                    </span>
                  </div>

                  <div className='note'>
                    {addressFeeDoctor && addressFeeDoctor.note ? addressFeeDoctor.note : ''}
                  </div>
                </div>

                <div className='payment'>
                  <FormattedMessage id="patient.detail-doctor.payment" />
                </div>
              </div>
              <div className='btn-showOff'>
                <span onClick={() => this.showHideFee(false)}>
                  <FormattedMessage id="common.hide-price" />
                </span>
              </div>

            </>
          }
        </div>
        <div className='insurance'>
          {isShowDetailInsurance === false ?
            <>
              <div>
                <span className='text-title'>
                  <FormattedMessage id="common.type-insurance" />
                </span>
                <span className='btn-showOn'
                  onClick={() => this.showHideInsurance(true)}
                >
                  <FormattedMessage id="common.see-details" />
                </span>
              </div>
            </>
            :
            <>
              <div className='container-insurance'>
                <div className='detail-insurance'>
                  <div className='price'>
                    <span className='left'>
                      <FormattedMessage id="common.price-examination" />
                    </span>
                    <span className='right'>250.000đ - 500.000đ</span>
                  </div>

                  <div className='note'>Giá tư vấn 15 phút: 250.000vnđ
                    Giá tư vấn 30 phút: 500.000vnđ
                  </div>
                </div>
                <div className='detail-insurance'>
                  <div className='price'>
                    <span className='left'>
                      <FormattedMessage id="common.price-examination" />
                    </span>
                    <span className='right'>250.000đ - 500.000đ</span>
                  </div>

                  <div className='note'>Giá tư vấn 15 phút: 250.000vnđ
                    Giá tư vấn 30 phút: 500.000vnđ
                  </div>
                </div>
                <div className='btn-showOff'>
                  <span onClick={() => this.showHideInsurance(false)}>
                    <FormattedMessage id="common.shorten" />
                  </span>
                </div>
              </div>
            </>
          }
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddressDoctor);

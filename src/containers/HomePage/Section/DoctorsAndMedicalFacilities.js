import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './scss/DoctorsAndMedicalFacilities.scss'

import Slider from "react-slick";


class DoctorsAndMedicalFacilities extends Component {


  render() {

    return (
      <div className='section-general doctors-and-medical-facilities'>
        <div className='section-cotainer'>
          <div className='section-header'>
            <span><FormattedMessage id="home-body.doctors-and-medical-facilities" /></span>
            <button>Liên hệ</button>
            <button className='btn-center'>Hợp tác</button>
            <button>Bài viết</button>
          </div>
          <div className='section-content'>
            <Slider {...this.props.settings}>
              <div className='section-img-row'>
                <div className='img-customize' />
                <div className='text-content'>
                  <span>Cơ xương khớp </span>
                </div>
              </div>
              <div className='section-img-row'>
                <div className='img-customize' />
                <div className='text-content'>
                  <span>Cơ xương khớp </span>
                </div>
              </div>
              <div className='section-img-row'>
                <div className='img-customize' />
                <div className='text-content'>
                  <span>Cơ xương khớp </span>
                </div>
              </div>
              <div className='section-img-row'>
                <div className='img-customize' />
                <div className='text-content'>
                  <span>Cơ xương khớp </span>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>

    );
  }

}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language
  };
};

const mapDispatchToProps = dispatch => {
  return {
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(DoctorsAndMedicalFacilities);

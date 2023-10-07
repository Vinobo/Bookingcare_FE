import React, { Component } from 'react';
import { connect } from 'react-redux';
import './scss/Handbook.scss';
import { FormattedMessage } from 'react-intl';

import Slider from "react-slick";


class HandBook extends Component {


  render() {
    // let settings = {
    //   dots: false,
    //   infinite: false,
    //   speed: 500,
    //   slidesToShow: 2,
    //   slidesToScroll: 2,
    //   initialSlide: 0,
    // };

    return (
      <div className='section-general hand-book'>
        <div className='section-cotainer'>
          <div className='section-header'>
            <span><FormattedMessage id="common.handbook" /></span>
            <button><FormattedMessage id="home-body.all-articles" /></button>
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


export default connect(mapStateToProps, mapDispatchToProps)(HandBook);

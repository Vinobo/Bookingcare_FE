import React, { Component } from 'react';
import { connect } from 'react-redux';
import './scss/Specialty.scss';
import { FormattedMessage } from 'react-intl';

import Slider from "react-slick";


class Specialty extends Component {


  render() {

    return (
      <div className='section-general specialty'>
        <div className='section-cotainer'>
          <div className='section-header'>
            <span><FormattedMessage id="home-body.popular-specialties" /></span>
            <button><FormattedMessage id="home-body.view-more" /></button>
          </div>
          <div className='section-content'>
            <Slider {...this.props.settings}>
              <div className='section-img'>
                <div className='img-customize' />
                <span>Cơ xương khớp </span>
              </div>
              <div className='section-img'>
                <div className='img-customize' />
                <span>Cơ xương khớp 2</span>
              </div>
              <div className='section-img'>
                <div className='img-customize' />
                <span>Cơ xương khớp 3</span>
              </div>
              <div className='section-img'>
                <div className='img-customize' />
                <span>Cơ xương khớp 4</span>
              </div>
              <div className='section-img'>
                <div className='img-customize' />
                <span>Cơ xương khớp 5</span>
              </div>
              <div className='section-img'>
                <div className='img-customize' />
                <span>Cơ xương khớp 6</span>
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


export default connect(mapStateToProps, mapDispatchToProps)(Specialty);

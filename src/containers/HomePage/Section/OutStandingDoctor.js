import React, { Component } from 'react';
import { connect } from 'react-redux';
import './scss/OutStandingDoctor.scss';
import { FormattedMessage } from 'react-intl';

import Slider from "react-slick";

class OutStandingDoctor extends Component {


  render() {

    return (
      <div className='section-general out-standing-doctor'>
        <div className='section-cotainer'>
          <div className='section-header'>
            <span>Bác sĩ nổi bật tuần qua</span>
            <button>Tìm kiếm</button>
          </div>
          <div className='section-content'>
            <Slider {...this.props.settings}>
              <div className='section-img'>
                <div className='img-customize' />
                <div>Khám Nam học, Bệnh viện Nam học và Hiếm muộn Hà Nội</div>
                <span>Nam học</span>
              </div>
              <div className='section-img'>
                <div className='img-customize' />
                <div>Bệnh viện Chợ Rẫy</div>
                <span>Bệnh viện Chợ Rẫy</span>
              </div>
              <div className='section-img'>
                <div className='img-customize' />
                <div>Bệnh viện Chợ Rẫy</div>
                <span>Bệnh viện Chợ Rẫy</span>
              </div>
              <div className='section-img'>
                <div className='img-customize' />
                <div>Bệnh viện Chợ Rẫy</div>
                <span>Bệnh viện Chợ Rẫy</span>
              </div>
              <div className='section-img'>
                <div className='img-customize' />
                <div>Bệnh viện Chợ Rẫy</div>
                <span>Bệnh viện Chợ Rẫy</span>
              </div>
              <div className='section-img'>
                <div className='img-customize' />
                <div>Bệnh viện Chợ Rẫy</div>
                <span>Bệnh viện Chợ Rẫy</span>
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


export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);

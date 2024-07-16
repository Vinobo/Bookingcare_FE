import React, { Component } from 'react';
import { connect } from 'react-redux';
import './scss/Handbook.scss';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import { withRouter } from 'react-router';
import five_different from '../../../assets/handBook/105518-tam-soat-benh-doctor-check.png';
import five_clinic from '../../../assets/handBook/195059-dia-chi-kham-chan-thuong-the-thao.png';
import GI_END from '../../../assets/handBook/152930noi-soi-tieu-hoa.jpg';
import Male from '../../../assets/handBook/114438phong-kham-nam-khoa-uy-tin3.jpg';
import HOSP115 from '../../../assets/handBook/160418-bv-nhan-dan-115-ggrv-min.png';
import HOSPCRay from '../../../assets/handBook/110149-kham-than-kinh-benh-vien-cho-ray.jpg';
import { Link } from 'react-router-dom/cjs/react-router-dom';

class HandBook extends Component {

  handleViewDetailHandbook = (id) => {
    this.props.history.push(`/detail-handbook-${id}/`)
  }

  render() {

    return (
      <div className='section-general hand-book'>
        <div className='section-cotainer'>
          <div className='section-header'>
            <span><FormattedMessage id="common.handbook" /></span>
            <Link to={`/all-handbook/`}
            >
              <button><FormattedMessage id="home-body.all-articles" /></button>
            </Link>
          </div>
          <div className='section-content'>
            <Slider {...this.props.settings}>
              <div className='section-img-row' onClick={() => this.handleViewDetailHandbook(1)}>
                <img src={five_different} alt='logo' />
                <div className='text-content'>
                  <span>5 khác biệt khi tầm soát bệnh, khám tổng quát tại Doctor Check</span>
                </div>
              </div>
              <div className='section-img-row' onClick={() => this.handleViewDetailHandbook(2)}>
                <img src={five_clinic} alt='logo' />
                <div className='text-content'>
                  <span>Top 5 địa chỉ khám chấn thương thể thao tốt tại TP.HCM</span>
                </div>
              </div>
              <div className='section-img-row' onClick={() => this.handleViewDetailHandbook(3)}>
                <img src={GI_END} alt='logo' />
                <div className='text-content'>
                  <span>Cần lưu ý gì khi đi khám Tiêu hóa?</span>
                </div>
              </div>
              <div className='section-img-row' onClick={() => this.handleViewDetailHandbook(4)}>
                <img src={Male} alt='logo' />
                <div className='text-content'>
                  <span>Cần lưu ý gì trước khi đi khám Nam khoa (bệnh nam giới)</span>
                </div>
              </div>
              <div className='section-img-row' onClick={() => this.handleViewDetailHandbook(5)}>
                <img src={HOSP115} alt='logo' />
                <div className='text-content'>
                  <span>Kinh nghiệm thực tế đi khám tại Bệnh viện Nhân dân 115</span>
                </div>
              </div>
              <div className='section-img-row' onClick={() => this.handleViewDetailHandbook(6)}>
                <img src={HOSPCRay} alt='logo' />
                <div className='text-content'>
                  <span>Hướng dẫn đi khám tại khoa Thần kinh, Bệnh viện Chợ Rẫy: Thủ tục thăm khám? Bác sĩ nào giỏi?</span>
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HandBook));

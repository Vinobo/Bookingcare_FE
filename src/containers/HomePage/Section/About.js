import React, { Component } from 'react';
import { connect } from 'react-redux';
import './scss/About.scss';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import logo from "../../../assets/images/LOGO.png";
import MOIT from "../../../assets/about/bo-cong-thuong.svg"
import Slider from "react-slick";


class About extends Component {

  returnToHome = () => {
    if (this.props.history) {
      this.props.history.push(`/home`)
    }
  }

  render() {

    return (
      <div className='section-general about'>
        <div className='section-cotainer'>
          <div className='content-about'>
            <div className='info-company'>
              <div className='about-logo'>
                <div className='logo' onClick={() => this.returnToHome()} >
                  <img src={logo} />
                  <span>LiveCare</span>
                </div>
              </div>
              <div className='about-company'>
                <h2><FormattedMessage id="about.title" /></h2>
                <p><i className="fas fa-map-marker-alt"></i><FormattedMessage id="about.location" /></p>
                <p><i className="fas fa-check"></i><FormattedMessage id="about.certification" /></p>
              </div>
              <div className='certification'>
                <img src={MOIT}></img>
                <img src={MOIT}></img>
              </div>
              <div className='contact'>
                <div className='ct-content'>
                  <span className='title-ct'><FormattedMessage id="about.address-title" /></span>
                  <span className='description-ct'><FormattedMessage id="about.address" /></span>
                </div>
                <div className='ct-content'>
                  <span className='title-ct'><FormattedMessage id="about.support" /></span>
                  <span className='description-ct'>trinhnkgcs18897@fpt.edu.vn (7h - 18h)</span>
                </div>
                <div className='ct-content'>
                  <span className='title-ct'>Hotline</span>
                  <span className='description-ct'>0969-474-352 (7h - 18h)</span>
                </div>
              </div>
            </div>
            {/* <div className='more-info'>
              <ul>
                <li><a href="#">Liên hệ hợp tác</a></li>
                <li><a href="#">Danh bạ y tế</a></li>
                <li><a href="#">Sức khỏe doanh nghiệp</a></li>
                <li><a href="#">Gói chuyển đổi số doanh nghiệp</a></li>
                <li><a href="#">Tuyển dụng</a></li>
                <li><a href="#">Câu hỏi thường gặp</a></li>
                <li><a href="#">Điều khoản sử dụng</a></li>
                <li><a href="#">Chính sách Bảo mật</a></li>
                <li><a href="#">Quy trình hỗ trợ giải quyết khiếu nại</a></li>
                <li><a href="#">Quy chế hoạt động</a></li>
              </ul>
            </div> */}
            <div className='partner'>
              <span className='title-pt'><FormattedMessage id="about.partner.title" /></span>
              <ul>
                <li>
                  <a href="https://hellodoctors.vn/" target="_blank">
                    <img src="https://cdn.bookingcare.vn/fo/2023/09/08/093706-hellodoctorlogo.png" width="65px" height="40px" />
                    <div className="pt-detail">
                      <span className='title-pt'>Hello Doctor</span>
                      <span><FormattedMessage id="about.partner.span1" /></span>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="https://bernard.vn/" target="_blank">
                    <img src="https://cdn.bookingcare.vn/fo/2022/03/21/082316-logo-bernard.png" width="65px" height="65px" />
                    <div className="pt-detail">
                      <span className='title-pt'><FormattedMessage id="about.partner.partner2" /></span>
                      <span><FormattedMessage id="about.partner.span2" /></span>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(About));

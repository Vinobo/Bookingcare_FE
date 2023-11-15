import React, { Component } from 'react';
import { connect } from 'react-redux';
import './scss/About.scss';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import logo from "../../../assets/images/bookingcare-2020.svg";
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
                <img src={logo} onClick={() => this.returnToHome()} />
              </div>
              <div className='about-company'>
                <h2>Công ty Cổ phần Công nghệ BookingCare</h2>
                <p><i className="fas fa-map-marker-alt"></i> Lô B4/D21, Khu đô thị mới Cầu Giấy, Phường Dịch Vọng Hậu, Quận Cầu Giấy, Thành phố Hà Nội, Việt Nam</p>
                <p><i className="fas fa-check"></i> ĐKKD số: 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015</p>
              </div>
              <div className='certification'>
                <img src={MOIT}></img>
                <img src={MOIT}></img>
              </div>
              <div className='contact'>
                <div className='ct-content'>
                  <span className='title-ct'>Văn phòng tại TP Hồ Chí Minh</span>
                  <span className='description-ct'>Số 01, Hồ Bá Kiện, Phường 15, Quận 10</span>
                </div>
                <div className='ct-content'>
                  <span className='title-ct'>Hỗ trợ khách hàng</span>
                  <span className='description-ct'>trinhnkgcs18897@fpt.edu.vn (7h - 18h)</span>
                </div>
                <div className='ct-content'>
                  <span className='title-ct'>Hotline</span>
                  <span className='description-ct'>0969-474-352 (7h - 18h)</span>
                </div>
              </div>
            </div>
            <div className='more-info'>
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
            </div>
            <div className='partner'>
              <span className='title-pt'>Đối tác bảo trợ nội dung</span>
              <ul>
                <li>
                  <a href="https://hellodoctors.vn/" target="_blank">
                    <img src="https://cdn.bookingcare.vn/fo/2023/09/08/093706-hellodoctorlogo.png" width="65px" height="40px" />
                    <div class="pt-detail">
                      <span className='title-pt'>Hello Doctor</span>
                      <span>Bảo trợ chuyên mục nội dung “sức khỏe tinh thần”</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="https://bernard.vn/" target="_blank">
                    <img src="https://cdn.bookingcare.vn/fo/2022/03/21/082316-logo-bernard.png" width="65px" height="65px" />
                    <div class="pt-detail">
                      <span className='title-pt'>Hệ thống y khoa chuyên sâu quốc tế Bernard</span>
                      <span>Bảo trợ chuyên mục nội dung “y khoa chuyên sâu”</span>
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

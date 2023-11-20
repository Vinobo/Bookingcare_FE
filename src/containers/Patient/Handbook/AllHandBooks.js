import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { LANGUAGES } from '../../../utils';
import './scss/AllHandBooks.scss';
import { FormattedMessage } from 'react-intl';
import Header from '../../HomePage/Header';
import About from '../../HomePage/Section/About';
import Footer from '../../HomePage/Footer';
import five_different from '../../../assets/handBook/105518-tam-soat-benh-doctor-check.png';
import five_clinic from '../../../assets/handBook/195059-dia-chi-kham-chan-thuong-the-thao.png';
import GI_END from '../../../assets/handBook/152930noi-soi-tieu-hoa.jpg';
import Male from '../../../assets/handBook/114438phong-kham-nam-khoa-uy-tin3.jpg';
import HOSP115 from '../../../assets/handBook/160418-bv-nhan-dan-115-ggrv-min.png';
import HOSPCRay from '../../../assets/handBook/110149-kham-than-kinh-benh-vien-cho-ray.jpg';
class AllHandBooks extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }

  }

  async componentDidMount() {

  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {

    }
  }

  returnToHome = () => {
    if (this.props.history) {
      this.props.history.push(`/home`)
    }
  }

  handleViewDetailHandbook = (id) => {
    this.props.history.push(`/detail-handbook-${id}/`)
  }

  render() {
    let { language } = this.props;

    return (
      <>
        <div>
          <Header></Header>
        </div>
        <div className='all-handbook-container'>
          <div className='sticky-menu'>
            <div className='goBack'>
              <div className='general-container flex-back'>
                <i className="fas fa-long-arrow-alt-left" onClick={() => this.props.history.goBack()}></i>
                <span className='bd-l-r' onClick={() => this.returnToHome()}> <i className="fas fa-home"></i> </span>
                <span><FormattedMessage id="patient.title.all-handbook" /></span>
              </div>
            </div>
          </div>
          <div className='general-container'>
            <h1><FormattedMessage id="patient.title.all-handbook" /></h1>
            <div className='detail-all-handbook'>
              <div className='section-img-row' onClick={() => this.handleViewDetailHandbook(1)}>
                <img src={five_different} />
                <div className='text-content'>
                  <span>5 khác biệt khi tầm soát bệnh, khám tổng quát tại Doctor Check</span>
                </div>
              </div>
              <div className='section-img-row' onClick={() => this.handleViewDetailHandbook(2)}>
                <img src={five_clinic} />
                <div className='text-content'>
                  <span>Top 5 địa chỉ khám chấn thương thể thao tốt tại TP.HCM</span>
                </div>
              </div>
              <div className='section-img-row' onClick={() => this.handleViewDetailHandbook(3)}>
                <img src={GI_END} />
                <div className='text-content'>
                  <span>Cần lưu ý gì khi đi khám Tiêu hóa?</span>
                </div>
              </div>
              <div className='section-img-row' onClick={() => this.handleViewDetailHandbook(4)}>
                <img src={Male} />
                <div className='text-content'>
                  <span>Cần lưu ý gì trước khi đi khám Nam khoa (bệnh nam giới)</span>
                </div>
              </div>
              <div className='section-img-row' onClick={() => this.handleViewDetailHandbook(5)}>
                <img src={HOSP115} />
                <div className='text-content'>
                  <span>Kinh nghiệm thực tế đi khám tại Bệnh viện Nhân dân 115</span>
                </div>
              </div>
              <div className='section-img-row' onClick={() => this.handleViewDetailHandbook(6)}>
                <img src={HOSPCRay} />
                <div className='text-content'>
                  <span>Hướng dẫn đi khám tại khoa Thần kinh, Bệnh viện Chợ Rẫy: Thủ tục thăm khám? Bác sĩ nào giỏi?</span>
                </div>
              </div>
            </div>
          </div>

        </div>
        <About></About>
        <Footer></Footer>
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

export default connect(mapStateToProps, mapDispatchToProps)(AllHandBooks);

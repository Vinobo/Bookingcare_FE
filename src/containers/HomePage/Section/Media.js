import React, { Component } from 'react';
import { connect } from 'react-redux';
import './scss/Media.scss';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import VTV1 from '../../../assets/media/vtv1.png';
import DanTri from '../../../assets/media/110757-dantrilogo.png';
import VTVNew from '../../../assets/media/165432-vtcnewslogosvg.png';
import CNTT from '../../../assets/media/cuc-cong-nghe-thong-tin-bo-y-te-2.png';
import ICTNew from '../../../assets/media/ictnews.png';
import Infonet from '../../../assets/media/infonet.png';
import VNE from '../../../assets/media/vnexpress.png';

class Media extends Component {


  render() {

    return (
      <div className='section-general media'>
        <div className='section-cotainer'>
          <div className='section-header'>
            <span><FormattedMessage id="home-body.media" /></span>
          </div>
          <div className='section-content'>
            <div className='content-left'>
              <iframe
                width="100%" height="100%"
                src="https://www.youtube.com/embed/FyDQljKtWnI"
                title="CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              >
              </iframe>
            </div>
            <div className='content-right'>
              <a href='https://vtv.vn/video/ca-phe-khoi-nghiep-14-11-2018-334894.htm' target='_blank'>
                <div className='media-icon'>
                  <img src={VTV1} />
                </div>
              </a>
              <a href='https://ictnews.vn/kinh-doanh/doanh-nghiep/startup-bookingcare-chinh-thuc-ra-mat-phien-ban-di-dong-cua-nen-tang-ho-tro-dat-lich-kham-online-173512.ict' target='_blank'>
                <div className='media-icon'>
                  <img src={ICTNew} />
                </div>
              </a>
              <a href='https://video.vnexpress.net/cuoc-song-4-0/kham-benh-khong-phai-xep-hang-o-ha-noi-3797126.html' target='_blank'>
                <div className='media-icon'>
                  <img src={VNE} />
                </div>
              </a>
              <a href='https://vtc.vn/dat-kham-chuyen-khoa-va-hanh-trinh-ho-tro-cac-benh-vien-qua-tai-ar434101.html' target='_blank'>
                <div className='media-icon'>
                  <img src={VTVNew} />
                </div>
              </a>
              <a href='https://ehealth.gov.vn/?action=News&amp;newsId=46094' target='_blank'>
                <div className='media-icon'>
                  <img src={CNTT} />
                </div>
              </a>
              <a href='https://infonet.vietnamnet.vn/da-co-hon-20000-luot-benh-nhan-dat-lich-kham-qua-bookingcare-175080.html' target='_blank'>
                <div className='media-icon'>
                  <img src={Infonet} />
                </div>
              </a>
              <a href='https://vtv.vn/video/ca-phe-khoi-nghiep-16-8-2018-317687.htm' target='_blank'>
                <div className='media-icon'>
                  <img src={VTV1} />
                </div>
              </a>
              <a href='https://dantri.com.vn/nhan-tai-dat-viet/san-pham-nen-tang-dat-kham-booking-care-201908201625624751.htm' target='_blank'>
                <div className='media-icon'>
                  <img src={DanTri} />
                </div>
              </a>
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


export default connect(mapStateToProps, mapDispatchToProps)(Media);

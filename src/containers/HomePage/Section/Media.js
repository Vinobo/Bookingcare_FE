import React, { Component } from 'react';
import { connect } from 'react-redux';
import './scss/Media.scss';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";


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
              agshdghjdghjgdhjgshjdahsdhjasdghjasghjagdjhgashjgjahsd
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

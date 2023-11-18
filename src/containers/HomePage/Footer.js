import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Footer.scss';
import { FormattedMessage } from 'react-intl';

import Slider from "react-slick";


class Footer extends Component {


  render() {

    return (
      <div className='section-general footer'>
        <div className='section-cotainer'>
          <div className='footer-content'>
            <div className='footer-left'>
              <small>&copy; 2023 TrinhNKGCS18897.</small>
            </div>
            <div className='footer-right'>
              <i className="fab fa-facebook-square"></i>
              <i className="fab fa-youtube-square"></i>
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


export default connect(mapStateToProps, mapDispatchToProps)(Footer);

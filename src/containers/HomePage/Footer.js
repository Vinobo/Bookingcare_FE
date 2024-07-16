import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Footer.scss';

class Footer extends Component {


  render() {

    return (
      <div className='section-general footer'>
        <div className='section-cotainer'>
          <div className='footer-content'>
            <div className='footer-left'>
              <span>&copy; 2023 TrinhNKGCS18897.</span>
            </div>
            <div className='footer-right'>
              <a href='https://www.facebook.com/PolNKT/' target='_blank' ref="noreferrer"><i className="fab fa-facebook-square"></i></a>
              <a href='https://www.youtube.com/@nguyenkhanhtrinh7021' target='_blank' ref="noreferrer"><i className="fab fa-youtube-square"></i></a>
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

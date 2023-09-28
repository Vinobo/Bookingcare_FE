import React, { Component } from 'react';
import { connect } from 'react-redux';
// import './scss/Footer.scss';
import { FormattedMessage } from 'react-intl';

import Slider from "react-slick";


class Footer extends Component {


  render() {

    return (
      <div className='footer'>
        <p>&copy; 2023 TrinhNKGCS18897.</p>
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

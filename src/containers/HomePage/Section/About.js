import React, { Component } from 'react';
import { connect } from 'react-redux';
// import './scss/About.scss';
import { FormattedMessage } from 'react-intl';

import Slider from "react-slick";


class About extends Component {


  render() {

    return (
      <div className='section-general about'>
        About us
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


export default connect(mapStateToProps, mapDispatchToProps)(About);

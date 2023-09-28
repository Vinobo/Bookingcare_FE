import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from './Header';
import Specialty from './Section/Specialty';
import Telemedicine from './Section/Telemedicine';
import MedicalFacility from './Section/MedicalFacility';
import OutStandingDoctor from './Section/OutStandingDoctor';
import Handbook from './Section/Handbook';
import Healthy from './Section/Healthy';
import About from './Section/About';
import './HomePage.scss';

import Slider from "react-slick";
// Import css files react slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DoctorsAndMedicalFacilities from './Section/DoctorsAndMedicalFacilities';
import Footer from './Footer';
import Media from './Section/Media';





class HomePage extends Component {

  render() {
    //slick 4
    let settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

    //slick 2
    let setting_two = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 2,
      initialSlide: 0,
    };

    return (
      <div>
        <Header />
        <Specialty settings={settings} />
        <Telemedicine settings={settings} />
        <MedicalFacility settings={settings} />
        <OutStandingDoctor settings={settings} />
        <Handbook settings={setting_two} />
        <Healthy settings={setting_two} />
        <Media />
        <DoctorsAndMedicalFacilities settings={setting_two} />
        <About />
        <Footer />
      </div >
    );
  }

}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Specialty from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility';
import OutStandingDoctor from './Section/OutStandingDoctor';
import Handbook from './Section/Handbook';
import About from './Section/About';
import './HomePage.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from './Footer';
import Media from './Section/Media';
import { getAllClinic, getAllDoctors, getAllSpecialties } from '../../services/userService';





class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSpecialties: [],
      dataClinic: [],
      dataDoctors: [],
      isLoading: false
    };
  }

  async componentDidMount() {
    this.setState({
      isLoading: true
    })

    const resAllSpecailties = await getAllSpecialties();
    if (resAllSpecailties && resAllSpecailties.errCode === 0) {
      this.setState({
        dataSpecialties: resAllSpecailties.data ? resAllSpecailties.data : []
      })
    }

    const resAllClinic = await getAllClinic();
    if (resAllClinic && resAllClinic.errCode === 0) {
      this.setState({
        dataClinic: resAllClinic.data ? resAllClinic.data : []
      })
    }

    const resDoctors = await getAllDoctors();
    if (resDoctors && resDoctors.errCode === 0) {
      this.setState({
        dataDoctors: resDoctors.data ? resDoctors.data : []
      })
    }

    this.setState({
      isLoading: false
    })
  }

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
          breakpoint: 1025,
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
        <Header isShowBanner={true} dataSearch={this.state} />
        <Specialty settings={settings} />
        <MedicalFacility settings={settings} />
        <OutStandingDoctor settings={settings} />
        <Handbook settings={setting_two} />
        <Media />
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

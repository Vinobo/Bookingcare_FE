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
// import { getAllClinic, getAllDoctors, getAllSpecialties } from '../../services/userService';
import * as actions from '../../store/actions';




class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSpecialties: [],
      dataClinic: [],
      isLoadingSp: false,
      isLoadingCl: false
    };
  }

  async componentDidMount() {
    this.props.loadAllSpecialties();
    this.props.loadAllClinics();
    this.getData();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { dataSpecialties, dataClinic } = this.props;
    if (prevProps.dataSpecialties !== dataSpecialties) {
      this.getData();
    }
    if (prevProps.dataClinic !== dataClinic) {
      this.getData();
    }
  }

  getData = () => {
    this.setState({
      isLoadingSp: true
    })

    const { dataSpecialties, dataClinic } = this.props;

    if (dataSpecialties && dataSpecialties.length > 0) {
      this.setState({
        dataSpecialties: dataSpecialties,
        isLoadingSp: false
      })
    }

    this.setState({
      isLoadingCl: true
    })

    if (dataClinic && dataClinic.length > 0) {
      this.setState({
        dataClinic: dataClinic,
        isLoadingCl: false
      })
    }
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
          breakpoint: 1279,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            autoplay: true,
            autoplaySpeed: 3000,
            pauseOnFocus: true,
            pauseOnHover: true,
            pauseOnDotsHover: true
          }
        },
        {
          breakpoint: 500,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
            pauseOnFocus: true,
            pauseOnHover: true,
            pauseOnDotsHover: true
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
      responsive: [
        {
          breakpoint: 1279,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: false,
            initialSlide: 0
          }
        }
      ]
    };

    const { dataSpecialties, dataClinic, isLoadingSp, isLoadingCl } = this.state;

    return (
      <div className='home-page'>
        <Header isShowBanner={true} dataSearch={this.state} />
        <Specialty settings={settings} dataSpecialty={dataSpecialties} isLoading={isLoadingSp} />
        <MedicalFacility settings={settings} dataClinic={dataClinic} isLoading={isLoadingCl} />
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
    isLoggedIn: state.user.isLoggedIn,
    dataSpecialties: state.admin.allSpecialties,
    dataClinic: state.admin.allClinics
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadAllSpecialties: () => dispatch(actions.fetchAllSpecialties()),
    loadAllClinics: () => dispatch(actions.fetchAllClinics()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

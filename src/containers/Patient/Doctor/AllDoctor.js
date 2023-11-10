import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { LANGUAGES } from '../../../utils';
import './scss/AllDoctor.scss';
import * as actions from '../../../store/actions';
import { FormattedMessage } from 'react-intl';
import { getAllDoctor } from '../../../services/userService';
import Header from '../../HomePage/Header';
import About from '../../HomePage/Section/About';
import Footer from '../../HomePage/Footer';
import { Link } from 'react-router-dom/cjs/react-router-dom';

class AllDoctor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
    }

  }


  async componentDidMount() {
    let { language } = this.props;
    this.props.loadTopDoctors();
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {

    }
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      let arrDoctors = this.props.topDoctorsRedux;

      this.setState({
        arrDoctors: arrDoctors
      })
    }
  }

  render() {
    let { language } = this.props;
    let { arrDoctors } = this.state

    return (
      <>
        <Header></Header>
        <div className='all-doctor-container'>
          <div className='general-container'>
            <h1><FormattedMessage id="patient.title.all-doctor" /></h1>
            <div className='detail-all-doctor'>
              {arrDoctors && arrDoctors.length > 0 ?
                <>
                  {arrDoctors.map((item, index) => {
                    let imageBase64 = '';
                    if (item.image) {
                      imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                    }
                    let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                    let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;

                    return (
                      <Link to={`/detail-doctor/${item.id}`}
                        className='text-view'
                      >
                        <div className='item-row'>
                          <div className='img-doctor'
                            style={{ backgroundImage: `url(${imageBase64})` }}
                          ></div>
                          <div className='text-column'>
                            <span>{language === LANGUAGES.VI ? nameVi : nameEn}</span>
                            <span>{item.Doctor_Infor && item.Doctor_Infor.specialtyData ? item.Doctor_Infor.specialtyData.name : ''}</span>
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </>
                :
                <></>
              }
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
    topDoctorsRedux: state.admin.topDoctors,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllDoctor);

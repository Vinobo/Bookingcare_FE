import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../utils';
import './scss/AllDoctor.scss';
// import * as actions from '../../../store/actions';
import { FormattedMessage } from 'react-intl';
import { getAllCodeService, getAllDoctors } from '../../../services/userService';
import Header from '../../HomePage/Header';
import About from '../../HomePage/Section/About';
import Footer from '../../HomePage/Footer';
import { Link } from 'react-router-dom/cjs/react-router-dom';
// import _ from 'lodash';

class AllDoctor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
      listProvince: [],
      isLoading: false
    }

  }


  async componentDidMount() {
    // let { language } = this.props;
    this.setState({
      isLoading: true
    })

    let res = await getAllDoctors();

    let resProvince = await getAllCodeService('PROVINCE')

    if (res && res.errCode === 0 && resProvince && resProvince.errCode === 0) {

      let dataProvince = resProvince.data;
      if (dataProvince && dataProvince.length > 0) {
        dataProvince.unshift({
          keyMap: 'ALL',
          type: 'PROVINCE',
          valueEn: 'ALL',
          valueVi: 'Toàn quốc'
        })
      }

      this.setState({
        dataDetailDoctor: res.data,
        listProvince: dataProvince ? dataProvince : [],
        isLoading: false
      })
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {

    }

  }

  handleOnChangeSelectProvince = async (event) => {
    // let location = event.target.value;
    let res = await getAllDoctors();

    this.setState({
      dataDetailDoctor: res.data,
    })
  }

  returnToHome = () => {
    if (this.props.history) {
      this.props.history.push(`/home`)
    }
  }

  render() {
    let { language } = this.props;
    let { dataDetailDoctor, isLoading } = this.state;

    return (
      <>
        <div>
          <Header search={false}></Header>
        </div>
        <div className='all-doctor-container'>
          <div className='goBack'>
            <div className='general-container flex-back'>
              <i className="fas fa-long-arrow-alt-left" onClick={() => this.props.history.goBack()}></i>
              <span className='bd-l-r' onClick={() => this.returnToHome()}> <i className="fas fa-home"></i> </span>
              <span><FormattedMessage id="patient.title.all-doctor" /></span>
            </div>
          </div>
          <div className='general-container'>
            <h1><FormattedMessage id="patient.title.all-doctor" /></h1>
            <div className='detail-all-doctor'>
              {isLoading && <p className='loading-page'>Loading...</p>}
              {dataDetailDoctor && dataDetailDoctor.length > 0 ?
                <>
                  {dataDetailDoctor.map((item, index) => {
                    let imageBase64 = '';
                    if (item.image) {
                      imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                    }
                    let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                    let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;

                    return (
                      <Link to={`/detail-doctor/${item.id}`}
                        className='text-view'
                        key={index}
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
  };
};

const mapDispatchToProps = dispatch => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllDoctor);

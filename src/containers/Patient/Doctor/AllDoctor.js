import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../utils';
import './scss/AllDoctor.scss';
import { FormattedMessage } from 'react-intl';
import Header from '../../HomePage/Header';
import About from '../../HomePage/Section/About';
import Footer from '../../HomePage/Footer';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import * as actions from '../../../store/actions';
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
    this.props.loadAllDoctors();
    this.props.loadAllProvince();
    this.getDataDoctors();
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.allDoctors !== prevProps.allDoctors) {
      this.getDataDoctors()
    }
  }

  getDataDoctors = async () => {
    this.setState({
      isLoading: true
    })

    const { allDoctors, allProvince } = this.props;

    if (allDoctors && allDoctors.length > 0 && allProvince && allProvince.length > 0) {

      let dataProvince = allProvince;
      if (dataProvince && dataProvince.length > 0 && dataProvince[0].keyMap !== 'ALL') {
        dataProvince.unshift({
          keyMap: 'ALL',
          type: 'PROVINCE',
          valueEn: 'ALL',
          valueVi: 'Toàn quốc'
        })
      }

      this.setState({
        arrDoctors: allDoctors,
        listProvince: dataProvince ? dataProvince : [],
        isLoading: false
      })
    }
  }

  handleOnChangeSelectProvince = async (event) => {
    const value = event.target.value;
    const { allDoctors } = this.props;
    const dataDoctors = allDoctors.filter(e => value !== 'All' && e.Doctor_Infor.provinceId === value)

    this.setState({
      arrDoctors: value === 'ALL' ? allDoctors : dataDoctors,
    })
  }

  returnToHome = () => {
    if (this.props.history) {
      this.props.history.push(`/home`)
    }
  }

  render() {
    let { language } = this.props;
    let { arrDoctors, listProvince, isLoading } = this.state;

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
            <select className='select-province'
              onChange={(event) => this.handleOnChangeSelectProvince(event)}>
              {listProvince && listProvince.length > 0 &&
                listProvince.map((item, index) => {
                  return (
                    <option key={index} value={item.keyMap}>
                      {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                    </option>
                  )
                })
              }
            </select>
            <div className='detail-all-doctor'>
              {isLoading ? <p className='loading-page'>Loading...</p>
                :
                <>
                  {arrDoctors && arrDoctors.length > 0 &&
                    arrDoctors.map((item, index) => {
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
                    })

                  }
                </>
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
    allDoctors: state.admin.allDoctors,
    allProvince: state.admin.allProvince
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    loadAllProvince: () => dispatch(actions.fetchAllProvince())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllDoctor);

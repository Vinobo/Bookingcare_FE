import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './DetailSpecialty.scss';
import Header from '../../HomePage/Header';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import AddressDoctor from '../Doctor/AddressDoctor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getAllCodeService, getAllDetailSpecialtyById, getAllSpecialties } from '../../../services/userService';
import _ from 'lodash';
import About from '../../HomePage/Section/About';
import Footer from '../../HomePage/Footer';
import Select from 'react-select';
import { withRouter } from 'react-router';


class DetailsSpecialty extends Component {

  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      dataDetailSpecialty: {},
      listProvince: [],
      isShowDescriptionSpecialty: false,
      selectedSpecialty: '',
      listSpecialty: [],
      isLoading: false
    }

  }

  handleData = async () => {
    if (this.props.match && this.props.match.params && this.props.match.params.id) {
      let id = this.props.match.params.id;

      let res = await getAllDetailSpecialtyById({
        id: id,
        location: 'ALL'
      });

      let resProvince = await getAllCodeService('PROVINCE')

      if (res && res.errCode === 0 && resProvince && resProvince.errCode === 0) {
        let data = res.data;
        let arrDoctorId = [];
        if (data && !_.isEmpty(res.data)) {
          let arr = data.doctorSpecialty;
          if (arr && arr.length > 0) {
            arr.map(item => arrDoctorId.push(item.doctorId))
          }
        }

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
          dataDetailSpecialty: res.data,
          arrDoctorId: arrDoctorId,
          listProvince: dataProvince ? dataProvince : [],
          isLoading: false
        })
      }
    }
  }

  async componentDidMount() {
    // let { language } = this.props;
    this.setState({
      isLoading: true
    })


    let res = await getAllSpecialties();
    if (res && res.errCode === 0) {
      let dataSelect = this.buildDataInputSelect(res.data)
      this.setState({
        listSpecialty: dataSelect
      })
    }

    this.handleData()

  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {

    }
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.handleData();
    }

  }

  handleOnChangeSelectProvince = async (event) => {
    if (this.props.match && this.props.match.params && this.props.match.params.id) {
      let id = this.props.match.params.id;
      let location = event.target.value;
      let res = await getAllDetailSpecialtyById({
        id: id,
        location: location
      });

      if (res && res.errCode === 0) {
        let data = res.data;
        let arrDoctorId = [];
        if (data && !_.isEmpty(res.data)) {
          let arr = data.doctorSpecialty;
          if (arr && arr.length > 0) {
            arr.map(item => arrDoctorId.push(item.doctorId))
          }
        }

        this.setState({
          dataDetailSpecialty: res.data,
          arrDoctorId: arrDoctorId,
        })
      }
    }
  }

  showHideDiscription = (status) => {
    this.setState({
      isShowDescriptionSpecialty: status
    })
  }

  buildDataInputSelect = (inputData) => {
    let result = [];
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        object.label = item.name;
        object.value = item.id;
        return result.push(object);
      })
    }
    return result;
  }

  handleChangeSelect = async (selectedSpecialty) => {
    if (this.props.history) {
      this.props.history.push(`/detail-specialty/${selectedSpecialty.value}`)
    }
    this.setState({
      selectedSpecialty: selectedSpecialty,
    });
    this.setState({
      selectedSpecialty: '',
    });
  }

  handleGoBack = () => {
    if (this.props.history) {
      this.props.history.goBack();
    }
  }

  returnToHome = () => {
    if (this.props.history) {
      this.props.history.push(`/home`)
    }
  }

  render() {
    let { language } = this.props;
    let { arrDoctorId, dataDetailSpecialty, listProvince, isShowDescriptionSpecialty, listSpecialty, selectedSpecialty, isLoading } = this.state;


    return (
      <div className='detail-specialty'>
        <div>
          <div>
            <Header search={false} />
          </div>
          {isLoading && <div className='loading-page'>Loading...</div>}
          {!isLoading &&
            <>

              <div className='sticky-menu'>
                <div className='goBack'>
                  <div className='general-container flex-back'>
                    <div className='title-specialty'>
                      <i className="fas fa-long-arrow-alt-left" onClick={() => this.handleGoBack()}></i>
                      <span className='bd-l-r' onClick={() => this.returnToHome()}> <i className="fas fa-home"></i> </span>
                      <span>{dataDetailSpecialty ? dataDetailSpecialty.name : ''}</span>
                    </div>
                    <Select
                      value={selectedSpecialty}
                      onChange={this.handleChangeSelect}
                      options={listSpecialty}
                      placeholder={<FormattedMessage id="patient.specialty.select" />}
                    />
                  </div>
                </div>
              </div>
              <div className='specialty-img'
                style={{
                  backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 1)),
              url(${dataDetailSpecialty && dataDetailSpecialty.image ? dataDetailSpecialty.image : ''})`,
                }}
              >
                <div className='description-specialty general-container'>
                  {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) &&
                    <>
                      <div className={isShowDescriptionSpecialty === false ? 'max-height' : 'min-height'
                      }
                        dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHTML }}
                      >
                      </div>
                      <div>
                        {isShowDescriptionSpecialty === false ?
                          <>
                            <span className='btn-showOn'
                              onClick={() => this.showHideDiscription(true)}
                            >
                              <FormattedMessage id="common.see-details" />
                            </span>
                          </>
                          :
                          <>
                            <span className='btn-showOff'
                              onClick={() => this.showHideDiscription(false)}
                            >
                              <FormattedMessage id="common.shorten" />
                            </span>
                          </>
                        }
                      </div>
                    </>
                  }
                </div>
              </div>
              <div className='general-container'>
                <div className='search-specialty-doctor'>
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
                </div>
                {arrDoctorId && arrDoctorId.length > 0 &&
                  arrDoctorId.map((item, index) => {
                    return (
                      <div className='content-specialty' key={index}>
                        <div className='detail-doctor'>
                          <div className='profile-doctor'>
                            <ProfileDoctor
                              doctorId={item}
                              // dataTime={dataTime}
                              isShowDescriptionDoctor={true}
                              isShowLinkDetail={true}
                              isShowLocation={true}
                            />
                          </div>
                        </div>
                        <div className='extra-infor-doctor'>
                          <div className='schedule-doctor'>
                            <DoctorSchedule
                              doctorIdFromParent={item}
                            />
                          </div>
                          <div className='fee-address-doctor'>
                            <AddressDoctor
                              doctorIdFromParent={item}
                            />
                          </div>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </>}
          <About />
          <Footer />
        </div>
      </div >
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailsSpecialty));

import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './DetailSpecialty.scss';
import Header from '../../HomePage/Header';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import AddressDoctor from '../Doctor/AddressDoctor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import _ from 'lodash';
import About from '../../HomePage/Section/About';
import Footer from '../../HomePage/Footer';
import Select from 'react-select';
import { withRouter } from 'react-router';
import * as actions from '../../../store/actions';


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

  async componentDidMount() {
    // let { language } = this.props;
    this.props.loadAllSpecialties();
    this.props.loadAllProvince();
    this.setState({
      isLoading: true
    })

    this.getAllSpecialties();

    this.getAllProvince();

    this.handleDataDetailSpecialty('ALL')
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {

    }
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.setState({
        isLoading: true
      })
      this.handleDataDetailSpecialty('ALL');
    }

    if (this.props.detailSpecialty !== prevProps.detailSpecialty) {
      this.setState({
        isLoading: true
      })
      this.getDetailSpecialty();
    }

    if (this.props.allProvince !== prevProps.allProvince) {
      this.setState({
        isLoading: true
      })

      this.getAllProvince();

      this.setState({
        isLoading: false
      })
    }
    if (this.props.allSpecialties !== prevProps.allSpecialties) {
      this.setState({
        isLoading: true
      })

      this.getAllSpecialties();

      this.setState({
        isLoading: false
      })
    }

  }

  handleDataDetailSpecialty = (location) => {
    if (this.props.match && this.props.match.params && this.props.match.params.id) {
      let id = this.props.match.params.id;
      this.props.loadAllDetailSpecailtiesById({
        id: id,
        location: location
      });

      this.getDetailSpecialty();
    }
  }

  getDetailSpecialty = () => {
    let arrDoctorId = [];
    const { detailSpecialty } = this.props;
    let data = detailSpecialty;
    if (data && !_.isEmpty(detailSpecialty)) {
      let arr = data.doctorSpecialty;
      if (arr && arr.length > 0) {
        arr.map(item => arrDoctorId.push(item.doctorId))
      }
    }
    this.setState({
      dataDetailSpecialty: detailSpecialty,
      arrDoctorId: arrDoctorId,
      isLoading: false
    })
  }

  getAllSpecialties = () => {
    let { allSpecialties } = this.props;
    if (allSpecialties && allSpecialties.length > 0) {
      let dataSelect = this.buildDataInputSelect(allSpecialties)
      this.setState({
        listSpecialty: dataSelect,
      })
    }
  }

  getAllProvince = () => {
    let resProvince = this.props.allProvince;
    if (resProvince && resProvince.length > 0 && resProvince[0].keyMap !== 'ALL') {
      resProvince.unshift({
        keyMap: 'ALL',
        type: 'PROVINCE',
        valueEn: 'ALL',
        valueVi: 'Toàn quốc'
      })

      this.setState({
        listProvince: resProvince ? resProvince : [],
      })
    }
  }

  handleOnChangeSelectProvince = (event) => {
    this.handleDataDetailSpecialty(event.target.value)
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
          {isLoading ? <div className='loading-page'>Loading...</div>
            :
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
                              doctorId={+item}
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
                              doctorIdFromParent={+item}
                            />
                          </div>
                          <div className='fee-address-doctor'>
                            <AddressDoctor
                              doctorIdFromParent={+item}
                            />
                          </div>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </>
          }
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
    allSpecialties: state.admin.allSpecialties,
    allProvince: state.admin.allProvince,
    detailSpecialty: state.admin.detailSpecialty
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadAllSpecialties: () => dispatch(actions.fetchAllSpecialties()),
    loadAllProvince: () => dispatch(actions.fetchAllProvince()),
    loadAllDetailSpecailtiesById: (id, location) => dispatch(actions.fetchAllDetailSpecialtyById(id, location))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailsSpecialty));

import React, { Component, useRef } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './DetailClinic.scss';
import Header from '../../HomePage/Header';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import AddressDoctor from '../Doctor/AddressDoctor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getAllCodeService, getAllDetailClinicById } from '../../../services/userService';
import _ from 'lodash';
import About from '../../HomePage/Section/About';
import Footer from '../../HomePage/Footer';
import { Link } from 'react-router-dom/cjs/react-router-dom';


class DetailsClinic extends Component {

  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      dataDetailClinic: {},
      isShowDescriptionClinic: false
    }

  }

  async componentDidMount() {
    let { language } = this.props;

    if (this.props.match && this.props.match.params && this.props.match.params.id) {
      let id = this.props.match.params.id;

      let res = await getAllDetailClinicById({
        id: id,
      });

      if (res && res.errCode === 0) {
        let data = res.data;
        let arrDoctorId = [];
        if (data && !_.isEmpty(res.data)) {
          let arr = data.doctorClinic;
          if (arr && arr.length > 0) {
            arr.map(item => {
              arrDoctorId.push(item.doctorId)
            })

          }
        }

        this.setState({
          dataDetailClinic: res.data,
          arrDoctorId: arrDoctorId,
        })
      }

    }
  }


  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {

    }

  }

  // showHideDiscription = (status) => {
  //   this.setState({
  //     isShowDetailFee: status
  //   })
  // }



  render() {
    let { language, isShowLinkDetail, isShowLocation } = this.props;
    let { arrDoctorId, dataDetailClinic } = this.state;

    return (
      <div className='detail-clinic'>
        <div className='clinic-container'>
          <div >
            <Header />
          </div>
          <div className='clinic-img'

          >
            <img
              src={`${dataDetailClinic && dataDetailClinic.image ? dataDetailClinic.image : ''}`}
            ></img>
          </div>
          <div className='spacing'></div>
          <div className='general-container'>
            <div className='title-clinic'>
              {dataDetailClinic && !_.isEmpty(dataDetailClinic) &&
                <>
                  <div className='name-clinic'>
                    <h1>{dataDetailClinic.name}</h1>
                  </div>
                  <div className='address-clinic'>
                    {dataDetailClinic.address}
                  </div>
                </>
              }
            </div>
          </div>
          <div className='sticky-menu'>
            <div className='general-container'>
              <div className='menu-clinic'>
                {arrDoctorId && !_.isEmpty(arrDoctorId) &&
                  <>
                    <a href='#doctor'><FormattedMessage id="clinic.schedule" /></a>
                  </>
                }
                {dataDetailClinic && !_.isEmpty(dataDetailClinic.introHTML) &&
                  <>
                    <a href='#intro'><FormattedMessage id="clinic.intro" /></a>
                  </>
                }
                {dataDetailClinic && !_.isEmpty(dataDetailClinic.specialtyHTML) &&
                  <>
                    <a href='#specialty'><FormattedMessage id="clinic.specialty" /></a>
                  </>
                }
                {dataDetailClinic && !_.isEmpty(dataDetailClinic.deviceHTML) &&
                  <>
                    <a href='#device'><FormattedMessage id="clinic.device" /></a>
                  </>
                }
                {dataDetailClinic && !_.isEmpty(dataDetailClinic.locationHTML) &&
                  <>
                    <a href='#location'><FormattedMessage id="clinic.location" /></a>
                  </>
                }
                {dataDetailClinic && !_.isEmpty(dataDetailClinic.processHTML) &&
                  <>
                    <a href='#process'><FormattedMessage id="clinic.process" /></a>
                  </>
                }
              </div>
            </div>
          </div>
          {arrDoctorId && !_.isEmpty(arrDoctorId) &&
            <>
              <span id='doctor'></span>
              <div className='general-container'>
                <div className='title-detail'>
                  <FormattedMessage id="common.doctor" />
                </div>
              </div>
            </>

          }
          {arrDoctorId && arrDoctorId.length > 0 &&
            arrDoctorId.map((item, index) => {
              return (
                <>
                  <div className='general-container'>
                    <div className='content-clinic' key={index}>
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
                  </div>
                </>
              )
            })}
          <div className='description-clinic general-container'>
            <span id='intro'></span>
            <div className='intro-clinic'>
              <div className='title-detail'><FormattedMessage id="clinic.intro" /></div>

              {dataDetailClinic && !_.isEmpty(dataDetailClinic) &&
                <>
                  <div className='text-details'
                    dangerouslySetInnerHTML={{ __html: dataDetailClinic.introHTML }}
                  >
                  </div>
                </>
              }
            </div>
            {dataDetailClinic && !_.isEmpty(dataDetailClinic.specialtyHTML) &&
              <>
                <span id='specialty'></span>
                <div className='specialty-clinic'>
                  <div className='title-detail'><FormattedMessage id="clinic.specialty" /></div>
                  <div className='text-details'
                    dangerouslySetInnerHTML={{ __html: dataDetailClinic.specialtyHTML }}
                  >
                  </div>
                </div>
              </>
            }
            {dataDetailClinic && !_.isEmpty(dataDetailClinic.deviceHTML) &&
              <>
                <span id='device' ></span>
                <div className='device-clinic'>
                  <div className='title-detail'><FormattedMessage id="clinic.device" /></div>

                  <div className='text-details'
                    dangerouslySetInnerHTML={{ __html: dataDetailClinic.deviceHTML }}
                  >
                  </div>
                </div>
              </>
            }

            {dataDetailClinic && !_.isEmpty(dataDetailClinic.locationHTML) &&
              <>
                <span id='location'></span>
                <div className='location-clinic'>
                  <div className='title-detail'><FormattedMessage id="clinic.location" /></div>
                  <div className='text-details'
                    dangerouslySetInnerHTML={{ __html: dataDetailClinic.locationHTML }}
                  >
                  </div>
                </div>
              </>
            }
            {dataDetailClinic && !_.isEmpty(dataDetailClinic.processHTML) &&
              <>
                <span id='process' ></span>
                <div className='process-clinic'>
                  <div className='title-detail'><FormattedMessage id="clinic.process" /></div>

                  <div className='text-details'
                    dangerouslySetInnerHTML={{ __html: dataDetailClinic.processHTML }}
                  >
                  </div>
                </div>
              </>
            }

          </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(DetailsClinic);

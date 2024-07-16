import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../utils';
import './scss/ProfileDoctor.scss'
import { getProfileDoctorById } from '../../../services/userService';
import _ from 'lodash';
import moment from 'moment';
import { Link } from 'react-router-dom/cjs/react-router-dom';



class ProfileDoctor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataProfile: []
    }

  }

  async componentDidMount() {
    // let { language } = this.props;
    let data = await this.getInforDoctor(this.props.doctorId);
    this.setState({
      dataProfile: data
    })
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {

    }
    if (this.props.doctorId !== prevProps.doctorId) {
      let data = await this.getInforDoctor(this.props.doctorId);
      this.setState({
        dataProfile: data
      })
    }
  }

  getInforDoctor = async (id) => {
    let result = {};
    if (id) {
      let res = await getProfileDoctorById(id);
      if (res && res.errCode === 0) {
        result = res.data;
      }
    }
    return result;
  }

  renderTimeBooking = (dataTime) => {
    let { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi
        : dataTime.timeTypeData.valueEn;

      let date = language === LANGUAGES.VI ?
        moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
        :
        moment.unix(+dataTime.date / 1000).locale('en').format('ddd -MM/DD/YYYY');


      return (
        <>
          <div className='booking-date'>{date}</div>
          <div className='booking-time'>{time}</div>
        </>
      )
    }
    return <></>
  }

  render() {
    let { language, doctorId, isShowDescriptionDoctor, dataTime, isShowLinkDetail, isShowLocation } = this.props;
    let { dataProfile } = this.state;
    let nameVi = '', nameEn = ''
    if (dataProfile && dataProfile.positionData) {
      nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`;
      nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
    }

    return (
      <div className='container profile-doctor'>
        <div className='intro-doctor'>

          <div className='content-left'
          >
            <div className='avatar-doctor'
              style={{ backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})` }}
            >
            </div>
            {isShowLinkDetail === true &&
              <div className='view-detail-doctor'>
                <Link to={`/detail-doctor/${doctorId}`}
                  className='text-view'
                >
                  Xem thêm
                </Link>
              </div>
            }
          </div>

          <div className='content-right'>
            <div className='title-doctor'>
              {language === LANGUAGES.VI ? nameVi : nameEn}
            </div>
            <div className='description-doctor'>
              {isShowDescriptionDoctor === true ?
                <>
                  {dataProfile && dataProfile.Markdown && dataProfile.Markdown.description &&
                    <span>
                      {dataProfile.Markdown.description}
                    </span>
                  }
                </>
                :
                <>
                  {this.renderTimeBooking(dataTime)}
                </>
              }
            </div>
            {isShowLocation === true &&
              <div className='location'><i className="fas fa-map-marker-alt"></i>
                {dataProfile && dataProfile.Doctor_Infor && dataProfile.Doctor_Infor.provinceId &&
                  <span>
                    {language === LANGUAGES.VI ? dataProfile.Doctor_Infor.provinceData.valueVi
                      :
                      dataProfile.Doctor_Infor.provinceData.valueEn}
                  </span>
                }
              </div>
            }
          </div>
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);

import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './scss/ProfileDoctor.scss'
import { getProfileDoctorById } from '../../../services/userService';
import _ from 'lodash';
import moment from 'moment';
import localization from 'moment/locale/vi';



class ProfileDoctor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataProfile: []
    }

  }

  async componentDidMount() {
    let { language } = this.props;
    let data = await this.getInforDoctor(this.props.doctorId);
    this.setState({
      dataProfile: data
    })
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {

    }
    if (this.props.doctorId !== prevProps.doctorId) {
      // this.getInforDoctor(this.props.doctorId)
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
        moment.unix(+dataTime.date / 1000).locale('en').format('ddd - DD/MM/YYYY');


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
    let { language, isShowDescriptionDoctor, dataTime } = this.props;
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
            style={{ backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})` }}
          >
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

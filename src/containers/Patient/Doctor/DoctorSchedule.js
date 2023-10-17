import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import moment from 'moment';
import localization from 'moment/locale/vi';
import './DoctorSchedule.scss';
import { LANGUAGES } from '../../../utils';
import { getScheduleDoctorByDate } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';

// import

class DoctorSchedule extends Component {

  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      allAvailable: []
    }

  }

  async componentDidMount() {
    let { language } = this.props;

    console.log('moment vi: ', moment(new Date()).format('dddd - DD/MM'));
    console.log('moment en: ', moment(new Date()).locale('en').format('ddd - DD/MM'));

    this.setArrDays(language);
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  setArrDays = (language) => {
    let allDays = []
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (language === LANGUAGES.VI) {
        let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
        object.label = this.capitalizeFirstLetter(labelVi);
      } else {
        object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
      }

      object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();

      allDays.push(object);
    }

    this.setState({
      allDays: allDays,
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      this.setArrDays(this.props.language);
    }
  }

  handleOnchangeSelect = async (event) => {
    console.log('doctorIdFromParent: ', event.target.value)
    if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
      let doctorId = this.props.doctorIdFromParent;
      let date = event.target.value
      let res = await getScheduleDoctorByDate(doctorId, date);

      if (res && res.errCode === 0) {
        this.setState({
          allAvailable: res.data ? res.data : []
        })
      }
      console.log('Check res form data: ', res)
    }
  }

  render() {
    let { allDays, allAvailable } = this.state;
    let { language } = this.props;

    return (
      <div className='container doctor-schedule'>
        <div className='all-schedule'>
          <select onChange={(event) => this.handleOnchangeSelect(event)}>
            {allDays && allDays.length > 0 &&
              allDays.map((item, index) => {
                return (
                  <option
                    value={item.value}
                    key={index}
                  >
                    {item.label}
                  </option>
                )
              })
            }
          </select>
        </div>
        <div className='all-available-time'>
          <div className='text-calendar'>
            <span><i className="fas fa-calendar-alt"></i> <FormattedMessage id="common.schedule" /></span>
          </div>
          <div className='time-schedule'>
            {allAvailable && allAvailable.length > 0 ?
              allAvailable.map((item, index) => {
                let timeDisplay = language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn;
                return (
                  <button key={index}> {timeDisplay} </button>
                )
              })
              :
              <div><FormattedMessage id="manage-doctor.not-schedule" /></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);

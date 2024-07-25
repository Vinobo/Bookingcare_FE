import React, { Component } from 'react';
import { connect } from "react-redux";
import moment from 'moment';
import './scss/DoctorSchedule.scss';
import { LANGUAGES } from '../../../utils';
import { getScheduleDoctorByDate } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import BookingDoctor from './Modal/BookingDoctor';

class DoctorSchedule extends Component {

  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      allAvailable: [],
      currentDate: 0,
      isOpenBookingDoctor: false,
      dataScheduleTimeModal: {}
    }

  }

  async componentDidMount() {
    let { language } = this.props;
    let allDays = this.getArrDays(language);

    this.setState({
      allDays: allDays,
      currentDate: allDays[0].value
    })

    if (this.props.doctorIdFromParent) {
      let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value);
      this.setState({
        allAvailable: res.data ? res.data : [],
      })
    }
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  getArrDays = (language) => {
    let allDays = []
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (language === LANGUAGES.VI) {
        if (i === 0) {
          let ddMM = moment(new Date()).format('DD/MM');
          let today = `Hôm nay - ${ddMM}`;
          object.label = today;
        } else {
          const days = moment(new Date()).add(i, 'days').locale('en').format('ddd')
          let day = '';
          switch (days) {
            case 'Sun':
              day = "Chủ nhật";
              break;
            case 'Mon':
              day = "Thứ 2";
              break;
            case 'Tue':
              day = "Thứ 3";
              break;
            case 'Wed':
              day = "Thứ 4";
              break;
            case 'Thu':
              day = "Thứ 5";
              break;
            case 'Fri':
              day = "Thứ 6";
              break;
            case 'Sat':
              day = "Thứ 7";
              break;
            default: day = days;
          }

          object.label = `${day} - ${moment(new Date()).add(i, 'days').locale('en').format('DD/MM')}`;
        }
      } else {
        if (i === 0) {
          let ddMM = moment(new Date()).format('DD/MM');
          let today = `Today - ${ddMM}`;
          object.label = today;
        } else {
          object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
        }
      }

      object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
      allDays.push(object);
    }

    return allDays;
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      let allDays = this.getArrDays(this.props.language);
      this.setState({
        allDays: allDays
      })
    }
    if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
      let allDays = this.getArrDays(this.props.language);
      let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value);
      this.setState({
        allAvailable: res.data ? res.data : [],
        allDays: allDays
      })
    }
    if (prevState.isOpenBookingDoctor !== this.state.isOpenBookingDoctor) {
      let allDays = this.getArrDays(this.props.language);
      let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value);
      this.setState({
        allAvailable: res.data ? res.data : [],
      })
    }
  }

  handleOnchangeSelect = async (event) => {
    if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
      let doctorId = this.props.doctorIdFromParent;
      let date = event.target.value;
      let res = await getScheduleDoctorByDate(doctorId, date);

      if (res && res.errCode === 0) {
        this.setState({
          allAvailable: res.data ? res.data : [],
          currentDate: +date
        })
      }
    }
  }

  handleClickScheduleTime = (time) => {
    this.setState({
      isOpenBookingDoctor: true,
      dataScheduleTimeModal: time
    })
  }

  closeBookingDoctor = () => {
    this.setState({
      isOpenBookingDoctor: false
    })
  }

  renderTimeSchedule = () => {
    let { allAvailable, currentDate } = this.state;
    let { language } = this.props;
    const dateNow = moment(new Date()).startOf('day').valueOf();
    const hourNow = new Date().getHours();
    if (dateNow === currentDate) {
      for (let i = 0; i <= hourNow; i++) {
        allAvailable = allAvailable.filter(e => e.timeType !== `T${i - 7}`);
      }
    }

    return (
      <>
        {allAvailable && allAvailable.length > 0 ?
          <>
            <div className='time-schedule-btns'>
              {allAvailable.map((item, index) => {
                let timeDisplay = language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn;
                return (
                  <button key={index}
                    className={`${language === LANGUAGES.VI ? 'btn-vi' : 'btn-en'} ${item.hasBooking ? 'disabled' : ''}`}
                    onClick={() => this.handleClickScheduleTime(item)}
                  >
                    {timeDisplay}
                  </button>);

              })
              }
            </div>
            <div className='book-free'>
              <span><FormattedMessage id="common.select" /> <i className="far fa-hand-point-up"></i> <FormattedMessage id="common.book-free" /></span>
            </div>
          </>
          :
          <div className='not-schedule'><FormattedMessage id="patient.detail-doctor.not-schedule" /></div>
        }
      </>
    )
  }

  render() {
    let { allDays, isOpenBookingDoctor, dataScheduleTimeModal } = this.state;
    // let { language } = this.props;

    return (
      <>
        <div className='container doctor-schedule'>
          <div className='all-schedule'>
            <select onChange={(event) => this.handleOnchangeSelect(event)}>
              {allDays && allDays.length > 0 &&
                allDays.map((item, index) => {
                  return (
                    <option
                      key={index}
                      value={item.value}
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
              {this.renderTimeSchedule()}
            </div>
          </div>
        </div >
        <BookingDoctor
          isOpenModal={isOpenBookingDoctor}
          closeBookingDoctor={this.closeBookingDoctor}
          dataTime={dataScheduleTimeModal}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);

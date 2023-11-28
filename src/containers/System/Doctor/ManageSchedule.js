import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import * as actions from "../../../store/actions";
import './ManageSchedule.scss'
import { LANGUAGES, dateFormat } from '../../../utils';
import Select from 'react-select';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { saveBulkScheduleDoctor } from '../../../services/userService';

class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDoctors: [],
      selectedDoctor: {},
      currentDate: moment(new Date()).startOf('day').valueOf(),
      rangeTime: [],
      userId: ''
    }
  }

  componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.fetchAllSchedulTime();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
      this.setState({
        listDoctors: dataSelect
      })
    }

    if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
      let data = this.props.allScheduleTime;
      if (data && data.length > 0) {
        data = data.map(item => ({ ...item, isSelected: false }))
      }

      this.setState({
        rangeTime: data
      })
    }
  }

  buildDataInputSelect = (inputData) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let labelVi = `${item.lastName} ${item.firstName}`;
        let labelEn = `${item.firstName} ${item.lastName}`;

        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;
        result.push(object)
      })
    }

    return result;
  }

  handleChangeSelect = async (selectedDoctor) => {
    this.setState({ selectedDoctor: selectedDoctor });

  }

  handleOnchangeDatePiker = (date) => {
    this.setState({
      currentDate: date[0]
    })
  }

  handleClickBtnTime = (time) => {
    let { rangeTime } = this.state;
    if (rangeTime && rangeTime.length > 0) {
      rangeTime = rangeTime.map(item => {
        if (item.id === time.id) item.isSelected = !item.isSelected;
        return item;
      })

      this.setState({
        rangeTime: rangeTime
      })
    }
  }

  handleSaveSchedule = async () => {
    let { rangeTime, selectedDoctor, currentDate } = this.state;
    let { userInfo } = this.props;
    let result = [];
    let userRole = userInfo.roleId;

    if (!currentDate) {
      toast.error("Invalid Date!");
      return;
    }

    // let formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER)
    let formatedDate = new Date(currentDate).getTime();

    if (rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.filter(item => item.isSelected === true)
      selectedTime.map(schedule => {
        let object = {};
        if (userRole === "R1") {
          object.doctorId = selectedDoctor.value;
        } else object.doctorId = userInfo.id;
        object.date = formatedDate;
        object.timeType = schedule.keyMap;
        result.push(object);
      })
    } else {
      toast.error("Invalid selected time!");
      return;
    }

    let doctorId = '';
    if (userRole === "R1") {
      doctorId = selectedDoctor.value;
      if (selectedDoctor && _.isEmpty(selectedDoctor)) {
        toast.error("Invalid selected doctor!");
        return;
      }
    } else doctorId = userInfo.id

    let res = await saveBulkScheduleDoctor({
      arrSchedule: result,
      doctorId: doctorId,
      formatedDate: formatedDate,
    });

    if (res && res.errCode === 0) {
      toast.success("Save Infor succed!")
      if (this.props.history) {
        this.props.history.push(`/doctor/manage-schedule`)
      }
    } else {
      toast.error("error saveBulkScheduleDoctor!");
      console.log('error saveBulkScheduleDoctor >>> res: ', res)
    }
  }

  handleCancle = () => {
    if (this.props.history) {
      this.props.history.push(`/doctor/manage-schedule`)
    }
  }

  render() {
    let { rangeTime } = this.state;
    let { language, userInfo } = this.props;
    let userRole = userInfo.roleId;
    let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    console.log('check pros: ', this.props)

    return (
      <div className='container manage-shedule '>
        <div className='m-s-title'>
          <FormattedMessage id='manage-schedule.title' />
        </div>
        <div className='container'>
          <div className='manage-shedule-body'>
            <div className='select-doctor'>
              {userRole && userRole === "R1" ?
                <>
                  <label><FormattedMessage id='common.choose-doctor' /></label>
                  <Select
                    value={this.state.selectedDoctor}
                    onChange={this.handleChangeSelect}
                    options={this.state.listDoctors}
                  />
                </>
                :
                <div className='flex-cl'>
                  <label><FormattedMessage id='common.doctor' /></label>
                  {language === 'vi' ?
                    <label>{userInfo.lastName} {userInfo.firstName} </label>
                    :
                    <label>{userInfo.firstName} {userInfo.lastName} </label>
                  }
                </div>
              }

            </div>

            <div className='select-date'>
              <label><FormattedMessage id='common.choose-date' /></label>
              <DatePicker
                className='form-control'
                onChange={this.handleOnchangeDatePiker}
                selected={this.state.currentDate}
                value={this.state.currentDate}
                minDate={yesterday}
              />
            </div>

            <div className='pick-hour'>
              {rangeTime && rangeTime.length > 0 &&
                rangeTime.map((item, index) => {
                  return (
                    <button
                      className={item.isSelected === true ? 'btn btn-schedule active' : 'btn btn-schedule'}
                      key={index}
                      onClick={() => this.handleClickBtnTime(item)}
                    >
                      {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                    </button>
                  )
                })
              }
            </div>
            <div>
              <button className='btn btn-primary btn-save-schedule'
                onClick={() => this.handleSaveSchedule()}
              >
                <FormattedMessage id='common.save' />
              </button>
              <button className='cancle' onClick={() => this.handleCancle()}>Cancle</button>
            </div>

          </div>
        </div>
      </div >
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    allDoctors: state.admin.allDoctors,
    allScheduleTime: state.admin.allScheduleTime,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    fetchAllSchedulTime: () => dispatch(actions.fetchAllSchedulTime()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);

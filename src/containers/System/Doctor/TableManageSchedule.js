import React, { Component } from 'react';
// import { Redirect, Route, Switch } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import './TableManageSchedule.scss';
// import * as actions from "../../../store/actions";
import { deleteScheduleService, getScheduleDoctorByDate } from '../../../services/userService';
import { toast } from 'react-toastify';
import moment from 'moment';
import DatePicker from '../../../components/Input/DatePicker';
import { LANGUAGES } from '../../../utils';


class TableManageSchedule extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf('day').valueOf(),
      dataSchedule: [],
    }
  }

  handleGetDataSchedule = async () => {
    if (this.props.userInfo.id) {
      let res = await getScheduleDoctorByDate(this.props.userInfo.id, this.state.currentDate);
      this.setState({
        dataSchedule: res.data ? res.data : [],
      })
    }
  }

  async componentDidMount() {
    // let { language } = this.props.language;
    this.handleGetDataSchedule()
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.language !== this.props.language) {
      this.handleGetDataSchedule()
    }

  }


  handleDeleteSchedule = async (id) => {
    let res = await deleteScheduleService(id);
    if (res && res.errCode === 0) {
      toast.success('Delete the schedule succeed!')
      this.handleGetDataSchedule()
    } else {
      toast.error('Delete the schedule failed!')
    }
  }

  toCreateSchedule = () => {
    if (this.props.history) {
      this.props.history.push(`/doctor/create-schedule`)
    }
  }

  handleOnchangeDatePiker = async (date) => {
    let formatedDate = new Date(date[0]).getTime();
    let res = await getScheduleDoctorByDate(this.props.userInfo.id, formatedDate);
    this.setState({
      currentDate: formatedDate,
      dataSchedule: res.data ? res.data : [],
    })
  }

  render() {
    let dataSchedule = this.state.dataSchedule;
    let { language } = this.props;

    return (
      <div className='mamage-schedule'>
        <div className='container'>
          <div className='title-mn-schedule'><FormattedMessage id="admin.manage-schedule.title" /></div>
          <div className='add-schedule'>
            <button onClick={() => this.toCreateSchedule()} >
              <i className="fas fa-plus"></i> <FormattedMessage id="admin.manage-doctor.create-schedule" />
            </button>
          </div>
          <div className='select-date'>
            <label><FormattedMessage id='common.choose-date' /></label>
            <DatePicker
              className='form-control'
              onChange={this.handleOnchangeDatePiker}
              selected={this.state.currentDate}
              value={this.state.currentDate}
            />
          </div>
          <table id='table-manage-schedule'>
            <tbody>
              <tr>
                <th>Time</th>
                <th><FormattedMessage id="user-manage.action" /></th>
              </tr>

              {dataSchedule && dataSchedule.length > 0 ?
                dataSchedule.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn}</td>
                      <td className='btn-item'>
                        <button className='btn-delete'
                          onClick={() => this.handleDeleteSchedule(item.id)}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </td>
                    </tr>
                  )
                })
                :
                <tr>
                  <td colSpan='6' style={{ textAlign: 'center' }}>Không có lịch trình</td>
                </tr>
              }

            </tbody>
          </table>
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    userInfo: state.user.userInfo,
    language: state.app.language,
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TableManageSchedule));

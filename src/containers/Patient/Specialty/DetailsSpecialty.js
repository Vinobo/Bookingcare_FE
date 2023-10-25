import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './DetailsSpecialty.scss';
import Header from '../../HomePage/Header';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import AddressDoctor from '../Doctor/AddressDoctor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getAllCodeService, getAllDetailSpecialtyById } from '../../../services/userService';
import _ from 'lodash';


class DetailsSpecialty extends Component {

  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      dataDetailSpecialty: {},
      listProvince: []
    }

  }

  async componentDidMount() {
    let { language } = this.props;

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
            arr.map(item => {
              arrDoctorId.push(item.doctorId)
            })

          }
        }
        this.setState({
          dataDetailSpecialty: res.data,
          arrDoctorId: arrDoctorId,
          listProvince: resProvince.data
        })
      }
    }

  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {

    }
  }

  handleOnChangeSelectProvince = (event) => {
    console.log('check valueeeeeeeeeee: ', event.target.value)
  }

  render() {
    let { language } = this.props;
    let { arrDoctorId, dataDetailSpecialty, listProvince } = this.state;
    console.log('check ressssssssssssssssss: ', this.state)
    return (
      <div className='detail-specialty'>
        <div>
          <Header />
          <div className='description-specialty general-container'>
            {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) &&

              <div
                dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHTML }}
              >
              </div>
            }
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailsSpecialty);

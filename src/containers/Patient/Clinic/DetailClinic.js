import React, { Component } from 'react';
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
    console.log('check ressssssssssssssssss: ', this.state)
    return (
      <div className='detail-clinic'>
        <div>
          <Header />
          <div className='clinic-img'
            style={{
              backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 1)),
              url(${dataDetailClinic && dataDetailClinic.image ? dataDetailClinic.image : ''})`,
            }}
          >
            <div className='description-clinic general-container'>
              {dataDetailClinic && !_.isEmpty(dataDetailClinic) &&
                <>
                  <div className='name-clinic'>
                    {dataDetailClinic.name}
                  </div>
                  <div className='address-clinic'>
                    {dataDetailClinic.address}
                  </div>
                  <div className='max-height'
                    dangerouslySetInnerHTML={{ __html: dataDetailClinic.introHTML }}
                  >
                  </div>
                  {/* <div>
                  <span className='btn-showOn'
                    onClick={() => this.showHideDiscription(true)}
                  >
                    <FormattedMessage id="common.see-details" />
                  </span>
                </div> */}
                </>
              }
            </div>
          </div>
          <div className='general-container'>
            {arrDoctorId && arrDoctorId.length > 0 &&
              arrDoctorId.map((item, index) => {
                return (
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
                )
              })}
          </div>
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

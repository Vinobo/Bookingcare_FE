import React, { Component } from 'react';
import { connect } from 'react-redux';
import './scss/OutStandingDoctor.scss';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import Slider from "react-slick";

class OutStandingDoctor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      arrDoctors: [],
      doctorId: '',
    }
  }

  async componentDidMount() {

    this.props.loadTopDoctors();
  }


  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      let arrDoctors = this.props.topDoctorsRedux;
      this.setState({
        arrDoctors: arrDoctors
      })
    }
  }

  handleViewDetailDoctor = (doctor) => {
    if (this.props.history) {
      this.props.history.push(`/detail-doctor/${doctor.id}`)
    }
  }

  render() {
    let { arrDoctors } = this.state;
    let { language } = this.props;

    return (
      <div className='section-general out-standing-doctor'>
        <div className='section-cotainer'>
          <div className='section-header'>
            <span><FormattedMessage id="home-body.outstanding-doctor" /></span>
            <Link to={`/all-doctor/`}
              className='text-view'
            >
              <button><FormattedMessage id="home-body.view-more" /></button>
            </Link>
          </div>
          <div className='section-content'>
            {arrDoctors.length === 0 &&
              <p>Loading...</p>
            }
            <Slider {...this.props.settings}>
              {arrDoctors && arrDoctors.length > 0
                && arrDoctors.map((item, index) => {
                  let imageBase64 = '';
                  if (item.image) {
                    imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                  }
                  let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                  let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                  return (
                    <div className='section-img'
                      key={{ index }}
                      onClick={() => this.handleViewDetailDoctor(item)}
                    >
                      <div className='img-customize'
                        style={{ backgroundImage: `url(${imageBase64})` }}
                      />
                      <div>
                        {language === LANGUAGES.VI ? nameVi : nameEn}
                      </div>

                      <span className='text-img'>
                        {item.Doctor_Infor && item.Doctor_Infor.specialtyData ? item.Doctor_Infor.specialtyData.name : ''}
                      </span>
                    </div>
                  )
                })
              }
            </Slider>
          </div>
        </div>
      </div>

    );
  }

}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    topDoctorsRedux: state.admin.topDoctors,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
  }
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));

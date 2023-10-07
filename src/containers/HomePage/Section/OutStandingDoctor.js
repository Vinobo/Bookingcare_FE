import React, { Component } from 'react';
import { connect } from 'react-redux';
import './scss/OutStandingDoctor.scss';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';

import Slider from "react-slick";

class OutStandingDoctor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      arrDoctors: [],
    }
  }

  componentDidMount() {
    this.props.loadTopDoctors();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      this.setState({
        arrDoctors: this.props.topDoctorsRedux
      })
    }
  }

  render() {
    let arrDoctors = this.state.arrDoctors;
    let { language } = this.props;
    arrDoctors = arrDoctors.concat(arrDoctors).concat(arrDoctors)

    return (
      <div className='section-general out-standing-doctor'>
        <div className='section-cotainer'>
          <div className='section-header'>
            <span><FormattedMessage id="home-body.outstanding-doctor" /></span>
            <button><FormattedMessage id="common.search" /></button>
          </div>
          <div className='section-content'>
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
                    <div className='section-img' key={{ index }}>
                      <div className='img-customize'
                        style={{ backgroundImage: `url(${imageBase64})` }}
                      />
                      <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                      <span>Nam học</span>
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
    topDoctorsRedux: state.admin.topDoctors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchTopDoctor())
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);

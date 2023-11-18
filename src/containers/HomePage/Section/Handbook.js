import React, { Component } from 'react';
import { connect } from 'react-redux';
import './scss/Handbook.scss';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import { withRouter } from 'react-router';
import five_different from '../../../assets/handBook/105518-tam-soat-benh-doctor-check.png';


class HandBook extends Component {

  handleViewDetailHandbook = (id) => {

    this.props.history.push(`/detail-handbook-${id}/`)
  }

  render() {

    return (
      <div className='section-general hand-book'>
        <div className='section-cotainer'>
          <div className='section-header'>
            <span><FormattedMessage id="common.handbook" /></span>
            <button><FormattedMessage id="home-body.all-articles" /></button>
          </div>
          <div className='section-content'>
            <Slider {...this.props.settings}>
              <div className='section-img-row' onClick={() => this.handleViewDetailHandbook(1)}>
                <img src={five_different} />
                <div className='text-content'>
                  <span>5 khác biệt khi tầm soát bệnh, khám tổng quát tại Doctor Check</span>
                </div>
              </div>
              <div className='section-img-row' onClick={() => this.handleViewDetailHandbook(2)}>
                <img src={five_different} />
                <div className='text-content'>
                  <span>5 khác biệt khi tầm soát bệnh, khám tổng quát tại Doctor Check</span>
                </div>
              </div>
              <div className='section-img-row' onClick={() => this.handleViewDetailHandbook(3)}>
                <img src={five_different} />
                <div className='text-content'>
                  <span>5 khác biệt khi tầm soát bệnh, khám tổng quát tại Doctor Check</span>
                </div>
              </div>
              <div className='section-img-row' onClick={() => this.handleViewDetailHandbook(4)}>
                <img src={five_different} />
                <div className='text-content'>
                  <span>5 khác biệt khi tầm soát bệnh, khám tổng quát tại Doctor Check</span>
                </div>
              </div>
              <div className='section-img-row' onClick={() => this.handleViewDetailHandbook(5)}>
                <img src={five_different} />
                <div className='text-content'>
                  <span>5 khác biệt khi tầm soát bệnh, khám tổng quát tại Doctor Check</span>
                </div>
              </div>
              <div className='section-img-row' onClick={() => this.handleViewDetailHandbook(6)}>
                <img src={five_different} />
                <div className='text-content'>
                  <span>5 khác biệt khi tầm soát bệnh, khám tổng quát tại Doctor Check</span>
                </div>
              </div>

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
    language: state.app.language
  };
};

const mapDispatchToProps = dispatch => {
  return {
  }
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HandBook));

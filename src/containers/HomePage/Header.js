import React, { Component, useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import { connect } from 'react-redux';
import './Header.scss';
import logo from "../../assets/images/bookingcare-2020.svg";
import { withRouter } from 'react-router'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from "../../utils";
import { changeLanguageApp } from "../../store/actions"
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { getAllSpecialties } from '../../services/userService';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prevScrollpos: window.pageYOffset,
      visible: false,
      dataSpecialty: []
    };
  }
  handleDataSpecialty = async () => {
    let res = await getAllSpecialties();
    if (res && res.errCode === 0) {
      this.setState({
        dataSpecialty: res.data
      })
    }
  }

  // Adds an event listener when the component is mount.
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    this.handleDataSpecialty()
  }
  // Remove the event listener when the component is unmount.
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
  // Hide or show the menu.
  handleScroll = () => {
    const { prevScrollpos } = this.state;
    const currentScrollPos = window.pageYOffset;
    const visible = prevScrollpos > currentScrollPos;
    const diff = 4;
    const stateNotMatched = visible !== this.state.visible
    const scrollDownTooFast = currentScrollPos - prevScrollpos > diff
    const scrollUpTooFast = currentScrollPos - prevScrollpos < - diff

    const shouldToggleHeader = stateNotMatched && (scrollDownTooFast || scrollUpTooFast)
    if (shouldToggleHeader) {
      this.setState({
        prevScrollpos: currentScrollPos,
        visible: visible
      });
    }
    prevScrollpos = currentScrollPos > 0 ? currentScrollPos : 0
  };


  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);

  }

  returnToHome = () => {
    if (this.props.history) {
      this.props.history.push(`/home`)
    }
  }

  render() {
    let language = this.props.language;
    let { visible, dataSpecialty } = this.state;

    return (
      <React.Fragment>
        <div className={`home-header-container sticky-md-top ${visible ? "header-hide" : "header-show"}`}>
          <div className='home-header-content'>
            <div className='left-content'>
              <div className='header-logo'>
                <img src={logo} onClick={() => this.returnToHome()} />
              </div>
            </div>

            <div className='center-content'>
              <Link to={`/all-specialty/`}
                className='text-view'
              >
                <div className='child-content'>
                  <div className='subs-title'><b><FormattedMessage id="common.specialty" /></b></div>
                  <div className='subs-content'><FormattedMessage id="home-header.search-doctor" /></div>
                </div>
              </Link>
              <Link to={`/all-clinic/`}
                className='text-view'
              >
                <div className='child-content'>
                  <div className='subs-title'><b><FormattedMessage id="home-header.health-facility" /></b></div>
                  <div className='subs-content'><FormattedMessage id="home-header.select-room" /></div>
                </div>
              </Link>
              <Link to={`/all-doctor/`}
                className='text-view'
              >
                <div className='child-content'>
                  <div className='subs-title'><b><FormattedMessage id="common.doctor" /></b></div>
                  <div className='subs-content'><FormattedMessage id="home-header.select-doctor" /></div>
                </div>
              </Link>
              <div className='child-content'>
                <div className='subs-title'><b><FormattedMessage id="home-header.fee" /></b></div>
                <div className='subs-content'><FormattedMessage id="home-header.general-health-check" /></div>
              </div>
            </div>

            <div className='right-content'>
              <div className='support'>
                <i className="far fa-question-circle"></i>
                <FormattedMessage id="home-header.support" />
              </div>
              <div className={language === LANGUAGES.VI ? 'lang-vi active' : 'lang-vi'}><span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span></div>
              <div className={language === LANGUAGES.EN ? 'lang-en active' : 'lang-en'}><span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span></div>
            </div>
          </div>
        </div>

        {this.props.isShowBanner === true &&
          <div className='home-header-banner'>
            <div className='content-up'>
              <div className='title1'><FormattedMessage id="banner.title1" /></div>
              <div className='title2'><FormattedMessage id="banner.title2" /></div>
              <div className='search'>
                <i className="fas fa-search"></i>
                <input type='text' placeholder='Tìm chuyên khoa khám bệnh' />
              </div>
            </div>

            <div className='content-down'>
              <div className='options'>
                <Link to={`/all-specialty/`}
                  className='text-view'
                >
                  <div className='option-child'>
                    <div className='icon-child'><i className="far fa-hospital"></i></div>
                    <div className='text-child'><FormattedMessage id="banner.child1" /></div>
                  </div>
                </Link>

                <div className='option-child'>
                  <div className='icon-child'><i className="fas fa-mobile-alt"></i></div>
                  <div className='text-child'><FormattedMessage id="banner.child2" /></div>
                </div>

                <div className='option-child'>
                  <div className='icon-child'><i className="fas fa-stethoscope"></i></div>
                  <div className='text-child'><FormattedMessage id="banner.child3" /></div>
                </div>
                <div className='option-child'>
                  <div className='icon-child'><i className="fas fa-vial"></i></div>
                  <div className='text-child'><FormattedMessage id="banner.child4" /></div>
                </div>
                <div className='option-child'>
                  <div className='icon-child'>
                    <i className="material-symbols-outlined">psychology</i>
                  </div>
                  <div className='text-child'><FormattedMessage id="banner.child5" /></div>
                </div>
                <div className='option-child'>
                  <div className='icon-child'>
                    <i className="material-symbols-outlined">dentistry</i></div>
                  <div className='text-child'><FormattedMessage id="banner.child6" /></div>
                </div>
              </div>
            </div>
          </div>
        }
      </React.Fragment >
    );
  }

}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeLanguageAppRedux: (language) => {
      dispatch(changeLanguageApp(language))
    }
  };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));

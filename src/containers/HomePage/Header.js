import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Header.scss';
import logo from "../../assets/images/LOGO.png";
import { withRouter } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from "../../utils";
import { changeLanguageApp } from "../../store/actions"
import { Link } from 'react-router-dom/cjs/react-router-dom';
// import { getAllClinic, getAllDoctors, getAllSpecialties } from '../../services/userService';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // dataSpecialties: [],
      // dataClinic: [],
      // dataDoctors: [],
      inputValue: '',
      searchSpecialties: [],
      searchClinic: [],
      searchDoctors: [],
      // isLoading: false
    };
  }

  async componentDidMount() {

  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.dataSearch !== this.props.dataSearch) {

    }
  }

  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);

  }

  returnToHome = () => {
    if (this.props.history) {
      this.props.history.push(`/home`)
    }
  }

  removeAscent = (str) => {
    if (str === null || str === undefined) return str;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    return str;
  }


  handleSearch = (event) => {
    const value = event.target.value;
    const { dataSpecialties, dataClinic, dataDoctors } = this.props.dataSearch || [];

    if (value) {
      this.setState({
        inputValue: value
      })
    } else {
      this.setState({
        inputValue: ''
      })
    }

    const findValue = (name) => {
      return this.removeAscent(name).toLowerCase().includes(value.toLowerCase()) === true;
    }
    const setLimitArr = (arr) => {
      arr.length = arr.length > 5 ? 5 : arr.length;
    }
    if (dataSpecialties.length > 0) {
      const specialties = value ? dataSpecialties.filter(e => findValue(e.name)) : [];
      setLimitArr(specialties);
      // specialties.length = specialties.length > 5 ? 5 : specialties.length;
      this.setState({
        searchSpecialties: specialties
      })
    }

    if (dataClinic.length > 0) {
      const clinic = value ? dataClinic.filter(e => findValue(e.name)) : [];
      setLimitArr(clinic);
      // clinic.length = clinic.length > 5 ? 5 : clinic.length;
      this.setState({
        searchClinic: clinic
      })
    }

    if (dataDoctors.length > 0) {
      const doctors = value ? dataDoctors.filter(e => {
        return (findValue(e.firstName)
          ||
          findValue(e.lastName)
        )
      }) : [];

      setLimitArr(doctors);
      // doctors.length = doctors.length > 5 ? 5 : doctors.length;
      this.setState({
        searchDoctors: doctors
      })
    }

  }

  handleCleanInput = () => {
    this.setState({
      inputValue: ''
    })
  }

  handleViewDetailSpecialty = (id) => {
    if (this.props.history) {
      this.props.history.push(`/detail-specialty/${id}`)
    }
  }

  handleViewDetailClinic = (id) => {
    if (this.props.history) {
      this.props.history.push(`/detail-clinic/${id}`)
    }
  }

  handleViewDetailDoctor = (id) => {
    if (this.props.history) {
      this.props.history.push(`/detail-doctor/${id}`)
    }
  }

  render() {
    const language = this.props.language;
    const { inputValue, searchSpecialties, searchClinic, searchDoctors } = this.state;
    const { isLoading } = this.props.dataSearch || false;
    const placeholder = language === LANGUAGES.VI ? "Tìm chuyên khoa khám bệnh" : "Find a medical specialist";
    let imageBase64 = '';

    return (
      <React.Fragment>
        <div className={`home-header-container`}>
          <div className='home-header-content'>
            <div className='left-content'>
              <div className='header-logo'>
                <div className='logo' onClick={() => this.returnToHome()} >
                  <img src={logo} alt='logo' />
                  <span>LiveCare</span>
                </div>
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
              <Link to={`/all-handbook/`}
                className='text-view'
              >
                <div className='child-content'>
                  <div className='subs-title'><b><FormattedMessage id="common.handbook" /></b></div>
                  <div className='subs-content'><FormattedMessage id="home-header.select-handbook" /></div>
                </div>
              </Link>
            </div>

            <div className='right-content'>
              <Link to={`/support/`}
                className='text-view'
              >
                <div className='support'>
                  <i className="far fa-question-circle"></i>
                  <FormattedMessage id="home-header.support" />
                </div>
              </Link>
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
              <div className={`search ${inputValue && 'hasInputSearch'}`}>
                <i className="fas fa-search"></i>
                <input
                  type='text'
                  placeholder={isLoading ? 'Loading...' : placeholder}
                  value={inputValue}
                  onChange={(event) => this.handleSearch(event)}
                />
                {inputValue &&
                  <i className="fa fa-times" onClick={() => this.handleCleanInput()}></i>
                }
                {inputValue &&
                  <div div className='search-result'>
                    <>{(searchSpecialties.length === 0 && searchClinic.length === 0 && searchDoctors.length === 0) &&
                      <p>{language === LANGUAGES.VI ? 'Không tìm thấy kết quả nào' : 'No search results'}</p>
                    }
                      {searchSpecialties.length > 0 &&
                        <ul className='specailties-result'>
                          <p><FormattedMessage id="common.specialty" /></p>
                          {searchSpecialties && searchSpecialties.map(e => (
                            <li key={e.id} onClick={() => this.handleViewDetailSpecialty(e.id)}><img src={`${e.image}`} alt='specialty' />{e.name}</li>
                          ))}
                        </ul>
                      }
                      {searchClinic.length > 0 &&
                        <ul className='clinic-result'>
                          <p><FormattedMessage id="common.clinic" /></p>
                          {searchClinic && searchClinic.map(e => (
                            <li key={e.id} onClick={() => this.handleViewDetailClinic(e.id)}><img src={`${e.image}`} alt='clinic' />{e.name}</li>
                          ))}
                        </ul>
                      }
                      {searchDoctors.length > 0 &&
                        <ul className='doctors-result'>
                          <p><FormattedMessage id="common.doctor" /></p>
                          {searchDoctors && searchDoctors.map(e => {
                            if (e.image) {
                              imageBase64 = new Buffer(e.image, 'base64').toString('binary');
                            }

                            return <li key={e.id} onClick={() => this.handleViewDetailDoctor(e.id)}><img src={`${imageBase64}`} alt='doctor' />{e.firstName} {e.lastName}</li>
                          })}
                        </ul>
                      }
                    </>
                  </div>
                }
              </div>
            </div>

            {/* <div className='content-down'>
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
            </div> */}
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

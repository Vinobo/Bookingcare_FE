import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { LANGUAGES } from '../../../utils';
import './AllSpecialty.scss';
import { FormattedMessage } from 'react-intl';
import { getAllSpecialties } from '../../../services/userService';
import Header from '../../HomePage/Header';
import About from '../../HomePage/Section/About';
import Footer from '../../HomePage/Footer';
import { Link } from 'react-router-dom/cjs/react-router-dom';

class AllSpecialty extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSpecialty: []
    }

  }

  handleDataSpecialty = async () => {
    let res = await getAllSpecialties();
    if (res && res.errCode === 0) {
      this.setState({
        dataSpecialty: res.data
      })
    }
  }

  async componentDidMount() {
    let { language } = this.props;
    this.handleDataSpecialty()
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {

    }
    if (this.state !== prevState) {
      this.handleDataSpecialty()
    }
  }

  returnToHome = () => {
    if (this.props.history) {
      this.props.history.push(`/home`)
    }
  }

  render() {
    let { language } = this.props;
    let { dataSpecialty } = this.state

    return (
      <>
        <div>
          <Header></Header>
        </div>
        <div className='all-specialty-container'>
          <div className='sticky-menu'>
            <div className='goBack'>
              <div className='general-container flex-back'>
                <i className="fas fa-long-arrow-alt-left" onClick={() => this.props.history.goBack()}></i>
                <span className='bd-l-r' onClick={() => this.returnToHome()}> <i className="fas fa-home"></i> </span>
                <span><FormattedMessage id="patient.title.all-specialty" /></span>
              </div>
            </div>
          </div>
          <div className='general-container'>
            <h1><FormattedMessage id="patient.title.all-specialty" /></h1>
            <div className='detail-all-specialty'>
              {dataSpecialty && dataSpecialty.length > 0 ?
                <>
                  {dataSpecialty.map((item, index) => {
                    return (
                      <Link to={`/detail-specialty/${item.id}`}
                        className='text-view'
                      >
                        <div className='item-row'>
                          <div className='img-specialty'
                            style={{ backgroundImage: `url(${item && item.image ? item.image : ''})` }}
                          ></div>
                          <span>{item.name}</span>
                        </div>
                      </Link>
                    )
                  })}
                </>
                :
                <></>
              }
            </div>
          </div>

        </div>
        <About></About>
        <Footer></Footer>
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

export default connect(mapStateToProps, mapDispatchToProps)(AllSpecialty);

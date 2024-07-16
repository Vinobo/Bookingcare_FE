import React, { Component } from 'react';
import { connect } from "react-redux";
// import { LANGUAGES } from '../../../utils';
import './AllClinic.scss';
import { FormattedMessage } from 'react-intl';
import { getAllClinic } from '../../../services/userService';
import Header from '../../HomePage/Header';
import About from '../../HomePage/Section/About';
import Footer from '../../HomePage/Footer';
import { Link } from 'react-router-dom/cjs/react-router-dom';

class AllClinic extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataClinic: []
    }

  }

  handleDataClinic = async () => {
    let res = await getAllClinic();
    if (res && res.errCode === 0) {
      this.setState({
        dataClinic: res.data
      })
    }
  }

  async componentDidMount() {
    // let { language } = this.props;
    this.handleDataClinic()
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {

    }
    if (this.state !== prevState) {
      this.handleDataClinic()
    }
  }

  returnToHome = () => {
    if (this.props.history) {
      this.props.history.push(`/home`)
    }
  }

  render() {
    // let { language } = this.props;
    let { dataClinic } = this.state

    return (
      <>
        <Header></Header>
        <div className='all-clinic-container'>
          <div className='goBack'>
            <div className='general-container flex-back'>
              <i className="fas fa-long-arrow-alt-left" onClick={() => this.props.history.goBack()}></i>
              <span className='bd-l-r' onClick={() => this.returnToHome()}> <i className="fas fa-home"></i> </span>
              <span><FormattedMessage id="patient.title.all-clinic" /></span>
            </div>
          </div>
          <div className='general-container'>
            <h1><FormattedMessage id="patient.title.all-clinic" /></h1>
            <div className='detail-all-clinic'>
              {dataClinic && dataClinic.length > 0 ?
                <>
                  {dataClinic.map((item, index) => {
                    return (
                      <Link to={`/detail-clinic/${item.id}`}
                        className='text-view'
                        key={index}
                      >
                        <div className='item-row'>
                          <div className='img-clinic'
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

export default connect(mapStateToProps, mapDispatchToProps)(AllClinic);

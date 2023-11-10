import React, { Component } from 'react';
import { connect } from 'react-redux';
import './scss/Specialty.scss';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import { getAllSpecialties } from '../../../services/userService';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom/cjs/react-router-dom';


class Specialty extends Component {

  constructor(props) {
    super(props)
    this.state = {
      dataSpecialty: []
    }
  }

  async componentDidMount() {
    let res = await getAllSpecialties();
    if (res && res.errCode === 0) {
      this.setState({
        dataSpecialty: res.data ? res.data : []
      })
    }
  }

  handleViewDetailSpecialty = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-specialty/${item.id}`)
    }

  }

  render() {
    let { dataSpecialty } = this.state;

    return (
      <div className='section-general specialty'>
        <div className='section-cotainer'>
          <div className='section-header'>
            <span><FormattedMessage id="home-body.popular-specialties" /></span>
            <Link to={`/all-specialty/`}
              className='text-view'
            >
              <button><FormattedMessage id="home-body.view-more" /></button>
            </Link>
          </div>
          <div className='section-content'>
            <Slider {...this.props.settings}>
              {dataSpecialty && dataSpecialty.length > 0 &&
                dataSpecialty.map((item, index) => {
                  return (
                    <div className='section-img' key={index}
                      onClick={() => this.handleViewDetailSpecialty(item)}
                    >
                      <div className='img-customize'
                        style={{ backgroundImage: `url(${item.image})` }}
                      />
                      <span className='text-img'>{item.name}</span>
                    </div>
                  )
                })
              }


            </Slider>
          </div>
        </div >
      </div >

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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));

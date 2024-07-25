import React, { Component } from 'react';
import { connect } from 'react-redux';
import './scss/MedicalFacility.scss';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom/cjs/react-router-dom';

class MedicalFacility extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  async componentDidMount() {

  }

  handleViewDetailClinic = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-clinic/${item.id}`)
    }
  }

  render() {
    const { dataClinic, isLoading } = this.props;

    return (
      <div className='section-general medical-facility'>
        <div className='section-cotainer'>
          <div className='section-header'>
            <span><FormattedMessage id="home-body.outstanding-facility" /></span>
            <Link to={`/all-clinic/`}
              className='text-view'
            >
              <button><FormattedMessage id="home-body.view-more" /></button>
            </Link>
          </div>
          <div className='section-content'>
            {isLoading && <p>Loading...</p>}
            <Slider {...this.props.settings}>
              {dataClinic && dataClinic.length > 0 &&
                dataClinic.map((item, index) => {
                  return (
                    <div className='section-img' key={index}
                      onClick={() => this.handleViewDetailClinic(item)}
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));

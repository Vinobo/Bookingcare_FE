import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import Header from '../../HomePage/Header';
import './scss/DetailDoctor.scss';
import { LANGUAGES } from '../../../utils';
import DoctorSchedule from './DoctorSchedule';
import AddressDoctor from './AddressDoctor';
import About from '../../HomePage/Section/About';
import Footer from '../../HomePage/Footer';
import Comment from '../SocialPlugin/Comment';
import LikeAndShare from '../SocialPlugin/LikeAndShare';
import _ from 'lodash'


class DetailDoctor extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }

  }

  async componentDidMount() {

    if (this.props.match && this.props.match.params && this.props.match.params.id) {
      const id = this.props.match.params.id;
      this.props.fetchDetailDoctor(id);
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      if (this.props.match && this.props.match.params && this.props.match.params.id) {
        const id = this.props.match.params.id;
        this.props.fetchDetailDoctor(id);
      }
    }
  }

  render() {
    const { language, detailDoctor } = this.props;
    let nameVi = '', nameEn = ''
    if (detailDoctor && detailDoctor.positionData) {
      nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
      nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
    }
    const url = +process.env.REACT_APP_IS_LOCALHOST === 1 ? '' : window.location.href;

    return (
      <>
        <div>
          <Header isShowBanner={false} search={false} />
        </div>
        <div className='doctor-detail-container'>
          {_.isEmpty(detailDoctor) ?
            <div className='loading-page'>Loading...</div>
            :
            <>

              <div className='goBack'>
                <div className='general-container'
                  onClick={() => this.props.history.goBack()}
                >
                  <div className='flex-row'>
                    <i className="fas fa-long-arrow-alt-left"></i>
                    <span>{language === LANGUAGES.VI ? nameVi : nameEn}</span>
                  </div>
                </div>
              </div>
              <div className='intro-doctor general-container'>
                <div className='content-left'
                  style={{ backgroundImage: `url(${detailDoctor && detailDoctor.image ? detailDoctor.image : ''})` }}
                >
                </div>
                <div className='content-right'>
                  <div className='title-doctor'>
                    {language === LANGUAGES.VI ? nameVi : nameEn}
                  </div>
                  <div className='description-doctor'>
                    {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.description &&
                      <span>
                        {detailDoctor.Markdown.description}
                      </span>
                    }
                    <div className='like-share-plugin'>
                      <LikeAndShare dataHref={url} />
                    </div>
                  </div>
                </div>
              </div>

              <div className='schedule-doctor general-container'>
                <div className='content-left'>
                  <DoctorSchedule
                    doctorIdFromParent={detailDoctor.id}
                  />
                </div>
                <div className='content-right'>
                  <AddressDoctor
                    doctorIdFromParent={detailDoctor.id}
                  />
                </div>
              </div>

              <div className='detail-doctor'>
                <div className='content-detail'>
                  {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML &&
                    <div
                      dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTML }}
                    >
                    </div>
                  }
                </div>
              </div>
            </>
          }
          <div className='comment-doctor'>
            <Comment dataHref={url} />
          </div>
          <About />
          <Footer />
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    language: state.app.language,
    detailDoctor: state.admin.detailDoctor
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchDetailDoctor: (Id) => dispatch(actions.fetchDetailDoctor(Id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);

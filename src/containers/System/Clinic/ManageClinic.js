import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { LANGUAGES, CommonUtils, CRUD_ACTIONS } from '../../../utils';
import * as actions from "../../../store/actions";
import { FormattedMessage } from 'react-intl';
import './ManageClinic.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { createNewClinic } from '../../../services/userService';
import { toast } from 'react-toastify';
import Select from 'react-select';

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      imageBase64: '',
      listProvince: [],
      selectedProvince: '',
      introHTML: '',
      introMarkdown: '',
      specialtyHTML: '',
      specialtyMarkdown: '',
      deviceHTML: '',
      deviceMarkdown: '',
      locationHTML: '',
      locationMarkdown: '',
      processHTML: '',
      processMarkdown: '',

      hasOldData: false,

      previewImgURL: '',
      isOpen: false,

    }

  }

  buildDataInputSelect = (inputData, type) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      if (type === 'PROVINCE') {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVi}`;
          let labelEn = `${item.valueEn}`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object)
        })
      }
    }
    return result;
  }

  async componentDidMount() {
    let { language } = this.props;
    this.props.getAllRequiredDoctorInfor();
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      let { resProvince } = this.props.allRequiredDoctorInfor;
      let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');

      this.setState({
        listProvince: dataSelectProvince,
      })
    }

    if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
      let { resProvince } = this.props.allRequiredDoctorInfor;
      let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');

      this.setState({
        listProvince: dataSelectProvince,
      })
    }
  }

  handleOnchangeInput = (event, id) => {
    let stateCopy = { ...this.state }
    stateCopy[id] = event.target.value
    this.setState({
      ...stateCopy
    })
  }


  handleIntroChange = ({ html, text }) => {
    this.setState({
      introMarkdown: text,
      introHTML: html,
    })
  }

  handleSpecialtyChange = ({ html, text }) => {
    this.setState({
      specialtyHTML: html,
      specialtyMarkdown: text,
    })
  }

  handleDeviceChange = ({ html, text }) => {
    this.setState({
      deviceHTML: html,
      deviceMarkdown: text,
    })
  }

  handleLocationChange = ({ html, text }) => {
    this.setState({
      locationMarkdown: text,
      locationHTML: html,
    })
  }

  handleProcessChange = ({ html, text }) => {
    this.setState({
      processHTML: html,
      processMarkdown: text,
    })
  }

  //Preview Image
  handleOnchangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectUrl,
        imageBase64: base64,
      })
    }
  }

  openPreviewImage = () => {
    if (!this.state.previewImgURL) return;
    this.setState({
      isOpen: true
    })
  }

  handleSaveNewClinic = async () => {
    let res = await createNewClinic({
      name: this.state.name,
      imageBase64: this.state.imageBase64,
      address: this.state.address,
      introHTML: this.state.introHTML,
      introMarkdown: this.state.introMarkdown,
      specialtyHTML: this.state.specialtyHTML,
      specialtyMarkdown: this.state.specialtyMarkdown,
      deviceHTML: this.state.deviceHTML,
      deviceMarkdown: this.state.deviceMarkdown,
      locationHTML: this.state.locationHTML,
      locationMarkdown: this.state.locationMarkdown,
      processHTML: this.state.processHTML,
      processMarkdown: this.state.processMarkdown
    });
    if (res && res.errCode === 0) {
      toast.success('Add new clinic succeed!')
      this.setState({
        name: '',
        imageBase64: '',
        previewImgURL: '',
        address: '',
        introHTML: '',
        introMarkdown: '',
        specialtyHTML: '',
        specialtyMarkdown: '',
        deviceHTML: '',
        deviceMarkdown: '',
        locationHTML: '',
        locationMarkdown: '',
        processHTML: '',
        processMarkdown: '',
      })
    } else {
      toast.error('Add clinic failed!')
      console.log('checkkkkkkkk resssssssssss: ', res)
    }
  }

  render() {
    let { language } = this.props;
    console.log('check stateeeeeee: ', this.state);
    console.log('check prossssssssss: ', this.props)


    return (
      <div className='container manage-specialty'>
        <div className='title-specialty'><FormattedMessage id="admin.manage-clinic.title" /></div>

        <div className='manage-specialy-content'>
          <div className='name-specialty specialty-item'>
            <label><FormattedMessage id="admin.manage-clinic.name" /></label>
            <input type='text'
              value={this.state.name}
              onChange={(event) => this.handleOnchangeInput(event, 'name')}
            ></input>
          </div>
          <div className='avatar-specialty specialty-item'>
            <label><FormattedMessage id="admin.manage-clinic.img" /></label>
            <div className='preview-container'>
              <input id='uploadImg' type="file" hidden
                onChange={(event) => this.handleOnchangeImage(event)}
              />
              <label className='label-upload' htmlFor='uploadImg'><FormattedMessage id="user-manage.upload" /> <i className="fas fa-upload"></i></label>
              <div className='preview-img'
                style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                onClick={() => this.openPreviewImage()}
              ></div>
            </div>
          </div>
          <div className='address-specialty specialty-item'>
            <label><FormattedMessage id="admin.manage-clinic.address" /></label>
            <input type='text'
              value={this.state.address}
              onChange={(event) => this.handleOnchangeInput(event, 'address')}
            ></input>
          </div>
          <div className='manage-specialty-editor specialty-item'>
            <label className='title-item'>Intro</label>
            <MdEditor style={{ height: '300px' }}
              renderHTML={text => mdParser.render(text)}
              onChange={this.handleIntroChange}
              value={this.state.introMarkdown}
            />
          </div>
          <div className='manage-specialty-editor specialty-item'>
            <label className='title-item'>Specialty</label>
            <MdEditor style={{ height: '300px' }}
              renderHTML={text => mdParser.render(text)}
              onChange={this.handleSpecialtyChange}
              value={this.state.specialtyMarkdown}
            />
          </div>
          <div className='manage-specialty-editor specialty-item'>
            <div className='title-item'>Device</div>
            <MdEditor style={{ height: '300px' }}
              renderHTML={text => mdParser.render(text)}
              onChange={this.handleDeviceChange}
              value={this.state.deviceMarkdown}
            />
          </div>
          <div className='manage-specialty-editor specialty-item'>
            <div className='title-item'>Location</div>
            <MdEditor style={{ height: '300px' }}
              renderHTML={text => mdParser.render(text)}
              onChange={this.handleLocationChange}
              value={this.state.locationMarkdown}
            />
          </div>
          <div className='manage-specialty-editor specialty-item'>
            <div className='title-item'>Process</div>
            <MdEditor style={{ height: '300px' }}
              renderHTML={text => mdParser.render(text)}
              onChange={this.handleProcessChange}
              value={this.state.processMarkdown}
            />
          </div>
          <div className='btn-new-specialty'>
            <button
              onClick={() => this.handleSaveNewClinic()}
            ><FormattedMessage id="common.save" /></button>
          </div>
        </div>
        {
          this.state.isOpen === true &&
          <Lightbox
            mainSrc={this.state.previewImgURL}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    language: state.app.language,
    allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor

  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);

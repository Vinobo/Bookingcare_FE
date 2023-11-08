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
import { createNewClinic, getAllClinic, getAllDetailClinicById } from '../../../services/userService';
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

      hasOldData: false,
      currentClinicId: '',

      previewImgURL: '',
      isOpen: false,

    }

  }


  async componentDidMount() {
    let { language } = this.props;

    if (this.props.match && this.props.match.params && this.props.match.params.id) {
      let id = this.props.match.params;
      this.setState({
        currentClinicId: id.id
      })

      let res = await getAllDetailClinicById(id);
      let name = '', imageBase64 = '', address = '', introHTML = '', introMarkdown = '',
        specialtyHTML = '', specialtyMarkdown = '', deviceHTML = '', deviceMarkdown = '',
        locationHTML = '', locationMarkdown = '', processHTML = '', processMarkdown = ''
      if (res.data.image) {
        const imageBuffer = Buffer.from(JSON.stringify(res.data.image));
        imageBase64 = new Buffer(res.data.image, 'base64').toString('binary');
      }
      if (res && res.errCode === 0) {
        name = res.data.name;
        imageBase64 = res.data.image;
        address = res.data.address;
        introHTML = res.data.introHTML;
        introMarkdown = res.data.introMarkdown;
        specialtyHTML = res.data.specialtyHTML;
        specialtyMarkdown = res.data.specialtyMarkdown;
        deviceHTML = res.data.deviceHTML;
        deviceMarkdown = res.data.deviceMarkdown;
        locationHTML = res.data.locationHTML;
        locationMarkdown = res.data.locationMarkdown;
        processHTML = res.data.processHTML;
        processMarkdown = res.data.processMarkdown;

        this.setState({
          name: name,
          imageBase64: imageBase64,
          address: address,
          previewImgURL: imageBase64,
          introHTML: introHTML,
          introMarkdown: introMarkdown,
          specialtyHTML: specialtyHTML,
          specialtyMarkdown: specialtyMarkdown,
          deviceHTML: deviceHTML,
          deviceMarkdown: deviceMarkdown,
          locationHTML: locationHTML,
          locationMarkdown: locationMarkdown,
          processHTML: processHTML,
          processMarkdown: processMarkdown,
          hasOldData: true,
          currentClinicId: id.id
        })
      } else {
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
          hasOldData: false,
          currentClinicId: '',
        })
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {

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
    let { hasOldData } = this.state;

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
      processMarkdown: this.state.processMarkdown,
      action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
      id: this.state.currentClinicId
    });

    if (hasOldData === false) {
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

        if (this.props.history) {
          this.props.history.push(`/system/manage-clinic`)
        }
      } else {
        toast.error('Add clinic failed!')
      }
    }

    if (hasOldData === true) {
      if (res && res.errCode === 0) {
        toast.success('Edit the clinic succeed!')
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

        if (this.props.history) {
          this.props.history.push(`/system/manage-clinic`)
        }
      } else {
        toast.error('Edit the failed!')
      }
    }
  }

  render() {
    let { language } = this.props;
    let { hasOldData } = this.state;
    console.log('check state: ', this.state)

    return (
      <div className='container manage-clinic'>
        <div className='title-clinic'>
          {hasOldData === true ? <FormattedMessage id="admin.manage-clinic.edit-clinic" /> : <FormattedMessage id="admin.manage-clinic.create-clinic" />}
        </div>

        <div className='manage-specialy-content'>
          <div className='name-clinic clinic-item'>
            <label><FormattedMessage id="admin.manage-clinic.name" /></label>
            <input type='text'
              value={this.state.name}
              onChange={(event) => this.handleOnchangeInput(event, 'name')}
            ></input>
          </div>
          <div className='avatar-clinic clinic-item'>
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
          <div className='address-clinic clinic-item'>
            <label><FormattedMessage id="admin.manage-clinic.address" /></label>
            <input type='text'
              value={this.state.address}
              onChange={(event) => this.handleOnchangeInput(event, 'address')}
            ></input>
          </div>
          <div className='manage-clinic-editor clinic-item'>
            <label className='title-item'>Intro</label>
            <MdEditor style={{ height: '300px' }}
              renderHTML={text => mdParser.render(text)}
              onChange={this.handleIntroChange}
              value={this.state.introMarkdown}
            />
          </div>
          <div className='manage-clinic-editor clinic-item'>
            <label className='title-item'>Specialty</label>
            <MdEditor style={{ height: '300px' }}
              renderHTML={text => mdParser.render(text)}
              onChange={this.handleSpecialtyChange}
              value={this.state.specialtyMarkdown}
            />
          </div>
          <div className='manage-clinic-editor clinic-item'>
            <div className='title-item'>Device</div>
            <MdEditor style={{ height: '300px' }}
              renderHTML={text => mdParser.render(text)}
              onChange={this.handleDeviceChange}
              value={this.state.deviceMarkdown}
            />
          </div>
          <div className='manage-clinic-editor clinic-item'>
            <div className='title-item'>Location</div>
            <MdEditor style={{ height: '300px' }}
              renderHTML={text => mdParser.render(text)}
              onChange={this.handleLocationChange}
              value={this.state.locationMarkdown}
            />
          </div>
          <div className='manage-clinic-editor clinic-item'>
            <div className='title-item'>Process</div>
            <MdEditor style={{ height: '300px' }}
              renderHTML={text => mdParser.render(text)}
              onChange={this.handleProcessChange}
              value={this.state.processMarkdown}
            />
          </div>
          <div className='btn-new-clinic'>
            <button
              className={hasOldData === true ? 'edit-clinic' : 'create-clinic'}
              onClick={() => this.handleSaveNewClinic()}
            >{hasOldData === true ? <FormattedMessage id={"user-manage.edit"} /> : <FormattedMessage id={"common.save"} />}</button>
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
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);

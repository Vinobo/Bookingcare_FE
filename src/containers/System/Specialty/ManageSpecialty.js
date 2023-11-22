import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { LANGUAGES, CommonUtils, CRUD_ACTIONS } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './ManageSpecialty.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { createNewSpecialty, getAllDetailSpecialtyById } from '../../../services/userService';
import { toast } from 'react-toastify';

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nameSpecialty: '',
      imageBase64: '',
      descriptionHTML: '',
      descriptionMarkdown: '',
      currentSpecialtyId: '',

      previewImgURL: '',
      isOpen: false,

      hasOldData: false,
    }

  }

  handleEditSpecialty = () => {

  }

  async componentDidMount() {
    let { language } = this.props;

    if (this.props.match && this.props.match.params && this.props.match.params.id) {
      let id = this.props.match.params.id;
      this.setState({
        currentSpecialtyId: id
      })

      let res = await getAllDetailSpecialtyById({
        id: id,
        location: 'ALL'
      });
      let nameSpecialty = '', imageBase64 = '', descriptionHTML = '', descriptionMarkdown = ''
      if (res.data.image) {
        const imageBuffer = Buffer.from(JSON.stringify(res.data.image));
        imageBase64 = new Buffer(res.data.image, 'base64').toString('binary');
      }
      if (res && res.errCode === 0) {
        nameSpecialty = res.data.name;
        imageBase64 = res.data.image;
        descriptionHTML = res.data.descriptionHTML;
        descriptionMarkdown = res.data.descriptionMarkdown;

        this.setState({
          nameSpecialty: nameSpecialty,
          imageBase64: imageBase64,
          previewImgURL: imageBase64,
          descriptionHTML: descriptionHTML,
          descriptionMarkdown: descriptionMarkdown,
          hasOldData: true,
          currentSpecialtyId: id
        })
      } else {
        this.setState({
          nameSpecialty: '',
          imageBase64: '',
          previewImgURL: '',
          descriptionHTML: '',
          descriptionMarkdown: '',
          hasOldData: false,
          currentSpecialtyId: ''
        })
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {

    }
  }

  handleOnchangeInput = (event, id) => {
    let stateCopy = { ...this.state }
    stateCopy[id] = event.target.value
    this.setState({
      ...stateCopy
    })
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionMarkdown: text,
      descriptionHTML: html,
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

  handleSaveNewSpecialty = async () => {
    let { hasOldData } = this.state;

    let res = await createNewSpecialty({
      nameSpecialty: this.state.nameSpecialty,
      imageBase64: this.state.imageBase64,
      descriptionHTML: this.state.descriptionHTML,
      descriptionMarkdown: this.state.descriptionMarkdown,
      action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
      id: this.state.currentSpecialtyId
    });
    if (hasOldData === false) {
      if (res && res.errCode === 0) {
        toast.success('Add new specialty succeed!')
        this.setState({
          nameSpecialty: '',
          imageBase64: '',
          previewImgURL: '',
          descriptionHTML: '',
          descriptionMarkdown: '',
        })
        if (this.props.history) {
          this.props.history.push(`/system/manage-specialty`)
        }
      } else {
        toast.error('Add specialty failed!')
      }
    }
    if (hasOldData === true) {
      if (res && res.errCode === 0) {
        toast.success('Edit the specialty succeed!')
        this.setState({
          nameSpecialty: '',
          imageBase64: '',
          previewImgURL: '',
          descriptionHTML: '',
          descriptionMarkdown: '',
        })
        if (this.props.history) {
          this.props.history.push(`/system/manage-specialty`)
        }
      } else {
        toast.error('Edit the specialty failed!')
      }
    }
  }

  handleCancleSpecialty = () => {
    if (this.props.history) {
      this.props.history.push(`/system/manage-specialty`)
    }
  }

  render() {
    let { language } = this.props;
    let { hasOldData } = this.state

    return (
      <div className='container manage-specialty'>
        <div className='title-specialty'>
          {hasOldData === true ? <FormattedMessage id="menu.admin.edit-specialty" /> : <FormattedMessage id="menu.admin.create-specialty" />}</div>
        <div className='manage-specialy-content'>
          <div className='name-specialty specialty-item'>
            <label><FormattedMessage id="admin.manage-specialty.name" /></label>
            <input type='text'
              value={this.state.nameSpecialty}
              onChange={(event) => this.handleOnchangeInput(event, 'nameSpecialty')}
            ></input>
          </div>
          <div className='avatar-specialty specialty-item'>
            <label><FormattedMessage id="admin.manage-specialty.img" /></label>
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
          <div className='manage-specialty-editor specialty-item'>
            <MdEditor style={{ height: '300px' }}
              renderHTML={text => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.descriptionMarkdown}
            />
          </div>
          <div>
            <button
              className={hasOldData === true ? 'edit-specialty' : 'create-specialty'}
              onClick={() => this.handleSaveNewSpecialty()}
            > {hasOldData === true ? <FormattedMessage id={"user-manage.edit"} /> : <FormattedMessage id={"common.save"} />}</button>
            <button className='cancle' onClick={() => this.handleCancleSpecialty()}>Cancle</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);

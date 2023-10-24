import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { LANGUAGES, CommonUtils } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './ManageSpecialty.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { createNewSpecialty } from '../../../services/userService';
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

      previewImgURL: '',
      isOpen: false,
    }

  }

  async componentDidMount() {
    let { language } = this.props;

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
    let res = await createNewSpecialty(this.state);
    if (res && res.errCode === 0) {
      toast.success('Add new specialty succeed!')
    } else {
      toast.error('Add specialty faile!')
      console.log('checkkkkkkkk resssssssssss: ', res)
    }
  }

  render() {
    let { language } = this.props;

    return (
      <div className='container manage-specialty'>
        <div className='title-specialty'><FormattedMessage id="admin.manage-specialty.title" /></div>

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
          <div className='btn-new-specialty'>
            <button
              onClick={() => this.handleSaveNewSpecialty()}
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
  };
};

const mapDispatchToProps = dispatch => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);

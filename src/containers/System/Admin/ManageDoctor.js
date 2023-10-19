import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './scss/ManageDoctor.scss';
import * as actions from "../../../store/actions";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import { getDetailInforDoctor } from '../../../services/userService';

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      //save to Markdown table
      contentMarkdown: '',
      contentHTML: '',
      selectedDoctor: '',
      description: '',
      listDoctors: [],
      hasOldData: false,

      //save to doctor_infor table
      listPrice: [],
      listPayment: [],
      listProvince: [],
      selectedPrice: '',
      selectedPayment: '',
      selectedProvince: '',
      nameClinic: '',
      addressClinic: '',
      note: '',
    }
  }

  componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.getAllRequiredDoctorInfor();
  }

  buildDataInputSelect = (inputData, type) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      if (type === 'USERS') {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.lastName} ${item.firstName}`;
          let labelEn = `${item.firstName} ${item.lastName}`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.id;
          result.push(object)
        })
      }

      if (type === 'PRICE') {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVi}đ`;
          let labelEn = `${item.valueEn} USD`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object)
        })
      }

      if (type === 'PAYMENT' || type === 'PROVINCE') {
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

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS')
      this.setState({
        listDoctors: dataSelect
      })
    }

    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS');
      let { resPrice, resPayment, resProvince } = this.props.allRequiredDoctorInfor
      let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
      let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
      let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');

      this.setState({
        listDoctors: dataSelect,
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince
      })
    }

    if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
      let { resPrice, resPayment, resProvince } = this.props.allRequiredDoctorInfor;
      let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
      let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
      let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');

      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince
      })
    }
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    })
  }

  handleSaveContentMarkdown = () => {
    let { hasOldData } = this.state;
    this.props.saveInforDoctor({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedDoctor.value,
      action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

      selectedPrice: this.state.selectedPrice.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvince: this.state.selectedProvince.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
    })
  }

  handleChangeSelect = async (selectedDoctor, name) => {
    this.setState({ selectedDoctor });
    let { listPrice, listPayment, listProvince } = this.state;

    let res = await getDetailInforDoctor(selectedDoctor.value);
    if (res && res.errCode === 0 && res.data && res.data.Markdown) {
      let markdown = res.data.Markdown;

      let priceId = '', paymentId = '', provinceId = '',
        nameClinic = '', addressClinic = '', note = '',
        selectedPrice = '', selectedPayment = '', selectedProvince = '';

      if (res.data.Doctor_Infor) {
        addressClinic = res.data.Doctor_Infor.addressClinic;
        nameClinic = res.data.Doctor_Infor.nameClinic;
        note = res.data.Doctor_Infor.note;
        priceId = res.data.Doctor_Infor.priceId;
        paymentId = res.data.Doctor_Infor.paymentId;
        provinceId = res.data.Doctor_Infor.provinceId;

        selectedPrice = listPrice.find(item => {
          return item && item.value === priceId
        })
        selectedPayment = listPayment.find(item => {
          return item && item.value === paymentId
        })
        selectedProvince = listProvince.find(item => {
          return item && item.value === provinceId
        })
      }

      this.setState({
        contentHTML: markdown.contentHTML,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,
        hasOldData: true,
        nameClinic: nameClinic,
        addressClinic: addressClinic,
        note: note,
        selectedPrice: selectedPrice,
        selectedPayment: selectedPayment,
        selectedProvince: selectedProvince
      })
    } else {
      this.setState({
        contentHTML: '',
        contentMarkdown: '',
        description: '',
        hasOldData: false,
        nameClinic: '',
        addressClinic: '',
        note: '',
        selectedPrice: '',
        selectedPayment: '',
        selectedProvince: ''
      })
    }
  };

  handleChangeSelectDoctorInfor = async (selectedOption, name) => {
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedOption;

    this.setState({
      ...stateCopy
    })
  }

  handleOnchangeText = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value
    this.setState({
      ...stateCopy
    })
  }

  render() {
    let { hasOldData } = this.state;

    return (
      <div className='manage-doctor-container'>
        <div className='manage-doctor-title'><FormattedMessage id='admin.manage-doctor.title' /></div>

        <div className='more-info'>
          <div className='select-doctor '>
            <label><FormattedMessage id='common.doctor' /></label>
            <Select
              value={this.state.selectedDoctor}
              onChange={this.handleChangeSelect}
              options={this.state.listDoctors}
              placeholder={<FormattedMessage id='common.choose-doctor' />}
            />
          </div>

          <div className='intro-doctor '>
            <label><FormattedMessage id='common.intro' /></label>
            <textarea className='form-control'
              onChange={(event) => this.handleOnchangeText(event, 'description')}
              value={this.state.description}
            >
            </textarea>
          </div>

          <div className='price '>
            <label><FormattedMessage id='admin.manage-doctor.price' /></label>
            <Select
              value={this.state.selectedPrice}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listPrice}
              placeholder={<FormattedMessage id='admin.manage-doctor.choose-price' />}
              name='selectedPrice'
            />
          </div>

          <div className='payment '>
            <label><FormattedMessage id='admin.manage-doctor.payment' /></label>
            <Select
              value={this.state.selectedPayment}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listPayment}
              placeholder={<FormattedMessage id='admin.manage-doctor.choose-payment' />}
              name='selectedPayment'
            />
          </div>

          <div className='province '>
            <label><FormattedMessage id='admin.manage-doctor.province' /></label>
            <Select
              value={this.state.selectedProvince}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listProvince}
              placeholder={<FormattedMessage id='admin.manage-doctor.choose-province' />}
              name='selectedProvince'
            />
          </div>

          <div className='clinic '>
            <label><FormattedMessage id='common.clinic' /></label>
            <input className='form-control'
              onChange={(event) => this.handleOnchangeText(event, 'nameClinic')}
              value={this.state.nameClinic}
            ></input>
          </div>

          <div className='clinic-address '>
            <label><FormattedMessage id='admin.manage-doctor.addressClinic' /></label>
            <input className='form-control'
              onChange={(event) => this.handleOnchangeText(event, 'addressClinic')}
              value={this.state.addressClinic}
            ></input>
          </div>

          <div className='note '>
            <label><FormattedMessage id='common.note' /></label>
            <input className='form-control'
              onChange={(event) => this.handleOnchangeText(event, 'note')}
              value={this.state.note}
            ></input>
          </div>
        </div>

        <div className='manage-doctor-editor'>
          <MdEditor style={{ height: '500px' }}
            renderHTML={text => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
          />
        </div>

        <button className={hasOldData === true ? 'edit-content-doctor' : 'create-content-doctor'}
          onClick={() => this.handleSaveContentMarkdown()}
        >
          {hasOldData === true ? <FormattedMessage id={"user-manage.edit"} /> : <FormattedMessage id={"common.save"} />}
        </button>
      </div >
    );
  }

}

const mapStateToProps = state => {
  return {
    language: state.app.language,
    allDoctors: state.admin.allDoctors,
    allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    getAllRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
    saveInforDoctor: (data) => dispatch(actions.saveInforDoctor(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);

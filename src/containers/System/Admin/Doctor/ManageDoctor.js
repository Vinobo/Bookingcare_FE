import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import * as actions from "../../../../store/actions";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { CRUD_ACTIONS, LANGUAGES } from '../../../../utils';
import { getDetailInforDoctor } from '../../../../services/userService';
import { toast } from 'react-toastify';

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
      listClinic: [],
      listSpecialty: [],
      listPrice: [],
      listPayment: [],
      listProvince: [],
      selectedClinic: '',
      selectedSpecialty: '',
      selectedPrice: '',
      selectedPayment: '',
      selectedProvince: '',
      note: '',
      clinicId: '',
      specialtyId: ''
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

      if (type === 'SPECIALTY') {
        inputData.map((item, index) => {
          let object = {};
          object.label = item.name;
          object.value = item.id;
          result.push(object)
        })
      }

      if (type === 'CLINIC') {
        inputData.map((item, index) => {
          let object = {};
          object.label = item.name;
          object.value = item.id;
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
        listProvince: dataSelectProvince,
      })
    }

    if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
      let { resPrice, resPayment, resProvince, resSpecialty, resClinic } = this.props.allRequiredDoctorInfor;
      let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
      let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
      let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');
      let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, 'SPECIALTY');
      let dataSelectClinic = this.buildDataInputSelect(resClinic, 'CLINIC');

      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
        listSpecialty: dataSelectSpecialty,
        listClinic: dataSelectClinic
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
      note: this.state.note,
      clinicId: this.state.selectedClinic.value,
      specialtyId: this.state.selectedSpecialty.value,
    });
  }

  handleChangeSelect = async (selectedDoctor, name) => {
    this.setState({ selectedDoctor });
    let { listPrice, listPayment, listProvince, listSpecialty, listClinic } = this.state;

    let res = await getDetailInforDoctor(selectedDoctor ? selectedDoctor.value : this.state.currentDoctorId);
    if (res && res.errCode === 0 && res.data && res.data.Markdown) {
      let markdown = res.data.Markdown;

      let priceId = '', paymentId = '', provinceId = '', note = '',
        selectedPrice = '', selectedPayment = '', selectedProvince = '',
        selectedSpecialty = '', specialtyId = '',
        selectedClinic = '', clinicId = ''
        ;

      if (res.data.Doctor_Infor) {
        note = res.data.Doctor_Infor.note;
        priceId = res.data.Doctor_Infor.priceId;
        paymentId = res.data.Doctor_Infor.paymentId;
        provinceId = res.data.Doctor_Infor.provinceId;
        specialtyId = res.data.Doctor_Infor.specialtyId;
        clinicId = res.data.Doctor_Infor.clinicId;

        selectedPrice = listPrice.find(item => {
          return item && item.value === priceId
        })
        selectedPayment = listPayment.find(item => {
          return item && item.value === paymentId
        })
        selectedProvince = listProvince.find(item => {
          return item && item.value === provinceId
        })
        selectedSpecialty = listSpecialty.find(item => {
          return item && item.value === specialtyId
        })
        selectedClinic = listClinic.find(item => {
          return item && item.value === clinicId
        })
      }

      this.setState({
        contentHTML: markdown.contentHTML,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,
        hasOldData: true,
        note: note,
        selectedPrice: selectedPrice,
        selectedPayment: selectedPayment,
        selectedProvince: selectedProvince,
        selectedSpecialty: selectedSpecialty,
        selectedClinic: selectedClinic,
      })
    } else {
      this.setState({
        contentHTML: '',
        contentMarkdown: '',
        description: '',
        hasOldData: false,
        note: '',
        selectedPrice: '',
        selectedPayment: '',
        selectedProvince: '',
        selectedSpecialty: '',
        selectedClinic: ''
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

  handleCancle = () => {
    if (this.props.history) {
      this.props.history.push(`/system/manage-doctor`)
    }
  }

  render() {
    let { hasOldData } = this.state;

    return (
      <div className='manage-doctor-container'>
        <div className='container'>
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

            <div className='specialty '>
              <label><FormattedMessage id='common.specialty' /></label>
              <Select
                value={this.state.selectedSpecialty}
                onChange={this.handleChangeSelectDoctorInfor}
                options={this.state.listSpecialty}
                placeholder={<FormattedMessage id='common.choose-specialty' />}
                name='selectedSpecialty'
              />
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

            <div className='clinic '>
              <label><FormattedMessage id='common.clinic' /></label>
              <Select
                value={this.state.selectedClinic}
                onChange={this.handleChangeSelectDoctorInfor}
                options={this.state.listClinic}
                placeholder={<FormattedMessage id='common.choose-clinic' />}
                name='selectedClinic'
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

            <div className='note '>
              <label><FormattedMessage id='common.note' /></label>
              <input className='form-control'
                onChange={(event) => this.handleOnchangeText(event, 'note')}
                value={this.state.note}
              ></input>
            </div>
            <div className='manage-doctor-editor'>
              <MdEditor style={{ height: '300px' }}
                renderHTML={text => mdParser.render(text)}
                onChange={this.handleEditorChange}
                value={this.state.contentMarkdown}
              />
            </div>
          </div>
          <button className={hasOldData === true ? 'edit-content-doctor' : 'create-content-doctor'}
            onClick={() => this.handleSaveContentMarkdown()}
          >
            {hasOldData === true ? <FormattedMessage id={"user-manage.edit"} /> : <FormattedMessage id={"common.save"} />}
          </button>
          <button className='cancle' onClick={() => this.handleCancle()}>Cancle</button>
        </div>
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

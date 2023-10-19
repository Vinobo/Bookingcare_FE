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
      selectPrice: '',
      selectPayment: '',
      selectProvince: '',
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
      inputData.map((item, index) => {
        let object = {};
        let labelVi = type === 'USERS' ? `${item.lastName} ${item.firstName}` : item.valueVi;
        let labelEn = type === 'USERS' ? `${item.firstName} ${item.lastName}` : item.valueEn;

        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;
        result.push(object)
      })
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
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
      this.setState({
        listDoctors: dataSelect
      })
    }

    if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
      let { resPrice, resPayment, resProvince } = this.props.allRequiredDoctorInfor
      let dataSelectPrice = this.buildDataInputSelect(resPrice)
      let dataSelectPayment = this.buildDataInputSelect(resPayment)
      let dataSelectProvince = this.buildDataInputSelect(resProvince)

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
      action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE
    })
  }

  handleChangeSelect = async (selectedDoctor) => {
    this.setState({ selectedDoctor });

    let res = await getDetailInforDoctor(selectedDoctor.value);
    if (res && res.errCode === 0 && res.data && res.data.Markdown) {
      let markdown = res.data.Markdown;
      this.setState({
        contentHTML: markdown.contentHTML,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,
        hasOldData: true
      })
    } else {
      this.setState({
        contentHTML: '',
        contentMarkdown: '',
        description: '',
        hasOldData: false
      })
    }
    console.log('Check selected: ', res)
  };

  handleOnchangeDesc = (event) => {
    this.setState({
      description: event.target.value
    })
  }

  render() {
    let { hasOldData } = this.state;

    return (
      <div className='manage-doctor-container'>
        <div className='manage-doctor-title'><FormattedMessage id='admin.manage-doctor.title' /></div>

        <div className='more-info'>
          <div className='select-doctor '>
            <label><FormattedMessage id='common.choose-doctor' /></label>
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
              onChange={(event) => this.handleOnchangeDesc(event)}
              value={this.state.description}
            >
            </textarea>
          </div>

          <div className='price '>
            <label>Chọn giá khám</label>
            <Select
              // value={this.state.selectedDoctor}
              onChange={this.handleChangeSelect}
              options={this.state.listPrice}
              placeholder={'Chọn giá khám'}
            />
          </div>

          <div className='payment '>
            <label>Chọn phương thức thanh toán</label>
            <Select
              // value={this.state.selectedDoctor}
              onChange={this.handleChangeSelect}
              options={this.state.listPayment}
              placeholder={'Chọn phương thức thanh toán'}
            />
          </div>

          <div className='provience '>
            <label>Chọn tỉnh thành</label>
            <Select
              // value={this.state.selectedDoctor}
              onChange={this.handleChangeSelect}
              options={this.state.listProvince}
              placeholder={'Chọn tỉnh thành'}
            />
          </div>

          <div className='clinic '>
            <label>Tên phòng khám</label>
            <input className='form-control'></input>
          </div>

          <div className='clinic-address '>
            <label>Địa chỉ phòng khám</label>
            <input className='form-control'></input>
          </div>

          <div className='note '>
            <label>Ghi chú</label>
            <input className='form-control'></input>
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

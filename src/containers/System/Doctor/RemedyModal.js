import React, { Component } from 'react';
import { connect } from "react-redux";
// import { Redirect, Route, Switch } from 'react-router-dom';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { CommonUtils } from '../../../utils';
// import { FormattedMessage } from 'react-intl';
import './RemedyModal.scss';
// import _ from 'lodash';
// import { toast } from 'react-toastify';



class RemedyModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      imgBase64: ''
    }

  }

  async componentDidMount() {
    // let { language } = this.props;

    if (this.props.dataModal) {
      this.setState({
        email: this.props.dataModal
      })
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.dataModal !== prevProps.dataModal) {
      this.setState({
        email: this.props.dataModal.email
      })
    }
  }

  handleOnchangeEmail = (event) => {
    this.setState({
      email: event.target.value
    })
  }

  handleOnchangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        imgBase64: base64
      })
    }
  }

  handleSendRemedy = () => {
    this.props.sendRemedy(this.state)
  }

  render() {
    let { isOpenModal, closeRemedyModal } = this.props
    return (
      <Modal
        isOpen={isOpenModal}
        className='remedy-modal-container'
        size='md'
        centered
      >
        <div className='modal-header'>
          <h5 className='modal-title'> Gửi hóa đơn khám bệnh</h5>
          <button type='button' className='close' aria-label='Close'
            onClick={closeRemedyModal}
          >
            <span aria-hidden='true'>x</span>
          </button>
        </div>
        <ModalBody>
          <div className='remedy-content'>
            <div className='email-patient'>
              <label>Email bệnh nhân</label>
              <input type='email' value={this.state.email}
                onChange={(event) => this.handleOnchangeEmail(event)}
              />
            </div>
            <div className='file-remedy'>
              <label>Chọn hóa đơn</label>
              <input type='file' onChange={(event) => this.handleOnchangeImage(event)} />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={() => this.handleSendRemedy()}>Send</Button>
          <Button color='secondary' onClick={closeRemedyModal}>Cancle</Button>
        </ModalFooter>
      </Modal >
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

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);

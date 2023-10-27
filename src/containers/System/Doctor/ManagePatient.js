import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './ManagePatient.scss';
import DatePicker from '../../../components/Input/DatePicker';


class ManagePatient extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentDate: ''
    }

  }

  async componentDidMount() {
    let { language } = this.props;

  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {

    }
  }

  handleOnchangeDatePiker = (date) => {
    this.setState({
      currentDate: date[0]
    })
  }

  render() {
    let { language } = this.props;

    return (
      <div className='container manage-patient '>
        <div className='m-p-title'>
          <FormattedMessage id='manage-patient.title' />
        </div>
        <div className='container'>
          <div className='manage-patient-body'>
            <div className='select-date'>
              <label><FormattedMessage id='common.choose-date' /></label>
              <DatePicker
                className='date'
                onChange={this.handleOnchangeDatePiker}
                selected={this.state.currentDate}
              />
            </div>
            <div className='table-manage-patient'>
              <table>
                <tr>
                  <th>Name</th>
                  <th colSpan="2">Phone</th>
                </tr>
                <tr>
                  <td >Jill</td>
                  <td>555-1234</td>
                  <td>555-1234</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);

import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { LANGUAGES } from '../utils';
import { FormattedMessage } from 'react-intl';
import './DefaultClass.scss';
// @include tablet {

// }

// @include desktop {

// }

class DefaultClass extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }

  }

  async componentDidMount() {
    let { language } = this.props;

  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {

    }
  }

  render() {
    let { language } = this.props;

    return (
      <div></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);

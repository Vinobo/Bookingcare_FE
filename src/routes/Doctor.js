import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import ManageSchedule from '../containers/System/Doctor/ManageSchedule';
import Header from '../containers/Header/Header';
import ManagePatient from '../containers/System/Doctor/ManagePatient';
import TableManageSchedule from '../containers/System/Doctor/TableManageSchedule';

class Doctor extends Component {
  render() {
    const { isLoggedIn, userInfo } = this.props;
    let userRole = userInfo.roleId;
    return (
      <>
        {isLoggedIn && <Header />}
        <div className="system-container" >
          <div className="system-list">
            <Switch>
              {userRole === "R1" ? <Route path="/doctor/manage-schedule" component={ManageSchedule} />
                :
                <>
                  <Route path="/doctor/manage-schedule" component={TableManageSchedule} />
                  <Route path="/doctor/create-schedule" component={ManageSchedule} />
                  <Route path="/doctor/manage-patient" component={ManagePatient} />
                </>
              }
            </Switch>
          </div>
        </div >
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);

import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import ManageUser from '../containers/System/Admin/User/ManageUser';
import Header from '../containers/Header/Header';
import ManageDoctor from '../containers/System/Admin/Doctor/ManageDoctor';
import ManageSpecialty from '../containers/System/Specialty/ManageSpecialty';
import ManageClinic from '../containers/System/Clinic/ManageClinic';
import TableManageSpecialty from '../containers/System/Specialty/TableManageSpecialty';
import TableManageClinic from '../containers/System/Clinic/TableManageClinic';
import TableManageDoctor from '../containers/System/Admin/Doctor/TableManageDoctor';

class System extends Component {
    render() {
        const { systemMenuPath, isLoggedIn } = this.props;

        return (
            <>
                {isLoggedIn && <Header />}
                <div className="system-container" >
                    <div className="system-list">
                        <Switch>
                            <Route path="/system/manage-user" component={ManageUser} />
                            <Route path="/system/create-doctor-infor" component={ManageDoctor} />
                            <Route path="/system/manage-doctor" component={TableManageDoctor} />

                            <Route path="/system/create-specialty/" component={ManageSpecialty} />
                            <Route path="/system/edit-specialty/:id" component={ManageSpecialty} />
                            <Route path="/system/manage-specialty" component={TableManageSpecialty} />
                            <Route path="/system/manage-clinic" component={TableManageClinic} />
                            <Route path="/system/create-clinic/" component={ManageClinic} />
                            <Route path="/system/edit-clinic/:id" component={ManageClinic} />

                            <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />

                        </Switch>
                    </div>
                </div >
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);

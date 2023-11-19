import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux';
import { ToastContainer } from 'react-toastify';
import { CustomToastCloseButton } from '../components/CustomToast';
import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';
import { path } from '../utils';
import Home from '../routes/Home';
import Login from './Auth/Login';
import System from '../routes/System';
import HomePage from './HomePage/HomePage';
import CustomScrollbars from '../components/CustomScrollbars';
import DetailDoctor from './Patient/Doctor/DetailDoctor';
import Doctor from '../routes/Doctor';
import VerifyEmail from './Patient/VerifyEmail';
import DetailSpecialty from './Patient/Specialty/DetailSpecialty';
import DetailClinic from './Patient/Clinic/DetailClinic';
import AllSpecialty from './Patient/Specialty/AllSpecialty';
import AllClinic from './Patient/Clinic/AllClinic';
import AllDoctor from './Patient/Doctor/AllDoctor';
import Detail1 from './Patient/Handbook/Detail1';
import Detail2 from './Patient/Handbook/Detail2';
import Detail3 from './Patient/Handbook/Detail3';
import Detail4 from './Patient/Handbook/Detail4';
import Detail5 from './Patient/Handbook/Detail5';
import Detail6 from './Patient/Handbook/Detail6';


class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">
                        <div className="content-container">
                            <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                                <Switch>
                                    <Route path={path.HOME} exact component={(Home)} />
                                    <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                    <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                    <Route path={path.DOCTOR} component={userIsAuthenticated(Doctor)} />

                                    <Route path={path.HOMEPAGE} component={HomePage} />
                                    <Route path={path.DETAIL_DOCTOR} component={DetailDoctor} />
                                    <Route path={path.ALL_DOCTOR} component={AllDoctor} />

                                    <Route path={path.ALL_SPECIALTY} component={AllSpecialty} />
                                    <Route path={path.DETAIL_SPECIALTY} component={DetailSpecialty} />

                                    <Route path={path.ALL_CLINIC} component={AllClinic} />
                                    <Route path={path.DETAIL_CLINIC} component={DetailClinic} />

                                    <Route path={path.VERIFY_EMAIL_BOOKING} component={VerifyEmail} />

                                    {/* HAND BOOK */}
                                    <Route path={'/detail-handbook-1/'} component={Detail1} />
                                    <Route path={'/detail-handbook-2/'} component={Detail2} />
                                    <Route path={'/detail-handbook-3/'} component={Detail3} />
                                    <Route path={'/detail-handbook-4/'} component={Detail4} />
                                    <Route path={'/detail-handbook-5/'} component={Detail5} />
                                    <Route path={'/detail-handbook-6/'} component={Detail6} />

                                </Switch>
                            </CustomScrollbars>
                        </div>

                        {/* <ToastContainer
                            className="toast-container" toastClassName="toast-item" bodyClassName="toast-item-body"
                                    autoClose={false} hideProgressBar={true} pauseOnHover={false}
                                    pauseOnFocusLoss={true} closeOnClick={false} draggable={false}
                                    closeButton={<CustomToastCloseButton />}
                        /> */}

                        <ToastContainer
                            position="top-right"
                            autoClose={2000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss={false}
                            draggable
                            pauseOnHover
                        />
                        {/* Same as */}
                        <ToastContainer />
                    </div>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
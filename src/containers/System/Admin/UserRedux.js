import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import * as actions from "../../../store/actions";
import './scss/UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';


class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: '',
            isOpen: false,
        }
    }


    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //Gender
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                genderArr: this.props.genderRedux
            })
        }

        //Position
        if (prevProps.positionRedux !== this.props.positionRedux) {
            this.setState({
                positionArr: this.props.positionRedux
            })
        }

        //Role
        if (prevProps.roleRedux !== this.props.roleRedux) {
            this.setState({
                roleArr: this.props.roleRedux
            })
        }
    }

    //Preview Image
    handleOnchangeImage = (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl
            })
        }
    }

    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true
        })
    }

    render() {
        let genders = this.state.genderArr;
        let language = this.props.language;
        let isLoadingGender = this.state.isLoadingGender;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;

        return (
            <div className='user-redux-container'>
                <div className='title'>User Redux</div>
                <div className="user-redux-body" >
                    <div className='container'>
                        <div className='row'>
                            <div>{isLoadingGender === true ? 'Loading genders' : ''}</div>
                            <div className='col-12'><FormattedMessage id="user-manage.add-user" /></div>
                            <form class="row g-3">
                                <div class="col-md-6">
                                    <label for="inputEmail4" class="form-label"><FormattedMessage id="user-manage.email" /></label>
                                    <input type="email" class="form-control" placeholder='Email' />
                                </div>
                                <div class="col-md-6">
                                    <label for="inputPassword4" class="form-label"><FormattedMessage id="user-manage.password" /></label>
                                    <input type="password" class="form-control" placeholder='Password' />
                                </div>
                                <div class="col-md-3">
                                    <label for="inputAddress" class="form-label"><FormattedMessage id="user-manage.firstName" /> </label>
                                    <input type="text" class="form-control" placeholder="1234 Main St" />
                                </div>
                                <div class="col-md-3">
                                    <label for="inputEmail4" class="form-label"><FormattedMessage id="user-manage.lastName" /></label>
                                    <input type="text" class="form-control" placeholder='Email' />
                                </div>
                                <div class="col-md-3">
                                    <label for="inputState" class="form-label"><FormattedMessage id="user-manage.gender" /></label>
                                    <select id="inputState" class="form-select">
                                        {genders && genders.length > 0 &&
                                            genders.map((item, index) => {
                                                return (
                                                    <option key={index}>{language === LANGUAGES.VI ? item.value_vi : item.value_en}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div class="col-md-3">
                                    <label for="inputEmail4" class="form-label"><FormattedMessage id="user-manage.mobile" /></label>
                                    <input type="text" class="form-control" placeholder='Email' />
                                </div>
                                <div class="col-md-9">
                                    <label for="inputAddress2" class="form-label"><FormattedMessage id="user-manage.address" /></label>
                                    <input type="text" class="form-control" placeholder="Apartment, studio, or floor" />
                                </div>
                                <div class="col-md-3">
                                    <label for="inputEmail4" class="form-label"><FormattedMessage id="user-manage.avatar" /></label>
                                    <div className='preview-container'>
                                        <input id='uploadImg' type="file" hidden
                                            onChange={(event) => this.handleOnchangeImage(event)}
                                        />
                                        <label className='label-upload' htmlFor='uploadImg'>Tải ảnh <i class="fas fa-upload"></i></label>
                                        <div className='preview-img'
                                            style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                            onClick={() => this.openPreviewImage()}
                                        ></div>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <label for="inputState" class="form-label"><FormattedMessage id="user-manage.position" /></label>
                                    <select id="inputState" class="form-select">
                                        {positions && positions.length > 0 &&
                                            positions.map((item, index) => {
                                                return (
                                                    <option key={index}>{language === LANGUAGES.VI ? item.value_vi : item.value_en}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div class="col-md-3">
                                    <label for="inputState" class="form-label"><FormattedMessage id="user-manage.role" /></label>
                                    <select id="inputState" class="form-select">
                                        {roles && roles.length > 0 &&
                                            roles.map((item, index) => {
                                                return (
                                                    <option key={index}>{language === LANGUAGES.VI ? item.value_vi : item.value_en}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div class="col-12">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" />
                                        <label class="form-check-label" for="gridCheck">
                                            Check me out
                                        </label>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <button type="submit" class="btn btn-primary"><FormattedMessage id="user-manage.save" /></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }

            </div>

        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        isLoadingGender: state.admin.isLoadingGender,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);

import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from "../../../../store/actions";

class TableManageUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userRedux: [],

    }
  }

  componentDidMount() {
    this.props.fetchUserRedux();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listUsers !== this.props.listUsers) {
      this.setState({
        userRedux: this.props.listUsers
      })
    }
  }

  handleEditUser = (user) => {
    this.props.handleEditUserFromParent(user)
  }

  handleDeleteUser = (user) => {
    this.props.deleteUserRedux(user.id);
  }

  render() {
    let arrUsers = this.state.userRedux

    return (
      <>
        <table id='table-manage-user'>
          <tbody>
            <tr>
              <th>Email</th>
              <th><FormattedMessage id="user-manage.firstName" /></th>
              <th><FormattedMessage id="user-manage.lastName" /></th>
              <th><FormattedMessage id="user-manage.address" /></th>
              <th><FormattedMessage id="user-manage.action" /></th>
            </tr>

            {arrUsers && arrUsers.length > 0 &&
              arrUsers.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.email}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.address}</td>
                    <td>
                      <button className='btn-edit'
                        onClick={() => this.handleEditUser(item)}
                      >
                        <i className="far fa-edit"></i>
                      </button>
                      <button className='btn-delete'
                        onClick={() => this.handleDeleteUser(item)}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                )
              })
            }

          </tbody>
        </table>
      </>
    );
  }

}

const mapStateToProps = state => {
  return {
    listUsers: state.admin.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
    deleteUserRedux: (id) => dispatch(actions.deleteUser(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);

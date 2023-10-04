import actionTypes from './actionTypes';
import { getAllCodeService, createNewUserService, getAllUsers, deleteUserService } from '../../services/userService';
import { toast } from 'react-toastify';

//Gender
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_GENDER_START })
      let res = await getAllCodeService("GENDER");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (e) {
      dispatch(fetchGenderFailed());
      console.log('fetchGenderStart error'.e)
    }
  }

}

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData
})
export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED
})

//Position
export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("POSITION");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (e) {
      dispatch(fetchPositionFailed());
      console.log('fetchPositionStart error'.e)
    }
  }

}

export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData
})
export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED
})

//Role
export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("ROLE");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (e) {
      dispatch(fetchRoleFailed());
      console.log('fetchRoleStart error'.e)
    }
  }
}

export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData
})
export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED
})

//create user
export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserService(data);
      console.log('Check create user redux: ', res)
      if (res && res.errCode === 0) {
        toast.success("Create a new user");
        dispatch(createUserSucces());
        dispatch(fetchAllUsersStart())
      } else {
        toast.error("Create a new user failed!");
        dispatch(createUserFailed());
      }
    } catch (e) {
      dispatch(createUserFailed());
      console.log('createUserFailed error'.e)
    }
  }
}

export const createUserSucces = () => ({
  type: actionTypes.CREATE_USER_SUCCESS
})

export const createUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILED
})

//display user
export const fetchAllUsersStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers("All");
      if (res && res.errCode === 0) {
        dispatch(fetchAllUsersSuccess(res.users.reverse()));
      } else {
        toast.error("Fetch all user failed!");
        dispatch(fetchAllUsersFailed());
      }
    } catch (e) {
      dispatch(fetchAllUsersFailed());
      console.log('fetchRoleStart error'.e)
    }
  }
}

export const fetchAllUsersSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USERS_SUCCESS,
  users: data
})

export const fetchAllUsersFailed = () => ({
  type: actionTypes.FETCH_ALL_USERS_FAILED,
})

//delete user
export const deleteUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserService(userId);
      if (res && res.errCode === 0) {
        toast.success("Delete the user succeed!");
        dispatch(createUserSucces());
        dispatch(fetchAllUsersStart())
      } else {
        toast.error("Delete the user failed!");
        dispatch(createUserFailed());
      }
    } catch (e) {
      dispatch(createUserFailed());
      console.log('createUserFailed error'.e)
    }
  }
}

export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS
})

export const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED
})
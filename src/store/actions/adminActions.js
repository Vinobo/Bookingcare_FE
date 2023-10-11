import actionTypes from './actionTypes';
import {
  getAllCodeService, createNewUserService, getAllUsers,
  deleteUserService, editUserService, getTopDoctorHomeSevice,
  getAllDoctors, saveInforDoctorService,
  getDetailInforDoctor
} from '../../services/userService';
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
      if (res && res.errCode === 0) {
        toast.success("Create a new user");
        dispatch(createUserSuccess());
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

export const createUserSuccess = () => ({
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

//edit user
export const editUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserService(data);
      if (res && res.errCode === 0) {
        toast.success("Update the user succeed!");
        dispatch(editUserSuccess());
        dispatch(fetchAllUsersStart())
      } else {
        toast.error("Update the user failed!");
        dispatch(editUserFailed());
      }
    } catch (e) {
      toast.error("Update the user failed!");
      dispatch(editUserFailed());
      console.log('editUserFailed error'.e)
    }
  }
}
export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS
})

export const editUserFailed = () => ({
  type: actionTypes.EDIT_USER_FAILED
})

//delete user
export const deleteUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserService(userId);
      if (res && res.errCode === 0) {
        toast.success("Delete the user succeed!");
        dispatch(deleteUserSuccess());
        dispatch(fetchAllUsersStart())
      } else {
        toast.error("Delete the user failed!");
        dispatch(deleteUserFailed());
      }
    } catch (e) {
      toast.error("Delete the user failed!");
      dispatch(deleteUserFailed());
      console.log('deleteUserFailed error'.e)
    }
  }
}

export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS
})

export const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED
})

//display Outstanding Doctor
export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorHomeSevice('20');
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
          data: res.data
        })
      } else {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
        })
      }
    } catch (e) {
      console.log('FETCH_TOP_DOCTORS_FAILED: ', e)
      dispatch({
        type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
      })
    }
  }
}

//get All Doctors
export const fetchAllDoctors = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctors();
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
          dataDr: res.data
        })
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
        })
      }
    } catch (e) {
      console.log('FETCH_ALL_DOCTORS_FAILED: ', e)
      dispatch({
        type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
      })
    }
  }
}

//save Doctor
export const saveInforDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveInforDoctorService(data);
      if (res && res.errCode === 0) {
        toast.success("Save Infor Doctor succed!");
        dispatch({
          type: actionTypes.SAVE_INFOR_DOCTOR_SUCCESS,
        })
      } else {
        toast.error("Save Infor Doctor failed!");
        dispatch({
          type: actionTypes.SAVE_INFOR_DOCTOR_FAILED,
        })
      }
    } catch (e) {
      toast.error("Save Infor Doctor failed!");
      console.log('SAVE_INFOR_DOCTOR_FAILED: ', e)
      dispatch({
        type: actionTypes.SAVE_INFOR_DOCTOR_FAILED,
      })
    }
  }
}

// //get detail Doctor
// export const fetchDetailDoctor = () => {
//   return async (dispatch, getState) => {
//     try {
//       let res = await getDetailInforDoctor();
//       console.log('check ressss/: ', res)
//       if (res && res.errCode === 0) {
//         dispatch({
//           type: actionTypes.FETCH_DETAIL_DOCTOR_SUCCESS,
//           detailDr: res.data
//         })
//       } else {
//         dispatch({
//           type: actionTypes.FETCH_DETAIL_DOCTOR_FAILED,
//         })
//       }
//     } catch (e) {
//       console.log('FETCH_DETAIL_DOCTOR_FAILED: ', e)
//       dispatch({
//         type: actionTypes.FETCH_DETAIL_DOCTOR_FAILED,
//       })
//     }
//   }
// }
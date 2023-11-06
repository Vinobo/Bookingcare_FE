import actionTypes from '../actions/actionTypes';

const initialState = {
  isLoadingGender: false,
  genders: [],
  roles: [],
  positions: [],
  users: [],
  topDoctors: [],
  // detailDoctor: [],
  allDoctors: [],
  allScheduleTime: [],
  allRequiredDoctorInfor: [],
}

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    //Gender
    case actionTypes.FETCH_GENDER_START:
      let copyState = { ...state };
      copyState.isLoadingGender = true;

      console.log('fetch gender start: ', action)
      return {
        ...copyState,
      }

    case actionTypes.FETCH_GENDER_SUCCESS:
      state.genders = action.data;
      state.isLoadingGender = false;

      return {
        ...state,
      }

    case actionTypes.FETCH_GENDER_FAILED:
      state.isLoadingGender = false;
      state.genders = [];
      return {
        ...state,
      }

    //Position
    case actionTypes.FETCH_POSITION_SUCCESS:
      state.positions = action.data;

      return {
        ...state,
      }

    case actionTypes.FETCH_POSITION_FAILED:
      state.positions = [];
      return {
        ...state,
      }


    //Role
    case actionTypes.FETCH_ROLE_SUCCESS:
      state.roles = action.data;

      return {
        ...state,
      }

    case actionTypes.FETCH_ROLE_FAILED:
      state.roles = [];
      return {
        ...state,
      }

    //display user
    case actionTypes.FETCH_ALL_USERS_SUCCESS:
      state.users = action.users;

      return {
        ...state,
      }

    case actionTypes.FETCH_ALL_USERS_FAILED:
      state.users = [];
      return {
        ...state,
      }

    //display Outstanding Doctor
    case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
      state.topDoctors = action.data;

      return {
        ...state,
      }

    case actionTypes.FETCH_TOP_DOCTORS_FAILED:
      state.topDoctors = [];
      return {
        ...state,
      }

    //get doctor
    case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
      state.allDoctors = action.dataDr;

      return {
        ...state,
      }

    case actionTypes.FETCH_ALL_DOCTORS_FAILED:
      state.allDoctors = [];
      return {
        ...state,
      }

    //get detail doctor
    // case actionTypes.FETCH_DETAIL_DOCTOR_SUCCESS:
    //   state.detailDoctor = action.detailDr;

    //   return {
    //     ...state,
    //   }

    // case actionTypes.FETCH_DETAIL_DOCTOR_FAILED:
    //   state.detailDoctor = [];
    //   return {
    //     ...state,
    //   }

    case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
      state.allScheduleTime = action.dataTime;

      return {
        ...state,
      }

    case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED:
      state.allScheduleTime = [];
      return {
        ...state,
      }

    //get required doctor infor
    case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS:
      state.allRequiredDoctorInfor = action.data;
      return {
        ...state,
      }

    case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED:
      state.allRequiredDoctorInfor = [];
      return {
        ...state,
      }

    default:
      return state;
  }
}

export default adminReducer;
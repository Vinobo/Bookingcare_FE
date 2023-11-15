import axios from "../axios";

const handleLoginApi = (userEmail, userPassword) => {
  return axios.post('/api/login', { email: userEmail, password: userPassword });
}

const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`)
}

const createNewUserService = (data) => {
  return axios.post('/api/create-new-user', data)
}

const deleteUserService = (userId) => {
  return axios.delete('/api/delete-user', {
    data: { id: userId }
  })
}

const editUserService = (editData) => {
  return axios.put('/api/edit-user', editData)
}

const getAllCodeService = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`)
}

//DOCTOR
const getTopDoctorHomeSevice = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`)
}

const getAllDoctors = () => {
  return axios.get(`/api/get-all-doctors`)
}

const saveInforDoctorService = (data) => {
  return axios.post('/api/save-infor-doctor', data)
}

const getAllDoctorInfor = () => {
  return axios.get(`/api/get-all-doctors-infor`)
}

const getDetailInforDoctor = (inputId) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`)
}

const deleteDoctorInforService = (doctorId) => {
  return axios.delete(`/api/delete-doctor-infor?id=${doctorId}`)
}

const saveBulkScheduleDoctor = (data) => {
  return axios.post('/api/bulk-create-schedule', data)
}

const getScheduleDoctorByDate = (doctorId, date) => {
  return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
}

const getAddressFeeDoctorById = (doctorId) => {
  return axios.get(`/api/get-address-fee-doctor-by-id?doctorId=${doctorId}`)
}

const getProfileDoctorById = (doctorId) => {
  return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`)
}

const getAllPatientForDoctor = (data) => {
  return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`)
}

const postSendRemedy = (data) => {
  return axios.post('/api/send-remedy', data)
}

const getAllDetailDoctorByLoction = (data) => {
  return axios.get(`/api/get-detail-doctor-by-location?location=${data.location}`)
}

//PATIENT BOOKING
const postPatientBookAppointment = (data) => {
  return axios.post('/api/patient-book-appointment', data)
}

const postVerifyAppointment = (data) => {
  return axios.post('/api/verify-booking', data)
}

//SPECIALTY
const createNewSpecialty = (data) => {
  return axios.post('/api/create-new-specialty', data)
}

const getAllSpecialties = () => {
  return axios.get('/api/get-all-specialties')
}

const getAllDetailSpecialtyById = (data) => {
  return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`)
}

const deleteSpecialtyService = (specialtyId) => {
  return axios.delete(`/api/delete-specialty?id=${specialtyId}`)
}

//CLINIC
const createNewClinic = (data) => {
  return axios.post('/api/create-new-clinic', data)
}

const getAllClinic = () => {
  return axios.get('/api/get-all-clinic')
}

const getAllDetailClinicById = (data) => {
  return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`)
}

const deleteClinicService = (clinicId) => {
  return axios.delete(`/api/delete-clinic?id=${clinicId}`)
}

export {
  handleLoginApi,
  getAllUsers, createNewUserService, deleteUserService, editUserService,

  getAllCodeService, getTopDoctorHomeSevice, getAllDoctors, getAllDoctorInfor,
  saveInforDoctorService, getDetailInforDoctor, deleteDoctorInforService,
  saveBulkScheduleDoctor, getAllDetailDoctorByLoction,
  getScheduleDoctorByDate, getAddressFeeDoctorById, getProfileDoctorById,
  getAllPatientForDoctor, postSendRemedy,

  postPatientBookAppointment, postVerifyAppointment,

  createNewSpecialty, getAllSpecialties, getAllDetailSpecialtyById,
  deleteSpecialtyService,

  createNewClinic, getAllClinic, getAllDetailClinicById,
  deleteClinicService
};
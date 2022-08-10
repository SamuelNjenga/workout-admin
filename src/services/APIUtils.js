import axios from "axios";

import { API_BASE_URL } from "../constants";

export const getMemberPayments = async (page) => {
  return axios.get(`${API_BASE_URL}/v1/memberPayments?page=${page}`);
};

export const getSearchedMemberPayments = async (data) => {
  return axios.post(`${API_BASE_URL}/v1/memberPayments/search`, data);
};

export const getFilteredMemberPayments = async (data) => {
  return axios.post(`${API_BASE_URL}/v1/memberPayments/filter`, data);
};

export const getUsers = async (page) => {
  return axios.get(`${API_BASE_URL}/v1/users?page=${page}`);
};

export const getRooms = async (page) => {
  return axios.get(`${API_BASE_URL}/v1/rooms?page=${page}`);
};

export const updateRoomData = async (id, data) => {
  return axios.put(`${API_BASE_URL}/v1/rooms/${id}`, data);
};

export const getServiceTypes = async (page) => {
  return axios.get(`${API_BASE_URL}/v1/serviceTypes?page=${page}`);
};

export const getTrainerProfiles = async (page) => {
  return axios.get(`${API_BASE_URL}/v1/trainerProfiles?page=${page}`);
};

export const getTrainingSessions = async (page) => {
  return axios.get(`${API_BASE_URL}/v1/trainingSessions/admin?page=${page}`);
};

export const updateTrainingSessionData = async (id, data) => {
  return axios.put(`${API_BASE_URL}/v1/trainingSessions/${id}`, data);
};

export const getBookings = async (page) => {
  return axios.get(`${API_BASE_URL}/v1/bookings?page=${page}`);
};

export const updateBookingData = async (id, data) => {
  return axios.put(`${API_BASE_URL}/v1/bookings/${id}`, data);
};

export const updateUserData = async (id, data) => {
  return axios.put(`${API_BASE_URL}/v1/users/${id}`, data);
};

export const cancelSession = async (data) => {
  return axios.post(`${API_BASE_URL}/v1/trainingSessions/cancel`, data);
};

export const endSession = async (data) => {
  return axios.post(`${API_BASE_URL}/v1/trainingSessions/end`, data);
};

export const postponeSession = async (data) => {
  return axios.post(`${API_BASE_URL}/v1/trainingSessions/postpone`, data);
};

export const getMemberRegistrations = async (page) => {
  return axios.get(`${API_BASE_URL}/v1/memberRegistrations?page=${page}`);
};

export const updateMemberRegistrationData = async (id, data) => {
  return axios.put(`${API_BASE_URL}/v1/memberRegistrations/${id}`, data);
};

export const activateUser = async (data) => {
  return axios.post(`${API_BASE_URL}/v1/memberRegistrations/activate`, data);
};

export const diactivateUser = async (data) => {
  return axios.post(`${API_BASE_URL}/v1/memberRegistrations/diactivate`, data);
};

export const postSession = async (data) => {
  return axios.post(`${API_BASE_URL}/v1/trainingSessions`, data);
};

export const postPayment = async (data) => {
  return axios.post(`${API_BASE_URL}/v1/memberPayments`, data);
};

export const updatePaymentData = async (id, data) => {
  return axios.put(`${API_BASE_URL}/v1/memberPayments/${id}`, data);
};

export const postRoom = async (data) => {
  return axios.post(`${API_BASE_URL}/v1/rooms`, data);
};

export const postMemberRegistration = async (data) => {
  return axios.post(`${API_BASE_URL}/v1/memberRegistrations`, data);
};

export const postServiceType = async (data) => {
  return axios.post(`${API_BASE_URL}/v1/serviceTypes`, data);
};

export const updateServiceTypeData = async (id, data) => {
  return axios.put(`${API_BASE_URL}/v1/serviceTypes/${id}`, data);
};

export const postTrainerProfile = async (data) => {
  return axios.post(`${API_BASE_URL}/v1/trainerProfiles`, data);
};

export const updateTrainerProfileData = async (id, data) => {
  return axios.put(`${API_BASE_URL}/v1/trainerProfiles/${id}`, data);
};

export const getTotalAmount = async () => {
  return axios.get(`${API_BASE_URL}/v1/memberPayments/amount`);
};

export const getTotalMemberPayments = async () => {
  return axios.get(`${API_BASE_URL}/v1/memberPayments/member-amount`);
};

export const getTotalUsers = async () => {
  return axios.get(`${API_BASE_URL}/v1/users/total`);
};

export const getTotalUsersByCategory = async () => {
  return axios.get(`${API_BASE_URL}/v1/users/total/categories`);
};

export const postAdminLogin = async (data) => {
  return axios.post(`${API_BASE_URL}/v1/user/adminLogin`, data);
};

export const postUserRegistration = async (values) => {
  return axios.post(`${API_BASE_URL}/v1/users/register`, values);
};

export const getEquipments = async (page) => {
  return axios.get(`${API_BASE_URL}/v1/equipment?page=${page}`);
};

export const postEquipment = async (data) => {
  return axios.post(`${API_BASE_URL}/v1/equipment`, data);
};

export const updateEquipmentData = async (id, data) => {
  return axios.put(`${API_BASE_URL}/v1/equipment/${id}`, data);
};

export const diactivateEquipmentData = async (data) => {
  return axios.post(`${API_BASE_URL}/v1/equipment/diactivate`, data);
};

export const activateEquipmentData = async (data) => {
  return axios.post(`${API_BASE_URL}/v1/equipment/activate`, data);
};

export const getTotalSessionsPerRoom = async () => {
  return axios.get(`${API_BASE_URL}/v1/trainingSessions/total/sessions`);
};

export const getMemberDetails = async (data) => {
  return axios.post(`${API_BASE_URL}/v1/memberRegistrations/details`, data);
};

export const getFilteredTrainingSessions = async (data) => {
  return axios.post(`${API_BASE_URL}/v1/trainingSessions/filter`, data);
};

export const getAssignedTrainingSessions = async (data) => {
  return axios.post(`${API_BASE_URL}/v1/trainingSessions/assign`, data);
};

export const getTrainingSessionDetails = async (data) => {
  return axios.post(`${API_BASE_URL}/v1/trainingSessions/details`, data);
};

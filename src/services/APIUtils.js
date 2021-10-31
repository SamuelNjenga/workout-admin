import axios from 'axios'

import { API_BASE_URL } from '../constants'

export const getMemberPayments = async page => {
  return axios.get(`${API_BASE_URL}/v1/memberPayments?page=${page}`)
}

export const getUsers = async page => {
  return axios.get(`${API_BASE_URL}/v1/users?page=${page}`)
}

export const getRooms = async page => {
  return axios.get(`${API_BASE_URL}/v1/rooms?page=${page}`)
}

export const updateRoomData = async (id, data) => {
  return axios.put(`${API_BASE_URL}/v1/rooms/${id}`, data)
}

export const getServiceTypes = async page => {
  return axios.get(`${API_BASE_URL}/v1/serviceTypes?page=${page}`)
}

export const getTrainerProfiles = async page => {
  return axios.get(`${API_BASE_URL}/v1/trainerProfiles?page=${page}`)
}

export const getTrainingSessions = async page => {
  return axios.get(`${API_BASE_URL}/v1/trainingSessions/admin?page=${page}`)
}

export const getBookings = async page => {
  return axios.get(`${API_BASE_URL}/v1/bookings?page=${page}`)
}

export const updateUserData = async (id, data) => {
  return axios.put(`${API_BASE_URL}/v1/users/${id}`, data)
}

export const cancelSession = async data => {
  return axios.post(`${API_BASE_URL}/v1/trainingSessions/cancel`, data)
}

export const endSession = async data => {
  return axios.post(`${API_BASE_URL}/v1/trainingSessions/end`, data)
}

export const postponeSession = async data => {
  return axios.post(`${API_BASE_URL}/v1/trainingSessions/postpone`, data)
}

export const getMemberRegistrations = async page => {
  return axios.get(`${API_BASE_URL}/v1/memberRegistrations?page=${page}`)
}

export const activateUser = async data => {
  return axios.post(`${API_BASE_URL}/v1/memberRegistrations/activate`, data)
}

export const diactivateUser = async data => {
  return axios.post(`${API_BASE_URL}/v1/memberRegistrations/diactivate`, data)
}

export const postSession = async data => {
  return axios.post(`${API_BASE_URL}/v1/trainingSessions`, data)
}

export const postPayment = async data => {
  return axios.post(`${API_BASE_URL}/v1/memberPayments`, data)
}

export const postRoom = async data => {
  return axios.post(`${API_BASE_URL}/v1/rooms`, data)
}

export const postMemberRegistration = async data => {
  return axios.post(`${API_BASE_URL}/v1/memberRegistrations`, data)
}

export const postServiceType = async data => {
  return axios.post(`${API_BASE_URL}/v1/serviceTypes`, data)
}

export const postTrainerProfile = async data => {
  return axios.post(`${API_BASE_URL}/v1/trainerProfiles`, data)
}


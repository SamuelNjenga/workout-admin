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

export const getServiceTypes = async page => {
  return axios.get(`${API_BASE_URL}/v1/serviceTypes?page=${page}`)
}

export const getTrainerProfiles = async page => {
  return axios.get(`${API_BASE_URL}/v1/trainerProfiles?page=${page}`)
}

export const getTrainingSessions = async page => {
  return axios.get(`${API_BASE_URL}/v1/trainingSessions?page=${page}`)
}

export const getBookings = async page => {
  return axios.get(`${API_BASE_URL}/v1/bookings?page=${page}`)
}

export const updateUserData = async (id, data) => {
  return axios.put(`${API_BASE_URL}/v1/users/${id}`, data)
}

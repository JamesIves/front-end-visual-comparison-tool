import axios from 'axios';
import {
  FETCH_TEST,
  FETCH_TESTS,
  EDIT_TEST,
  RUN_TEST,
  ADD_TEST,
  REMOVE_TEST,
} from './types';

export const ROOT_URL = 'http://localhost:9090';

/**
* @desc Fetches all available tests from the API.
**/
export function fetchTests() {
  const request = axios.get(`${ROOT_URL}/tests`)

  return {
    type: FETCH_TESTS,
    payload: request
  }
}

/**
* @desc Fetches a test from the API based on an id value.
* @param {string} id - The id of the test.
**/
export function fetchTest(id) {
  const request = axios.get(`${ROOT_URL}/tests/${id}`)

  return {
    type: FETCH_TEST,
    payload: request
  }
}

/**
* @desc Runs a specific test stored in the API based on an id value.
* @param {string} id - The id of the test.
**/
export function runTest(id) {
  const request = axios.get(`${ROOT_URL}/run/${id}`)

  return {
    type: RUN_TEST,
    payload: request
  }
}

/**
* @desc Adds a test to the API.
* @param {object} props - An object containing the test data.
**/
export function addTest(props) {
  const request = axios.post(`${ROOT_URL}/tests`, props)

  return {
    type: ADD_TEST,
    payload: request
  }
}

/**
* @desc Edits a specific test stored in the api.
* @param {object} props - An object containing the test data.
* @param {string} id - The id of the test.
**/
export function editTest(props, id) {
  const request = axios.put(`${ROOT_URL}/tests/${id}`, props)

  return {
    type: EDIT_TEST,
    payload: request 
  }
}

/**
* @desc Removes a test from the API.
* @param {string} id - The id of the test.
**/
export function removeTest(id) {
  const request = axios.delete(`${ROOT_URL}/tests/${id}`)

  return {
    type: REMOVE_TEST,
    payload: request
  }
}
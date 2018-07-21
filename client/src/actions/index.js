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
export let path = '';

export function fetchTests() {
  const request = axios.get(`${ROOT_URL}/tests`)

  return {
    type: FETCH_TESTS,
    payload: request
  }
}

export function fetchTest(id) {
  const request = axios.get(`${ROOT_URL}/tests/${id}`)

  return {
    type: FETCH_TEST,
    payload: request
  }
}

export function runTest(id) {
  const request = axios.get(`${ROOT_URL}/run/${id}`)

  return {
    type: RUN_TEST,
    payload: request
  }
}

export function addTest(props) {
  const request = axios.post(`${ROOT_URL}/tests`, props)

  return {
    type: ADD_TEST,
    payload: request
  }
}

export function editTest(props, id) {
  const request = axios.post(`${ROOT_URL}/tests/${id}`, props)

  return {
    type: EDIT_TEST,
    payload: request
  }
}

export function removeTest(id) {
  const request = axios.delete(`${ROOT_URL}/tests/${id}`)

  return {
    type: REMOVE_TEST,
    payload: request
  }
}
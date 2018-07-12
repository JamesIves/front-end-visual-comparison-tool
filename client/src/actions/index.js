import axios from 'axios';
import {
  FETCH_TEST,
  FETCH_TESTS,
  FETCH_TEST_SIZE,
  ADD_TEST,
  REMOVE_TEST,
  REMOVE_SIZE
} from './types';

export const ROOT_URL = 'https://localhost:9000';
export let path = '';

export function fetchTests() {
  const request = axios.get(`${ROOT_URL}`)

  return {
    type: FETCH_TESTS,
    payload: request
  }
}

export function fetchTest(id) {
  const request = axios.get(`${ROOT_URL}`)

  return {
    type: FETCH_TEST,
    payload: request
  }
}

export function addTest(props) {
  const request = axios.post(`${ROOT_URL}`, props)

  return {
    type: ADD_TEST,
    payload: request
  }
}

export function removeTest() {
  const request = axios.delete(`${ROOT_URL}`)

  return {
    type: REMOVE_TEST,
    payload: request
  }
}
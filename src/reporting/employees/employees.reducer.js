import { bindReducer } from "../../utils/reducer";

import {
  SET_EMPLOYEES,
  SET_EMPLOYEE_SELECTED
} from "./employees.actions"

export const initialState = {
  employeesToSet: [],
  employeeSelected: {}
}

const employees = {
  [SET_EMPLOYEES]: (state, payload) => (
    {
      ...state,
      employeesToSet: payload
    }),
  [SET_EMPLOYEE_SELECTED]: (state, payload) => ({
    ...state,
    employeeSelected: payload
  })
}

export default (state, action) =>
  bindReducer(state, action, employees, initialState);
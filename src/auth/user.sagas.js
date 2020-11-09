import { call, put } from "redux-saga/effects";

import {
  updateReportingAccess
} from "./user.actions"

import {
  getUserId,
  getUserOccupation
} from "./user.service"

export const REPORTING_OWNER = "Reporting Owner"
export const BUSINESS_MANAGER = "Business Manager"
export const TALENT_ACQUISITION = "Talent Acquisition"
export const SOURCING_OFFICER = "Sourcing Officer"


const roleToAccessReporting = [
  "Reporting Owner",
  "Business Manager",
  "Talent Acquisition",
  "Sourcing Officer"
]

export function* getReportingAccess() {
  try {
    const userId = yield call(getUserId)
    const occupation = yield call(getUserOccupation, userId)

    let hasAccess = roleToAccessReporting.some(role => occupation.includes(role))
    
    yield put(updateReportingAccess(hasAccess))
  } catch (e) {
    //
  }
}

export default function userSaga() {
  return [];
}
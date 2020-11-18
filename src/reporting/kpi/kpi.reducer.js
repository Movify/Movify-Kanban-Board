import { bindReducer } from "../../utils/reducer";

import {
  SET_EMPLOYEE_KPI,
  SET_LOADING_KPI,
  SET_GAUGE_LIMIT,
  SET_OBJECT_YTD,
  SET_CV_SENT,
  SET_YTD_TOTAL_BUSINESS_MANAGER,
  SET_YTD_TOTAL_RECRUITMENT,
  SET_AVERAGE_YTD_BUSINESS_MANAGER,
  SET_AVERAGE_YTD_RECRUITMENT,
  SET_CONVERSION_YTD_BUSINESS_MANAGER,
  SET_CONVERSION_YTD_RECRUITMENT,
  SET_LOADING_YTD_TOTAL,
  SET_LOADING_YTD_AVERAGE,
  SET_LOADING_YTD_CONVERSION,
  SET_CV_SENT_IS_LOADED_WEEK,
  SET_LOADING_YTD_NEW_VACANCY,
  SET_NEW_VACANCY_YTD
} from "./kpi.actions"

export const initialState = {
  dataEmployee: {},
  dataYTDEmployee: {
    CONVERSION_YTD_BM: {
      CALL: "-",
      PROSPECTION_MEETING_SCHEDULE: 0,
      PROSPECTION_MEETING_DONE: 0,
      NEW_VACANCY: 0,
      CV_SENT: 0,
      INTAKE: 0,
      PROJECT_START: 0
    },
    TOTAL_YTD_BM: {
      CALL: 0,
      PROSPECTION_MEETING_SCHEDULE: 0,
      PROSPECTION_MEETING_DONE: 0,
      NEW_VACANCY: 0,
      CV_SENT: 0,
      INTAKE: 0,
      PROJECT_START: 0
    },
    AVERAGE_YTD_BM: {
      CALL: 0,
      PROSPECTION_MEETING_SCHEDULE: 0,
      PROSPECTION_MEETING_DONE: 0,
      NEW_VACANCY: 0,
      CV_SENT: 0,
      INTAKE: 0,
      PROJECT_START: 0
    },
    TOTAL_YTD_RE: {
      CONTACTED_BY_INMAIL: 0,
      CONTACTED_BY_PHONE: 0,
      INTERVIEW_SCHEDULED: 0,
      NO_SHOW: 0,
      INTERVIEW_DONE: 0,
      CONTRACT_PROPOSED: 0,
      HIRED: 0
    },
    AVERAGE_YTD_RE: {
      CONTACTED_BY_INMAIL: 0,
      CONTACTED_BY_PHONE: 0,
      INTERVIEW_SCHEDULED: 0,
      NO_SHOW: 0,
      INTERVIEW_DONE: 0,
      CONTRACT_PROPOSED: 0,
      HIRED: 0
    },
    CONVERSION_YTD_RE: {
      CONTACTED_BY_INMAIL: "-",
      CONTACTED_BY_PHONE: "-",
      INTERVIEW_SCHEDULED: 0,
      NO_SHOW: 0,
      INTERVIEW_DONE: 0,
      CONTRACT_PROPOSED: 0,
      HIRED: 0
    }
  },
  isLoadingKpi: false,
  gaugeLimit: {},
  isLoadingYTDTotal: false,
  isLoadingYTDAverage: false,
  isLoadingYTDConversion: false,
  isCvSentWeekLoading: false,
  isLoadingYTDNewVacancy: false
}

const kpi = {
  [SET_EMPLOYEE_KPI]: (state, payload) => ({
    ...state,
    dataEmployee: payload
  }),
  [SET_OBJECT_YTD]: (state, payload) => ({
    ...state,
    dataYTDEmployee: payload
  }),
  [SET_LOADING_KPI]: (state, payload) => ({
    ...state,
    isLoadingKpi: payload
  }),
  [SET_GAUGE_LIMIT]: (state, payload) => ({
    ...state,
    gaugeLimit: payload
  }),
  [SET_CV_SENT]: (state, payload) => ({
    ...state,
    dataEmployee: {
      ...state.dataEmployee,
      datasBusinessManager: {
        ...state.dataEmployee.datasBusinessManager,
        CV_SENT: payload
      }
    },
  }),
  [SET_YTD_TOTAL_BUSINESS_MANAGER]: (state, payload) => ({
    ...state,
    dataYTDEmployee: {
      ...state.dataYTDEmployee,
      TOTAL_YTD_BM: {
        ...state.dataYTDEmployee.TOTAL_YTD_BM,
        CALL: payload.CALL,
        PROSPECTION_MEETING_SCHEDULE: payload.PROSPECTION_MEETING_SCHEDULE,
        PROSPECTION_MEETING_DONE: payload.PROSPECTION_MEETING_DONE,
        INTAKE: payload.INTAKE,
        PROJECT_START: payload.PROJECT_START
      }
    }
  }),
  [SET_YTD_TOTAL_RECRUITMENT]: (state, payload) => ({
    ...state,
    dataYTDEmployee: {
      ...state.dataYTDEmployee,
      TOTAL_YTD_RE: payload
    }
  }),
  [SET_AVERAGE_YTD_BUSINESS_MANAGER]: (state, payload) => ({
    ...state,
    dataYTDEmployee: {
      ...state.dataYTDEmployee,
      AVERAGE_YTD_BM: {
        ...state.dataYTDEmployee.AVERAGE_YTD_BM,
        CALL: payload.CALL,
        PROSPECTION_MEETING_SCHEDULE: payload.PROSPECTION_MEETING_SCHEDULE,
        PROSPECTION_MEETING_DONE: payload.PROSPECTION_MEETING_DONE,
        INTAKE: payload.INTAKE,
        PROJECT_START: payload.PROJECT_START
      }
    }
  }),
  [SET_AVERAGE_YTD_RECRUITMENT]: (state, payload) => ({
    ...state,
    dataYTDEmployee: {
      ...state.dataYTDEmployee,
      AVERAGE_YTD_RE: payload
    }
  }),
  [SET_CONVERSION_YTD_BUSINESS_MANAGER]: (state, payload) => ({
    ...state,
    dataYTDEmployee: {
      ...state.dataYTDEmployee,
      CONVERSION_YTD_BM: {
        ...state.dataYTDEmployee.CONVERSION_YTD_BM,
        CALL: payload.CALL,
        PROSPECTION_MEETING_SCHEDULE: payload.PROSPECTION_MEETING_SCHEDULE,
        PROSPECTION_MEETING_DONE: payload.PROSPECTION_MEETING_DONE,
        INTAKE: payload.INTAKE,
        PROJECT_START: payload.PROJECT_START
      }
    }
  }),
  [SET_CONVERSION_YTD_RECRUITMENT]: (state, payload) => ({
    ...state,
    dataYTDEmployee: {
      ...state.dataYTDEmployee,
      CONVERSION_YTD_RE: payload
    }
  }),
  [SET_LOADING_YTD_TOTAL]: (state, payload) => ({
    ...state,
    isLoadingYTDTotal: payload
  }),
  [SET_LOADING_YTD_AVERAGE]: (state, payload) => ({
    ...state,
    isLoadingYTDAverage: payload
  }),
  [SET_LOADING_YTD_CONVERSION]: (state, payload) => ({
    ...state,
    isLoadingYTDConversion: payload
  }),
  [SET_CV_SENT_IS_LOADED_WEEK]: (state, payload) => ({
    ...state,
    isCvSentWeekLoading: payload
  }),
  [SET_LOADING_YTD_NEW_VACANCY]: (state, payload) => ({
    ...state,
    isLoadingYTDNewVacancy: payload
  }),
  [SET_NEW_VACANCY_YTD]: (state, payload) => ({
    ...state,
    dataYTDEmployee: {
      ...state.dataYTDEmployee,
      TOTAL_YTD_BM:{
        ...state.dataYTDEmployee.TOTAL_YTD_BM,
        NEW_VACANCY: payload.TOTAL_YTD.NEW_VACANCY
      },
      AVERAGE_YTD_BM:{
        ...state.dataYTDEmployee.AVERAGE_YTD_BM,
        NEW_VACANCY: payload.AVERAGE.NEW_VACANCY
      }
    }
  }),

}

export default (state, action) =>
  bindReducer(state, action, kpi, initialState);
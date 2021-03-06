export const GET_RECRUITMENT = "GET_RECRUITMENT";
export const UPDATE_RECRUITMENT_CLIENT_CORPORATIONS_IDS =
  "UPDATE_RECRUITMENT_CLIENT_CORPORATIONS_IDS";
export const UPDATE_RECRUITMENT_CLIENT_CORPORATIONS =
  "UPDATE_RECRUITMENT_CLIENT_CORPORATIONS";
export const GET_RECRUITMENT_JOB_ORDERS = "GET_RECRUITMENT_JOB_ORDERS";
export const SET_RECRUITMENT_JOB_ORDERS = "SET_RECRUITMENT_JOB_ORDERS";
export const UPDATE_RECRUITMENT_JOB_ORDERS = "UPDATE_RECRUITMENT_JOB_ORDERS";
export const GET_RECRUITMENT_JOB_SUBMISSIONS =
  "GET_RECRUITMENT_JOB_SUBMISSIONS";
export const SET_RECRUITMENT_JOB_SUBMISSIONS =
  "SET_RECRUITMENT_JOB_SUBMISSIONS";
export const UPDATE_RECRUITMENT_JOB_SUBMISSIONS =
  "UPDATE_RECRUITMENT_JOB_SUBMISSIONS";
export const UPDATE_HRS = "UPDATE_HRS";
export const UPDATE_RECRUITMENT_JOB_SUBMISSION =
  "UPDATE_RECRUITMENT_JOB_SUBMISSION";
export const CREATE_RECRUITMENT_JOB_SUBMISSION =
  "CREATE_RECRUITMENT_JOB_SUBMISSION";
export const DELETE_RECRUITMENT_JOB_SUBMISSION =
  "DELETE_RECRUITMENT_JOB_SUBMISSION";
export const REMOVE_RECRUITMENT_JOB_SUBMISSION =
  "REMOVE_RECRUITMENT_JOB_SUBMISSION";

export const getRecruitment = () => ({ type: GET_RECRUITMENT });

export const updateClientCorporationsIds = clientCorporations => ({
  type: UPDATE_RECRUITMENT_CLIENT_CORPORATIONS_IDS,
  payload: clientCorporations
});

export const updateClientCorporations = clientCorporations => ({
  type: UPDATE_RECRUITMENT_CLIENT_CORPORATIONS,
  payload: clientCorporations
});

export const getJobOrders = tamId => ({
  type: GET_RECRUITMENT_JOB_ORDERS,
  payload: tamId
});
export const setJobOrders = jobOrders => ({
  type: SET_RECRUITMENT_JOB_ORDERS,
  payload: jobOrders
});
export const updateJobOrders = jobOrders => ({
  type: UPDATE_RECRUITMENT_JOB_ORDERS,
  payload: jobOrders
});

export const getJobSubmissions = (joId, ccId) => ({
  type: GET_RECRUITMENT_JOB_SUBMISSIONS,
  payload: { joId, ccId }
});
export const setJobSubmissions = jobSubmissions => ({
  type: SET_RECRUITMENT_JOB_SUBMISSIONS,
  payload: jobSubmissions
});
export const updateJobSubmissions = jobSubmissions => ({
  type: UPDATE_RECRUITMENT_JOB_SUBMISSIONS,
  payload: jobSubmissions
});

export const updateHrs = hrs => ({ type: UPDATE_HRS, payload: hrs });

export const updateJobSubmission = (
  prevJobOrderId,
  prevStatus,
  jobOrderId,
  jobSubmissionId,
  status
) => ({
  type: UPDATE_RECRUITMENT_JOB_SUBMISSION,
  payload: {
    prevJobOrderId,
    prevStatus,
    jobOrderId,
    jobSubmissionId,
    status
  }
});

export const createJobSubmission = (jobOrder, jobSubmission, status) => ({
  type: CREATE_RECRUITMENT_JOB_SUBMISSION,
  payload: { jobOrder, jobSubmission, status }
});

export const deleteJobSubmission = jobSubmission => ({
  type: DELETE_RECRUITMENT_JOB_SUBMISSION,
  payload: jobSubmission
});
export const removeJobSubmission = jobSubmissionId => ({
  type: REMOVE_RECRUITMENT_JOB_SUBMISSION,
  payload: jobSubmissionId
});

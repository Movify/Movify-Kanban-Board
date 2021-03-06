import { get, post } from "../utils/api";
import { getFilterStatusRequest, RECRUITMENT_STATUSES } from "../utils/kanban";

export const getTalentAcquisitionManagers = (start = 0) =>
  get("query/CorporateUser", {
    fields: "id,firstName,lastName,occupation,primaryDepartment",
    where: "occupation IN ('Talent Acquisition Manager %26 Reporting Owner', 'Talent Acquisition Manager', 'Reporting Owner %26 Talent Acquisition Manager') AND isDeleted=false",
    orderBy: "firstName,primaryDepartment.name",
    start
  });

export const getJobSubmissions = (jobOrderId, start = 0) =>
  post(
    "search/JobSubmission",
    {
      query: `jobOrder.id:${jobOrderId} AND isDeleted:false AND (${getFilterStatusRequest(
        RECRUITMENT_STATUSES
      )})`,
      start
    },
    {
      fields: "id,candidate,jobOrder,owners,sendingUser,status,dateLastModified"
    }
  );

export const getCandidate = candidateId =>
  get(`entity/Candidate/${candidateId}`, {
    fields: "id,firstName,lastName,owner,category,middleName,employmentPreference"
  });

export const updateJobSubmission = (jobSubmissionId, status, jobOrderId) =>
  post(`entity/JobSubmission/${jobSubmissionId}`, {
    status,
    jobOrder: { id: jobOrderId }
  });

export const updateCandidateDecision = (candidateId, decision) =>
  post(`entity/Candidate/${candidateId}`, {
    middleName: decision
  });

export const getClientCorporation = clientCorporationId =>
  get(`entity/ClientCorporation/${clientCorporationId}`, {
    fields: "id,name,department"
  });

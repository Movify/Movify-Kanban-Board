import { all, call, put, takeLatest, takeEvery } from "redux-saga/effects";
import { path, pathOr, prop, propOr } from "ramda";
import {
  GET_RECRUITMENT,
  updateClientCorporationsIds,
  updateClientCorporations,
  getJobOrders as getJobOrdersAction,
  updateJobOrders,
  getJobSubmissions as getJobSubmissionsAction,
  updateJobSubmissions,
  GET_RECRUITMENT_JOB_SUBMISSIONS,
  GET_RECRUITMENT_JOB_ORDERS
} from "./recruitment.actions";
import {
  getTalentAcquisitionManagers,
  getJobSubmissions as getJobSubmissionsService
} from "./recruitment.service";
import { getJobOrders as getJobOrdersService } from "../kanban/kanban.service";

export function* getRecruitment() {
  yield call(getTams);
}

export function* getTams(start = 0) {
  try {
    const tamsResponse = yield call(getTalentAcquisitionManagers, start);
    const tamList = yield call(propOr, [], "data", tamsResponse);

    yield all(tamList.map(tam => put(getJobOrdersAction(prop("id", tam)))));

    if (propOr(0, "count", tamsResponse) > 0)
      yield call(
        getTalentAcquisitionManagers,
        propOr(0, "start", tamsResponse) + propOr(0, "count", tamsResponse)
      );
  } catch (e) {
    //
  }
}

export function* getClientCorporations(tamId, jobOrders) {
  const ccList = [];
  const clientCorporations = yield all(
    jobOrders.reduce((acc, jo) => {
      const cc = prop("clientCorporation", jo);
      ccList.push(prop("id", cc));

      const jos = pathOr([], [prop("id", cc), "jobOrders"], acc).concat(
        prop("id", jo)
      );

      acc[prop("id", cc)] = {
        ...cc,
        jobOrders: jos
      };

      return acc;
    }, {})
  );

  yield put(updateClientCorporations(clientCorporations));
  yield put(updateClientCorporationsIds(ccList));
}

export function* getJobOrders(action, start = 0) {
  const tamId = prop("payload", action);
  try {
    const jobOrdersResponse = yield call(getJobOrdersService, tamId, start);
    const jobOrderList = yield call(propOr, [], "data", jobOrdersResponse);

    yield call(getClientCorporations, tamId, jobOrderList);

    const jobOrders = yield all(
      jobOrderList.reduce((acc, jo) => {
        acc[prop("id", jo)] = { ...jo, jobSubmissions: {} };
        return acc;
      }, {})
    );

    yield put(updateJobOrders(jobOrders));

    yield all(
      jobOrderList.map(jobOrder =>
        put(getJobSubmissionsAction(prop("id", jobOrder)))
      )
    );

    const newStart =
      propOr(0, "start", jobOrdersResponse) +
      propOr(0, "count", jobOrdersResponse);
    if (newStart < propOr(0, "total", jobOrdersResponse))
      yield call(getJobOrders, action, newStart);
  } catch (e) {
    //
  }
}

export function* getJobSubmissions(action, start = 0) {
  const joId = prop("payload", action);
  try {
    const jobSubmissionsResponse = yield call(
      getJobSubmissionsService,
      joId,
      start
    );
    const jsList = propOr([], "data", jobSubmissionsResponse);

    const jobOrders = {};
    const jobSubmissions = yield all(
      jsList.reduce((acc, js) => {
        acc[prop("id", js)] = {
          ...js
        };

        const joId = path(["jobOrder", "id"], js);
        const jojss = pathOr(
          [],
          [joId, "jobSubmissions", js.status],
          jobOrders
        ).concat([js.id]);
        jobOrders[joId] = {
          jobSubmissions: {
            ...pathOr({}, [joId, "jobSubmissions"], jobOrders),
            [js.status]: jojss
          }
        };

        return acc;
      }, {})
    );

    yield put(updateJobSubmissions(jobSubmissions));
    yield put(updateJobOrders(jobOrders));
  } catch (e) {
    //
  }
}

export default function kanbanSagas() {
  return [
    takeLatest(GET_RECRUITMENT, getRecruitment),
    takeEvery(GET_RECRUITMENT_JOB_ORDERS, getJobOrders),
    takeEvery(GET_RECRUITMENT_JOB_SUBMISSIONS, getJobSubmissions)
  ];
}
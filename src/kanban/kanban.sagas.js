import {
  all,
  call,
  put,
  select,
  takeEvery,
  takeLatest
} from "redux-saga/effects";
import { path, pathOr, prop, propOr } from "ramda";
import {
  GET_KANBAN,
  GET_JOB_ORDERS,
  GET_JOB_SUBMISSIONS,
  updateKanban,
  getJobOrders as getJobOrdersAction,
  getJobSubmissions as getJobSubmissionsAction
} from "./kanban.actions";
import {
  getBusinessManagers,
  getJobOrders as getJobOrdersService,
  getJobSubmissions as getJobSubmissionsService
} from "./kanban.service";

export const getKanban = state => pathOr([], ["kanban", "kanban"], state);

export function* getKanbanBoard() {
  try {
    const bms = yield call(getBusinessManagers);
    const bmList = yield call(propOr, [], "data", bms);
    yield put(updateKanban(bmList));
    yield all(bmList.map(bm => put(getJobOrdersAction(prop("id", bm)))));
  } catch (e) {
    //
  }
}

const groupByClientCorporations = jobOrders =>
  jobOrders.reduce((acc, jobOrder) => {
    const clientCorporationIndex = acc.findIndex(
      clientCorporation =>
        prop("id", clientCorporation) ===
        path(["clientCorporation", "id"], jobOrder)
    );

    if (clientCorporationIndex >= 0) {
      acc[clientCorporationIndex].jobOrders.push(jobOrder);
    } else {
      acc.push({
        ...jobOrder.clientCorporation,
        jobOrders: [jobOrder]
      });
    }

    return acc;
  }, []);

export function* getJobOrders(action) {
  const bmId = action.payload;
  try {
    const jobOrders = yield call(getJobOrdersService, bmId);
    const jobOrderList = yield call(propOr, [], "data", jobOrders);
    const clientCorporations = yield call(
      groupByClientCorporations,
      jobOrderList
    );
    const kanban = yield select(getKanban);
    const updatedKanban = kanban.map(bm => {
      if (bm.id === bmId) {
        return { ...bm, clientCorporations };
      } else return { ...bm };
    });
    yield put(updateKanban(updatedKanban));
    yield all(
      jobOrderList.map(jobOrder =>
        put(
          getJobSubmissionsAction(
            bmId,
            path(["clientCorporation", "id"], jobOrder),
            prop("id", jobOrder)
          )
        )
      )
    );
  } catch (e) {
    //
  }
}

export function* getJobSubmissions(action) {
  const {
    payload: { bmId, clientCorporationId, jobOrderId }
  } = action;
  try {
    const jobSubmissions = yield call(getJobSubmissionsService, jobOrderId);
    const jobSubmissionList = yield call(propOr, [], "data", jobSubmissions);
    const kanban = yield select(getKanban);
    const updatedKanban = kanban.map(bm => {
      if (bm.id === bmId) {
        const clientCorporations = propOr([], "clientCorporations", bm).map(
          clientCorporation => {
            if (clientCorporation.id === clientCorporationId) {
              const jobOrders = propOr([], "jobOrders", clientCorporation).map(
                jobOrder => {
                  if (jobOrder.id === jobOrderId) {
                    return { ...jobOrder, jobSubmissions: jobSubmissionList };
                  } else {
                    return { ...jobOrder };
                  }
                }
              );
              return { ...clientCorporation, jobOrders };
            } else return { ...clientCorporation };
          }
        );
        return { ...bm, clientCorporations };
      } else return { ...bm };
    });
    yield put(updateKanban(updatedKanban));
  } catch (e) {
    //
  }
}

export default function kanbanSagas() {
  return [
    takeLatest(GET_KANBAN, getKanbanBoard),
    takeEvery(GET_JOB_ORDERS, getJobOrders),
    takeEvery(GET_JOB_SUBMISSIONS, getJobSubmissions)
  ];
}

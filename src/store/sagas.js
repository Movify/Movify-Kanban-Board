import { all } from "redux-saga/effects";
import authSagas from "../auth/auth.sagas";
import kanbanSagas from "../kanban/kanban.sagas";
import priorityFilterSagas from "../priorityFilter/priorityFilter.sagas";
import addCandidateSagas from "../addCandidate/addCandidate.sagas";
import recruitmentSagas from "../recruitment/recruitment.sagas";
import transitionSagas from "../transition/transition.sagas";

export default function* rootSaga() {
  yield all([
    ...authSagas(),
    ...kanbanSagas(),
    ...priorityFilterSagas(),
    ...addCandidateSagas(),
    ...recruitmentSagas(),
    ...transitionSagas()
  ]);
}

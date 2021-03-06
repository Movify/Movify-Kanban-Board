import {
  STATUS_NO_GO,
  STATUS_ITV1,
  STATUS_ITV2,
  STATUS_TO_SEND,
  STATUS_WF_RESPONSE,
  STATUS_INTAKE,
  STATUS_WF_FEEDBACK,
  STATUS_OFFER,
} from "./kanban"

export const statusLabels = new Map([
  [STATUS_ITV1, 'Backlog'],
  [STATUS_ITV2, 'Project Check'],
  [STATUS_TO_SEND, STATUS_TO_SEND],
  [STATUS_WF_RESPONSE, STATUS_WF_RESPONSE],
  [STATUS_INTAKE, STATUS_INTAKE],
  [STATUS_WF_FEEDBACK, STATUS_WF_FEEDBACK],
  [STATUS_NO_GO, STATUS_NO_GO],
  [STATUS_OFFER, STATUS_OFFER],
])
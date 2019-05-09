import React from "react";
import { array, string } from "prop-types";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import { STATUS_NO_GO } from "../../utils/kanban";
import Candidates from "./Candidates";

const getBackgroundColor = (isNoGo, snapshot, theme) => {
  if (snapshot.isDraggingOver) return theme.colors.transparentRed;
  if (snapshot.draggingFromThisWith) return theme.colors.transparentGrey;
  if (isNoGo) return theme.colors.lightGrey;
  return theme.colors.darkWhite;
};

const Container = styled.div({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  width: "14.3%",
  minWidth: "14.3%",
  maxWidth: "14.3%"
});

const Content = styled.div(({ isNoGo, snapshot, theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "80%",
  flexGrow: 1,
  padding: 8,
  margin: 4,
  backgroundColor: getBackgroundColor(isNoGo, snapshot, theme),
  borderRadius: theme.dimensions.borderRadius
}));

const Title = styled.div(({ theme }) => ({
  fontFamily: theme.fonts.fontFamily,
  fontSize: theme.textDimensions.medium,
  textAlign: "center",
  paddingTop: 4,
  paddingBottom: 4,
  textOverflow: "ellipsis",
  overflow: "hidden"
}));

const Column = ({ columnId, jobSubmissions, status }) => {
  return (
    <Container>
      <Title>{status}</Title>
      <Droppable droppableId={columnId}>
        {(provided, snapshot) => (
          <Content snapshot={snapshot} isNoGo={status === STATUS_NO_GO}>
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{ minHeight: 65, height: "100%" }}
            >
              <Candidates jobSubmissions={jobSubmissions} />
              {provided.placeholder}
            </div>
          </Content>
        )}
      </Droppable>
    </Container>
  );
};
Column.propTypes = {
  columnId: string,
  jobSubmissions: array,
  status: string
};
export default Column;

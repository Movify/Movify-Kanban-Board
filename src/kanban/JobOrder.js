import React from "react";
import { connect } from "react-redux";
import { pathOr, prop, propOr } from "ramda";
import { number, object } from "prop-types";
import styled from "styled-components";
import PriorityBadge from "../components/PriorityBadge";
import { Row, Text } from "./Kanban";
import Board from "./board/Board";

const Column = styled.div({
  display: "flex",
  flexDirection: "column",
  width: "16%"
});

const JobOrder = ({ jobOrder }) => (
  <Row>
    <Column>
      <Row>
        <Text
          style={{ marginTop: 4, paddingRight: 4, display: "flex", flex: 1 }}
        >
          {propOr("", "title", jobOrder)}
        </Text>
        <PriorityBadge priority={prop("employmentType", jobOrder)} />
      </Row>
      <Text>
        {`${pathOr("", ["clientContact", "firstName"], jobOrder)} ${pathOr(
          "",
          ["clientContact", "lastName"],
          jobOrder
        )} `}
      </Text>
    </Column>
    <Board
      bmId={prop("bmId", jobOrder)}
      clientCorporationId={prop("clientCorporationId", jobOrder)}
      jobOrderId={prop("id", jobOrder)}
    />
  </Row>
);

JobOrder.propTypes = {
  joId: number,
  jobOrder: object
};

export default connect((state, { joId }) => ({
  jobOrder: pathOr({}, ["kanban", "jobOrders", joId], state)
}))(JobOrder);

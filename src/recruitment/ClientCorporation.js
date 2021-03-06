import React from "react";
import { connect } from "react-redux";
import { pathOr, prop, propOr } from "ramda";
import { number, object, string } from "prop-types";
import { ColorColumnText, Column, Row } from "../components";
import JobOrder from "./JobOrder";

const ClientCorporation = ({ clientCorporation, color }) => (
  <Row style={{ marginBottom: 6 }}>
    <ColorColumnText style={{ width: "80px" }} color={color}>
      {prop("name", clientCorporation)}
    </ColorColumnText>
    <Column>
      {propOr([], "jobOrders", clientCorporation).map(joId => (
        <JobOrder key={joId} joId={joId} color={color} />
      ))}
    </Column>
  </Row>
);

ClientCorporation.propTypes = {
  clientCorporation: object,
  clientId: number,
  color: string
};

export default connect((state, { clientId }) => ({
  clientCorporation: pathOr(
    {},
    ["recruitment", "clientCorporations", clientId],
    state
  )
}))(ClientCorporation);

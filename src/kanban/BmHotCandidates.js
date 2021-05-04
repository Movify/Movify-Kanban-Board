import React, { useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid"
import { connect } from "react-redux";
import { pathOr } from "ramda";
import { number, object, string, oneOf, array, func } from "prop-types";
import styled, { css } from "styled-components";
import { Column } from "../components";
import ClientCorporation from "./ClientCorporation";
import { ADD, DELETE } from "../hotCandidates/utils";
import AddButton from "../components/AddButton";
import TitleBackground from "../components/svgs/TitleBackground"

export const HOT_CANDIDATES = 'HOT_CANDIDATES'
export const BUSINESS = 'BUSINESS'

export const KANBAN_TYPES = [HOT_CANDIDATES, BUSINESS]

const StyledAddButton = styled(AddButton)`
  align-self: end;
  grid-column: 1;
  grid-row: 3;
  margin-left: 4rem;
`

const Container = styled.div`
  display: grid;
  min-height: 357px;
  height: 100%;
  grid-template-rows: auto 1fr auto;
`

const Title = styled.p`
  ${({ color, height, theme: { colors } }) => css`
    color: ${colors.white};
    text-transform: uppercase;
    padding: 1rem;
    position: relative;
    grid-column: 1;
    grid-row: 1;
    text-shadow: 1px 1px 2px #00000021;
    &::after {
      content: '';
      background-color: ${color};
      position: absolute;
      left: 0;
      top: 0;
      width: 0.625rem;
      height: ${height}px;
      border-radius: 0.625rem;
      z-index: -1;
    }
  `}
`

const StyledColumn = styled(Column)`
  grid-row: 2;
  grid-column: 1;
  padding: 1rem 0 0 4rem;
  row-gap: 1rem;
`

const NoCandidatesMessage = styled.p`
  margin: 0;
  padding-top: 1rem;
`

const StyledTitleBackground = styled(TitleBackground)`
  width: 200px;
  position: absolute;
  left: 0;
  z-index: -1;
  top: 0;
`

const Bm = ({ bm, color, title, data, kanbanType = BUSINESS, onOpenModal }) => {
  const containerRef = useRef(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const dimensions = containerRef.current.getBoundingClientRect()
    setHeight(dimensions?.height ?? 200)
  })

  const dataToRender = kanbanType === BUSINESS ? bm?.clientCorporations?.map((ccId) => ({
    ccId,
    color,
    bmId: bm?.id,
  })) : data

  const handleClickAddButton = () => {
    onOpenModal(title, ADD)
  }

  const handleClickDeleteButton = (candidateIdToDelete) => {
    onOpenModal(title, DELETE, candidateIdToDelete)
  }

  return (
    <Container ref={containerRef}>
      <Title color={color} height={height}>
        {title}
        <StyledTitleBackground color={color} />
      </Title>
      <StyledColumn>
        {dataToRender?.length > 0 ? dataToRender?.map((single, index) => (
          <ClientCorporation
            key={uuid()}
            bmId={single?.bmId}
            ccId={single?.ccId}
            color={color}
            kanbanType={kanbanType}
            data={kanbanType === HOT_CANDIDATES ? single : null}
            index={index}
            onOpenDeleteModal={handleClickDeleteButton}
          />
        )) : <NoCandidatesMessage>No candidates added yet, click the button below to add a candidate.</NoCandidatesMessage>}
      </StyledColumn>
      {kanbanType === HOT_CANDIDATES ? (
        <StyledAddButton backgroundColor={color} onClick={handleClickAddButton} title="Add candidate" />
      ) : null}
    </Container>
  )}

Bm.propTypes = {
  bm: object,
  bmId: number,
  color: string,
  title: string,
  data: array,
  kanbanType: oneOf(['HOT_CANDIDATES', 'BUSINESS']),
  onOpenModal: func,
};

export default connect((state, { bmId }) => ({
  bm: pathOr({}, ["kanban", "bms", bmId], state)
}))(Bm);

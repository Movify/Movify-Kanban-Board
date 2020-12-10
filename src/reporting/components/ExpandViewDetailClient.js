import React, { useEffect } from 'react'
import { connect } from "react-redux"
import { pathOr, propOr, prop } from 'ramda'
import { array } from 'prop-types'
import styled from 'styled-components'
import BullhornLink from './BullhornLink'
import LinkedinLink from './LinkedinLink'

const Paragraph = styled.p`
    text-align: left
`

const Row = styled.div({
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
});

const ExpandViewDetailClient= ({ week, title, dataToDisplay }) => {

    return (
        <>
            {
                dataToDisplay.map((data, i) => (
                    <Row key={i}>
                        <Paragraph >{propOr("", 'FIRSTNAME', data).trim() + ' ' + propOr("", 'LASTNAME', data).trim() + ' @' + propOr("", 'COMPANY', data).trim()}</Paragraph>
                        <BullhornLink candidateId={prop('ID', data)} />
                        <LinkedinLink firstName={propOr("", 'FIRSTNAME', data).trim()} lastName={propOr("", 'LASTNAME', data).trim()} />
                    </Row>
                ))
            }
        </>

    )

}

ExpandViewDetailClient.propTypes = {
    dataToDisplay: array
};

export default connect(
    (state, { week, title }) => ({
        dataToDisplay: pathOr([], ["expandView", title, week], state),
    }),
    {}
)(ExpandViewDetailClient);
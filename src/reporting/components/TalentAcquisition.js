import React from 'react'
import { connect } from "react-redux";
import { TableContentTd, TableContentTbodyTr, TableContentTdTitle, TableContentTbodyTrNoLine, TableContentTdLabel, TableContentTdTitleForBM, TableContentTdBold, TableContentTdLabelBold } from "../../style/table_style"
import { pathOr } from 'ramda'
import { object, string } from "prop-types"
import { LABEL_HIRED, LABEL_INTERVIEW_DONE, LABEL_INTERVIEW_SCHEDULE } from '../../utils/reporting'
import {
    BUSINESS_MANAGER
} from '../../auth/user.sagas'

const TalentAcquisition = ({ datas, occupation }) => {
    return (
        <>
            {
                (occupation.includes(BUSINESS_MANAGER)) && (
                    <TableContentTbodyTrNoLine>
                        <TableContentTdTitleForBM>Recruitment</TableContentTdTitleForBM>
                    </TableContentTbodyTrNoLine>
                )
            }
            {
                (!occupation.includes(BUSINESS_MANAGER)) && (
                    <TableContentTbodyTrNoLine>
                        <TableContentTdTitle>Recruitment</TableContentTdTitle>
                    </TableContentTbodyTrNoLine>
                )
            }

            {
                Object.keys(datas).map((key, i) => {
                    if (datas[key].TITLE === LABEL_INTERVIEW_DONE || datas[key].TITLE === LABEL_INTERVIEW_SCHEDULE) {
                        return (
                            <TableContentTbodyTr key={i}>
                                <TableContentTdLabelBold>{datas[key].TITLE}</TableContentTdLabelBold>
                                <TableContentTdBold>{datas[key].FIRST_WEEK}</TableContentTdBold>
                                <TableContentTdBold>{datas[key].SECOND_WEEK}</TableContentTdBold>
                                <TableContentTdBold>{datas[key].THIRD_WEEK}</TableContentTdBold>
                                <TableContentTdBold>{datas[key].FOURTH_WEEK}</TableContentTdBold>
                            </TableContentTbodyTr>
                        )
                    } else if (datas[key].TITLE === LABEL_HIRED) {
                        return (
                            <tr key={i}>
                                <TableContentTdLabel>{datas[key].TITLE}</TableContentTdLabel>
                                <TableContentTd>{datas[key].FIRST_WEEK}</TableContentTd>
                                <TableContentTd>{datas[key].SECOND_WEEK}</TableContentTd>
                                <TableContentTd>{datas[key].THIRD_WEEK}</TableContentTd>
                                <TableContentTd>{datas[key].FOURTH_WEEK}</TableContentTd>
                            </tr>
                        )
                    } else {
                        return (
                            <TableContentTbodyTr key={i}>
                                <TableContentTdLabel>{datas[key].TITLE}</TableContentTdLabel>
                                <TableContentTd>{datas[key].FIRST_WEEK}</TableContentTd>
                                <TableContentTd>{datas[key].SECOND_WEEK}</TableContentTd>
                                <TableContentTd>{datas[key].THIRD_WEEK}</TableContentTd>
                                <TableContentTd>{datas[key].FOURTH_WEEK}</TableContentTd>
                            </TableContentTbodyTr>
                        )
                    }
                })
            }
        </>
    )
}

TalentAcquisition.propTypes = {
    datas: object,
    occupation: string
};

export default connect(
    state => ({
        datas: pathOr({}, ["kpi", "dataEmployee", "datasRecruitment"], state),
        occupation: pathOr("", ["employees", "employeeSelected", "occupation"], state)
    }),
    {}
)(TalentAcquisition);
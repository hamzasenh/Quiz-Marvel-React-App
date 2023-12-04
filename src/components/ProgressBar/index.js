import React, { Fragment } from 'react'

const ProgressBar = ({idQuestions, maxQuestions}) => {

    const getPercent = (totalQuestions, questionId) => {
        return (100 / totalQuestions) * questionId;
    }
    const actualQuestion = idQuestions + 1;
    const progressPercent = getPercent(maxQuestions, actualQuestion);


  return (
    <Fragment>
        <div className="percentage">
            <div className="progressPercent">{`Question ${idQuestions + 1}/${maxQuestions}`}</div>
            <div className="progressPercent">{`Progression: ${ progressPercent }%`}</div>
        </div>
        <div className="progressBar">
            <div className="progressBarChange" style={{width: `${ progressPercent }%`}}>

            </div>
        </div>
    </Fragment>
  )
}

export default React.memo(ProgressBar);

import React, { useEffect, useState } from 'react';
import Stepper from 'react-stepper-horizontal';



const Levels = ({levelNames, quizzLevel}) => {

  const [levels, setLevels] = useState([]);

  useEffect(() => {
    const quizzSteps = levelNames.map(level => ({title: level.toUpperCase()}));
    setLevels(quizzSteps)
  }, [levelNames]);

  return (
    <div className="levelsContainer" style={{background: 'transparent'}}>
      <Stepper 
        steps={ levels } 
        activeStep={quizzLevel}
        circleTop={0}
        activeTitleColor={"#d31017"}
        activeColor={"#d31017"}
        completeTitleColor={"#E0E0EO"}
        defaultTitleColor={"#E0E0EO"}
        completeColor={"#d31017"}
        completeBarColor={"#E0E0EO"}
        barStyle={'dashed'}
        size={45}
        circleFontSize={20}
      />
    </div>
  )
}

export default React.memo(Levels);

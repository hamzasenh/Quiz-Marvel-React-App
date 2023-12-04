import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';


const Landing = () => {

    const [btn, setBtn] = useState(null);
    console.log(btn);

    const refLeopold = useRef();
    console.log(refLeopold);

    useEffect(() => {
        refLeopold.current.classList.add("startingImg");
        setTimeout(() => {
            refLeopold.current.classList.remove("startingImg");
            setBtn(true)
        }, 1000);
    }, [])

    const setLeftImg = () => {
        refLeopold.current.classList.add("leftImg");
    }

    const setRightImg = () => {
        refLeopold.current.classList.add("rightImg");
    }

    const clearImg = () => {
        if(refLeopold.current.classList.contains("leftImg")) {
            refLeopold.current.classList.remove("leftImg")
        } else if (refLeopold.current.classList.contains("rightImg")) {
            refLeopold.current.classList.remove("rightImg")
        }
    }

    const displayBtn = btn && (
        <Fragment>
            <div onMouseOver={ setLeftImg } onMouseOut={ clearImg } className="leftBox">
                <Link className="btn-welcome" to="/signup">Inscription</Link>
            </div>

            <div onMouseOver={ setRightImg } onMouseOut={ clearImg } className="rightBox">
                <Link className="btn-welcome" to="/login">Connexion</Link>
            </div>
        </Fragment>
            

    )


  return (
    <main ref={ refLeopold } className="welcomePage">
        { displayBtn }
    </main>
  )
}

export default Landing

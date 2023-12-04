import React, { useEffect, useState } from 'react';
import { signOut } from '@firebase/auth';
import { auth } from '../Firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';


const Logout = () => {

    const navigate = useNavigate();

    const [checked, setChecked] = useState(false);


    useEffect(() => {
        if(checked) {
            console.log('deconnexion')
            signOut(auth).then(() => {
                console.log('Vous êtes deco');
                setTimeout(() => {
                    navigate('/')
                }, 1000);
            }).catch((error) => {
                console.log('oups erreur');
            });
        }
    }, [checked, navigate])

    const handleChange = e => {
        setChecked(e.target.checked);
    }

  return (
    <div>
      <div className="logoutContainer">
            <label className="switch">
                <input 
                    onChange={ handleChange }
                    type="checkbox" 
                    checked={ checked }
                />
                
                <span className="slider round" data-tip="Hello world!" data-for="logoutTooltip"></span>
            </label>
            <Tooltip place="left" type="dark" effect="solid" id="logoutTooltip" />
      </div>
    </div>
  )
}

export default Logout;

import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from '@firebase/auth';
import { auth, user } from '../Firebase/firebaseConfig';
import { getDoc } from '@firebase/firestore';
import Logout from '../Logout';
import Quizz from '../Quizz';
import { useNavigate } from 'react-router';
import Loader from '../Loader';

const Welcome = () => {

    const navigate = useNavigate();

    const [userSession, setUserSession] = useState(null);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const listener = onAuthStateChanged(auth, user => {
            user ? setUserSession(user) : navigate('/');
        });
        

        if(!!userSession) {

            const colRef = user(userSession.uid);
            getDoc(colRef)
            .then( snapshot => {
                if(snapshot.exists) {
                    const docData = snapshot.data();
                    setUserData(docData);
                }
            })
            .catch(error => {
                console.log(error);
            })
        }

        return () => listener();
    }, [navigate, userSession])
    

    return userSession === null ? (
        <Loader 
            loadingMsg={"Authentification ..."}
            styling={{textAlign: 'center', color: '#fff'}}
        />
        
    ) : (
        <div className="quiz-bg">
            <div className="container">
                <Logout />
                <Quizz userData={ userData } />
            </div>
        </div>
    )
}

export default Welcome;

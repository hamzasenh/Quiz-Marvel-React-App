import React, { Component, Fragment } from 'react';
import { toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Levels from '../Levels';
import ProgressBar from '../ProgressBar';
import { QuizzMarvel } from '../QuizzMarvel';
import QuizzOver from '../QuizzOver';
import { FaChevronRight } from "react-icons/fa";

const initialState = {
        levelNames: ["debutant", "intermediaire", "expert"],
        quizzLevel: 0,
        maxQuestions: 10,
        storedQuestions: [],
        question: null,
        options: [],
        idQuestions: 0,
        btnDisabled: true,
        userAnswer: null,
        score: 0,
        showWelcomeMsg: false,
        quizzEnd: false,
        percent: null
    }

    const levelNames = ["debutant", "intermediaire", "expert"];

class Quizz extends Component {

    

    constructor(props) {
      super(props)

    
      this.state = initialState;
      this.storedDataRef = React.createRef();

    }
    

    loadQuestions = quizz => {
        const fetchedArrayQuizz = QuizzMarvel[0].quizz[quizz];
        console.log('Chargement des questions pour le quizz :', quizz);
    
        if (fetchedArrayQuizz && fetchedArrayQuizz.length >= this.state.maxQuestions) {
            console.log('Questions chargées :', fetchedArrayQuizz);
    
            this.storedDataRef.current = fetchedArrayQuizz;
    
            const newArray = fetchedArrayQuizz.map(({ answer, ...keepRest }) => keepRest);
            console.log('Nouveau tableau de questions :', newArray);
    
            this.setState({ storedQuestions: newArray });
        }
    };



    showToastMsg = pseudo => {
        if (!this.state.showWelcomeMsg) {

            this.setState({ showWelcomeMsg: true });
    
            toast.warn(`Bienvenue ${pseudo} , et bonne chance!`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                bodyClassName: "toastify-color"
            });

        }
    };

    componentDidMount = () => {
        this.loadQuestions(levelNames[this.state.quizzLevel])

    }

    nextQuestion = () => {
        if(this.state.idQuestions === this.state.maxQuestions - 1) {

            this.setState({ quizzEnd: true })

        } else {

            this.setState( prevState => ({ idQuestions: prevState.idQuestions + 1 }))

        }

        // +1
        const goodAnswer = this.storedDataRef.current[this.state.idQuestions].answer;
        if(this.state.userAnswer === goodAnswer) {

            this.setState(prevState => ({ score: prevState.score + 1 }))

            toast.success('Bravo +1', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",

            });
        } else {

            toast.error('Raté 0', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",

            });

        }
    }

    componentDidUpdate(prevProps, prevState) {

        const {
            maxQuestions,
            storedQuestions,
            idQuestions,
            score,
            quizzEnd,

        } = this.state;

        if ((storedQuestions !== prevState.storedQuestions) && storedQuestions.length){
            this.setState({
                question: storedQuestions[idQuestions].question,
                options: storedQuestions[idQuestions].options
            });
        }

        if ((idQuestions !== prevState.idQuestions) && storedQuestions.length) {
            this.setState({
                question: storedQuestions[idQuestions].question,
                options: storedQuestions[idQuestions].options,
                userAnswer: null,
                btnDisabled: true,

            });
        }

        if (quizzEnd !== prevState.quizzEnd) {
            const gradePercent = this.getPercentage(maxQuestions, score);
            this.gameOver(gradePercent);

        }

        if (this.props.userData && this.props.userData.pseudo) {
            this.showToastMsg(this.props.userData.pseudo);
        }
        

    }

    

    submitAnswer = selectedAnswer => {
        this.setState({
            userAnswer: selectedAnswer,
            btnDisabled: false
        })
    }

    getPercentage = (maxQuest, ourScore) => (ourScore / maxQuest) * 100;

    gameOver = percent => {

        if(percent >= 50) {
            this.setState({
                quizzLevel: this.state.quizzLevel + 1,
                percent

            })
        } else {
            this.setState({
                percent

            })
        }
    }

    loadLevelQuestions = param => {
        console.log('Chargement des questions pour le niveau :', param);
        this.setState({ ...initialState, quizzLevel: param });
        this.loadQuestions(levelNames[param]);
    };
    

    render() {

        const {
            quizzLevel,
            maxQuestions,
            question,
            options,
            idQuestions,
            btnDisabled,
            userAnswer,
            score,
            quizzEnd,
            percent

        } = this.state;
        

        const displayOptions = options.map((option, index) => {
            return(
                <p key={index} 
                    className={`answerOptions ${ userAnswer === option ? "selected" : null}`}
                    onClick={ () => this.submitAnswer(option) }
                >
                    <FaChevronRight /> { option }
                </p>
            )
        })

        return quizzEnd ? (
            <QuizzOver  
                ref={ this.storedDataRef }
                levelNames={ levelNames }
                score={ score }
                maxQuestions={ maxQuestions }
                quizzLevel={ quizzLevel }
                percent={ percent }
                loadLevelQuestions={ this.loadLevelQuestions}
            />
        ) : (
            <Fragment>
                <Levels
                    levelNames={ levelNames }
                    quizzLevel={ quizzLevel }
                />

                <ProgressBar 
                    idQuestions={ idQuestions}
                    maxQuestions={ maxQuestions }
                />
                <h2>{ question }</h2>
                
                { displayOptions }

                <button 
                    disabled={ btnDisabled } 
                    className="btnSubmit"
                    onClick={this.nextQuestion}
                >
                { idQuestions < maxQuestions - 1 ? "Suivant" : "Terminer" }
                </button>

                <ToastContainer />

            </Fragment>
        )


    }
  
}

export default Quizz;

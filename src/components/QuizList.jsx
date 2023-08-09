import { useEffect, useState } from "react";
import quizzesMockData from "../data/quizzesMockData";
import QuizCard from "./common/QuizCard";
import { useSelector, useDispatch } from 'react-redux'
import { replaceQuizzes, addQuiz, removeQuiz } from '../redux/reducer'

const QuizList = () => {
    // const [quizzesData, setQuizzesData] = useState([]);

    const quizzesData = useSelector((state) => state.quizzes.value)
    const dispatch = useDispatch()

    useEffect(() => {
        fetch('http://quiz-maker.apidocs.enterwell.space/quizzes')
          .then(response => response.json())
          .then(json => setQuizzesData(json))
          .catch(error => {
            //In case the API fails, we will use the mock data
            dispatch(replaceQuizzes(quizzesMockData));
            console.error(error)
        });
      }, []);

    return (
        <>
            <div>
                <h1>Quizzes List</h1>
            </div>
            <div>
                {/* Lists all the quizes */}
                {quizzesData.map((quiz, index) => (
                    <QuizCard key={index} id={quiz.id} name={quiz.name} questions={quiz.questions}/>
                ))}
            </div>
        </>
    )
}

export default QuizList;
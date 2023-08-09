import { useEffect, useState } from "react";
import quizzesMockData from "../data/quizzesMockData";
import QuizCard from "./common/QuizCard";

const QuizList = () => {
    const [quizzesData, setQuizzesData] = useState([]);

    useEffect(() => {
        fetch('http://quiz-maker.apidocs.enterwell.space/quizzes')
          .then(response => response.json())
          .then(json => setQuizzesData(json))
          .catch(error => {
            //In case the API fails, we will use the mock data
            setQuizzesData(quizzesMockData)
            console.error(error)
        });
      }, []);

    return (
        <>
            <div>
                <h1>QuizList</h1>
            </div>
            <div>
                {/* Lists all the quizes */}
                {quizzesData.map((quiz) => (
                    <QuizCard id={quiz.id} name={quiz.name} questions={quiz.questions}/>
                ))}
            </div>
        </>
    )
}

export default QuizList;
import { useEffect, useState } from "react";
import QuizCard from "./common/QuizCard";
import { useSelector, useDispatch } from 'react-redux'
import { replaceQuizzes, newQuiz } from '../redux/reducer'
import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import NameInputDialog from "./common/NameInputDialog";

// Replace the imports with the following line to use the real api
// import { getQuizzes, createQuiz } from "../services/apiService";
import { getQuizzes, createQuiz } from "../services/mockApi";

const QuizList = () => {
    const quizzesData = useSelector((state) => state.quizzes.value)
    const dispatch = useDispatch()
    const navigateTo = useNavigate();
    const [open, setOpen] = useState(false);

    const handleNewQuiz = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (name) => {
        createQuiz(name).then((data) => {
            let quiz = {
                id: data.id,
                name: name,
                questions: []
            }

            dispatch(newQuiz(quiz))
            navigateTo(`/quiz/${data.id}/${name}/edit`);
        })
    }

    useEffect(() => {
        //Get the quizzes from the mockApi and dispatch the replaceQuizzes action
        if(quizzesData.length === 0){
            getQuizzes().then((data) => {
                dispatch(replaceQuizzes(data))
            })
        }
      }, []);

    return (
        <>
            <div className="flex justify-between p-[1rem]">
                <h1 className="text-4xl">Quizzes List</h1>
                <div>
                    <Button variant="outlined" startIcon={<AddIcon />} onClick={handleNewQuiz}>New Quiz</Button>
                </div>
            </div>
            <div>
                {/* Lists all the quizes */}
                {quizzesData?.map((quiz, index) => (
                    <QuizCard key={index} id={quiz.id} name={quiz.name} questions={quiz.questions}/>
                ))}
            </div>

            <NameInputDialog 
                open={open}
                onClose={handleClose}
                onSubmit={handleSubmit}
            />
        </>
    )
}

export default QuizList;
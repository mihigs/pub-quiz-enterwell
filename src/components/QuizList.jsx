import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { replaceQuizzes, removeQuiz } from "../redux/quizzesReducer";
import { addQuestionsFromQuizzes } from "../redux/questionsReducer";

import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import QuizCard from "./common/QuizCard";
import NameInputDialog from "./common/NameInputDialog";

import { getQuizzes, deleteQuiz } from "../services/apiService.js";

const QuizList = () => {
  const quizzesData = useSelector((state) => state.quizzes.value);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const [open, setOpen] = useState(false);

  const handleNewQuiz = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (quizName) => {
    if (quizName === "") return;
    navigateTo(`/quiz/${quizName}/new`);
    handleClose();
  };

  const handleDeleteQuiz = (id) => {
    deleteQuiz(id).then(() => {
      //TODO: check if response successful
      dispatch(removeQuiz(id));
    });
  };

  useEffect(() => {
    //Get the quizzes from the API and dispatch the replaceQuizzes action
    if (quizzesData?.length === 0) {
      getQuizzes().then((response) => {
        //Add the quizzes to the store
        dispatch(replaceQuizzes(response));
        //Add the questions to the store
        dispatch(addQuestionsFromQuizzes(response));
      });
    }
  }, [dispatch, quizzesData?.length]);

  return (
    <>
      <div className="flex justify-between p-[1rem]">
        <h1 className="text-4xl">Quizzes</h1>
        <div className="pt-2">
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleNewQuiz}
          >
            New Quiz
          </Button>
        </div>
      </div>
      <div className="h-[90vh] overflow-y-scroll">
        {/* Lists all the quizes */}
        {quizzesData?.filter((quiz) => !quiz.hidden).map((quiz, index) => (
            <QuizCard
                key={index}
                id={quiz.id}
                name={quiz.name}
                questions={quiz.questions}
                onClick={() => navigateTo(`/quiz/${quiz.id}/edit`)}
                onDelete={handleDeleteQuiz}
                onPlay={() => navigateTo(`/quiz/${quiz.id}/preview`)}
            />
        ))}
      </div>

      {/* 'Create new quiz' dialog */}
      <NameInputDialog
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default QuizList;

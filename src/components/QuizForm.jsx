import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { editQuiz, newQuiz } from "../redux/quizzesReducer";
import { addQuestion } from "../redux/questionsReducer";
import PropTypes from "prop-types";

import { Button, Input } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

import NewQuestionModal from "./common/NewQuestionModal";
import QuestionCard from "./common/QuestionCard";

import { getQuiz, getAllQuestions, updateQuiz, createQuiz } from "../services/apiService.js";

const QuizForm = ({isNewQuiz}) => {
  const { quizName, quizId } = useParams();

  const [editedQuizName, setEditedQuizName] = useState(quizName || "");
  const [quiz, setQuiz] = useState({});
  const [availableQuestions, setAvailableQuestions] = useState([]);
  const [newQuestionModalOpen, setNewQuestionModalOpen] = useState(false);
  const [editQuestionName, setEditQuestionName] = useState(false);

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handleSubmitQuestion = (question) => {
    //TODO: check if question already exists
    if(question.question === "" || question.answer === "") return;
    //Close the modal
    setNewQuestionModalOpen(false);
    //Add the question to the quiz
    let updatedQuiz = { ...quiz };
    updatedQuiz.questions = [
      ...(quiz.questions || []),
      {
        question: question.question,
        answer: question.answer,
      },
    ];
    //Update the quiz
    setQuiz(updatedQuiz);
    //Add the question to the store
    dispatch(addQuestion(question));

    //Remove the question from the available questions
    setAvailableQuestions(
      availableQuestions.filter(
        (availableQuestion) => availableQuestion.question !== question.question
      )
    );
  };

  const handleSwitchQuestion = (questionToBeMoved, used) => {
    if (used) {
      //Move the question to available questions
      setAvailableQuestions([
        ...availableQuestions,
        {
          id: questionToBeMoved.id,
          question: questionToBeMoved.question,
          answer: questionToBeMoved.answer,
        },
      ]);
      let updatedQuiz = { ...quiz };
      updatedQuiz.questions = quiz.questions.filter(
        (item) => item.question !== questionToBeMoved.question
      );
      setQuiz(updatedQuiz);
    } else {
      //Add the question to the quiz
      let updatedQuiz = { ...quiz };
      updatedQuiz.questions = [
        ...quiz.questions || [],
        {
          id: questionToBeMoved.id,
          question: questionToBeMoved.question,
          answer: questionToBeMoved.answer,
        },
      ];
      setQuiz(updatedQuiz);
      setAvailableQuestions(
        availableQuestions.filter(
          (item) => item.question !== questionToBeMoved.question
        )
      );
    }
  };

  const toggleEditQuestionName = () => {
    //Toggle the edit question modal
    setEditQuestionName(!editQuestionName);
    //Save changes
    let updatedQuiz = { ...quiz };
    updatedQuiz.name = editedQuizName;
    setQuiz(updatedQuiz);
  };

  const handleQuizNameChange = (name) => {
    //Set the quiz name
    setEditedQuizName(name);
  };

  const handleSaveQuiz = () => {
    //Prepare the quiz to be saved
    let updatedQuiz = { ...quiz };
    updatedQuiz.name = editedQuizName;

    if (isNewQuiz) {
      //POST the quiz to the API
      createQuiz(updatedQuiz).then((response) => {
        dispatch(newQuiz(response));
      });
    } else {
      //PUT the quiz to the API
      updateQuiz(updatedQuiz).then((response) => {
        dispatch(editQuiz(response));
      });
    }
    //Close the edit quiz page
    navigateTo("/");
  };

  useEffect(() => {
    (async () => {
        let quizData;
        //If the quiz is new, create a new quiz object
        if (isNewQuiz) {
          quizData = {
            name: quizName,
            questions: [],
          };
          setQuiz(quizData);
        //Else get the quiz from the API
        }else{
          quizData = await getQuiz(quizId);
          setQuiz(quizData);
          setEditedQuizName(quizData.name);
        }

        //Get the questions from the API
        let data = await getAllQuestions();
        //Filter out the questions that are already used in the quiz
        let filteredQuestions = data.filter((item) => {
          return !quizData.questions?.some(
            (usedQuestion) => usedQuestion.question === item.question
          );
        });
        setAvailableQuestions(filteredQuestions);
      }
    )();
  }, [quizName, isNewQuiz, quizId]);

  return (
    <div>
      <div className="p-[1rem] flex gap-10 justify-end sm:justify-between flex-col sm:flex-row">
        {/* Edit quiz name */}
        <div className="flex items-center justify-between w-full sm:w-1/3 md:w-1/3 xl:w-1/4 h-[3rem] gap-5">
          {editQuestionName ? (
            <Input
              autoFocus
              className="text-4xl"
              inputProps={{ style: { color: "white" } }}
              disableUnderline
              value={editedQuizName}
              onChange={(e) => handleQuizNameChange(e.target.value)}
              onKeyUp={(event) => {
                if (event.key === "Enter") {
                  toggleEditQuestionName();
                }
              }}
            />
          ) : (
            <h1 onClick={toggleEditQuestionName} className="text-4xl overflow-hidden">{editedQuizName}</h1>
          )}
          <EditIcon onClick={toggleEditQuestionName} />
        </div>
        <div className="flex gap-2 items-center justify-end">
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => setNewQuestionModalOpen(true)}
          >
            Add Question
          </Button>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSaveQuiz}
          >
            Save changes
          </Button>
        </div>
      </div>

      <div className="flex h-[85vh] flex-col md:flex-row overflow-y-scroll pb-[8rem] md:pb-0">
        <p className="pl-3 md:hidden">Available questions</p>
        <div className="md:w-1/2 border border-indigo-500 md:p-5 m-5 rounded-md md:overflow-y-scroll">
          {/* List all the unused available questions */}
          {availableQuestions?.map((question, index) => (
            <QuestionCard
              key={index}
              id={question.id}
              question={question.question}
              answer={question.answer}
              used={false}
              onAction={() => handleSwitchQuestion(question, false)}
            />
          ))}
        </div>
        <p className="pl-3 md:hidden">Used questions</p>
        <div className="md:w-1/2 m-5">
          <div className="h-full border border-indigo-500 md:p-5 rounded-md overflow-y-scroll">
            {/* List all the used questions */}
            {quiz?.questions?.map((question, index) => (
              <QuestionCard
                key={index}
                id={question.id}
                question={question.question}
                answer={question.answer}
                used={true}
                onAction={() => handleSwitchQuestion(question, true)}
              />
            ))}
          </div>
          <p className="text-right">Questions: {quiz?.questions?.length | 0}</p>
        </div>
      </div>
      <NewQuestionModal
        open={newQuestionModalOpen}
        onClose={() => setNewQuestionModalOpen(false)}
        onSubmit={handleSubmitQuestion}
      />
    </div>
  );
};

QuizForm.defaultProps = {
  isNewQuiz: false,
};

QuizForm.propTypes = {
  isNewQuiz: PropTypes.bool,
};

export default QuizForm;

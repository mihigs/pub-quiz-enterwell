import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateQuiz, newQuiz } from "../redux/reducer";

import { Button, Input } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

import NewQuestionModal from "./common/NewQuestionModal";
import QuestionCard from "./common/QuestionCard";

// Replace the imports with the following line to use the real api
import { getQuiz, getAllQuestions, putQuiz, createQuiz } from "../services/mockApiService";
// import { getQuizzes, getAllQuestions, putQuiz } from "../services/apiService";

const QuizForm = ({ isNewQuiz }) => {
  const { quizName, quizId } = useParams();

  const [editedQuizName, setEditedQuizName] = useState(quizName || "");
  const [quiz, setQuiz] = useState({});
  const [availableQuestions, setAvailableQuestions] = useState([]);
  const [newQuestionModalOpen, setNewQuestionModalOpen] = useState(false);
  const [editQuestionName, setEditQuestionName] = useState(false);

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handleNewQuestion = () => {
    //Open the new question modal
    setNewQuestionModalOpen(true);
  };

  const handleSubmitQuestion = (question) => {
    //Add the question to the quiz
    let updatedQuiz = { ...quiz };
    updatedQuiz.questions = [
      ...(quiz.questions || []),
      {
        question: question.question,
        answer: question.answer,
      },
    ];
    setQuiz(updatedQuiz);
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
        ...quiz?.questions,
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

  const handleCloseNewQuestionModal = () => {
    //Close the new question modal
    setNewQuestionModalOpen(false);
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
      putQuiz(updatedQuiz).then((response) => {
        dispatch(updateQuiz(response));
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
            name: editedQuizName,
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
        console.log("questions useEffect", data);
        //Filter out the questions that are already used in the quiz
        let filteredQuestions = data.filter((item) => {
          return !quizData.questions?.some(
            (usedQuestion) => usedQuestion.id === item.id
          );
        });
        setAvailableQuestions(filteredQuestions);
      }
    )();
  }, []);

  return (
    <div>
      <div className="flex justify-between p-[1rem]">
        {/* Edit quiz name */}
        <div className="flex items-center justify-between w-1/3 h-[3rem] gap-5">
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
        <div className="flex gap-2 items-center">
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleNewQuestion}
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

      <div className="flex h-[85vh]">
        <div className="w-1/2 m-5">
          <div className="h-full p-5 border border-indigo-500 rounded-md overflow-y-scroll">
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
          <p>Questions: {quiz?.questions?.length | 0}</p>
        </div>
        <div className="w-1/2 border border-indigo-500 p-5 m-5 rounded-md overflow-y-scroll">
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
      </div>
      <NewQuestionModal
        open={newQuestionModalOpen}
        onClose={handleCloseNewQuestionModal}
        onSubmit={handleSubmitQuestion}
      />
    </div>
  );
};

QuizForm.defaultProps = {
  newQuiz: false,
};

export default QuizForm;

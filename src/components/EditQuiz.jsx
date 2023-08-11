import { useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import QuestionCard from "./common/QuestionCard";
import { useEffect, useState } from "react";
import NewQuestionModal from "./common/NewQuestionModal";

// Replace the imports with the following line to use the real api
// import { getQuizzes, getAllQuestions } from "../services/apiService";
import { getQuiz, getAllQuestions } from "../services/mockApi";

const EditQuiz = () => {
  const { quizId, quizName } = useParams();
  const [quiz, setQuiz] = useState({});
  const [availableQuestions, setAvailableQuestions] = useState([]);
  const [newQuestionModalOpen, setNewQuestionModalOpen] = useState(false);

  const handleNewQuestion = () => {
    //Open the new question modal
    setNewQuestionModalOpen(true);
  };

  const handleSubmitQuestion = (question) => {
    debugger;
    //Add the question to the quiz
    let updatedQuiz = {...quiz};
    updatedQuiz.questions =
      [
        ...quiz.questions,
        { id: question.id, question: question.question, answer: question.answer },
      ];
    setQuiz(updatedQuiz);
    setAvailableQuestions(
      availableQuestions.filter(
        (availableQuestion) => availableQuestion.id !== question.id
      )
    );
  };

  const handleSwitchQuestion = (questionToBeMoved, used) => {
    if (used) {
      //Move the question to available questions
      setAvailableQuestions([
        ...availableQuestions,
        { id: questionToBeMoved.id, question: questionToBeMoved.question, answer: questionToBeMoved.answer },
      ]);
      let updatedQuiz = {...quiz};
      updatedQuiz.questions = quiz.questions.filter(
        (question) => question.id !== questionToBeMoved.id
      );
      setQuiz(updatedQuiz);
    } else {
      //Add the question to the quiz
      let updatedQuiz = {...quiz};
      updatedQuiz.questions =
       [
        ...quiz.questions,
        { id: questionToBeMoved.id, question: questionToBeMoved.question, answer: questionToBeMoved.answer },
      ];
      setQuiz(updatedQuiz);
      setAvailableQuestions(
        availableQuestions.filter(
          (question) => question.id !== questionToBeMoved.id
        )
      );
    }
  };

  const handleCloseNewQuestionModal = () => {
    //Close the new question modal
    setNewQuestionModalOpen(false);
  };

  useEffect(() => {
    //Get the quiz from the API
    getQuiz(quizId).then((quizData) => {
      setQuiz(quizData);
      //Get the questions from the API
      getAllQuestions().then((data) => {
        //Filter out the questions that are already used in the quiz
        let filteredQuestions = data.filter((question) => {
          return !quizData.questions?.some(
            (usedQuestion) => usedQuestion.id === question.id
          );
        });
        setAvailableQuestions(filteredQuestions);
      });
    });
  }, []);

  return (
    <div>
      <div className="flex justify-between p-[1rem]">
        <h1 className="text-4xl">{quizName}</h1>
        <div>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleNewQuestion}
          >
            Add Question
          </Button>
        </div>
      </div>

      <div className="flex h-[85vh]">
        <div className="w-1/2 border border-indigo-500 p-5 m-5 rounded-md overflow-y-scroll">
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

export default EditQuiz;

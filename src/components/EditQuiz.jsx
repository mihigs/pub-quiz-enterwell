import { useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { Button, Input } from "@mui/material";
import QuestionCard from "./common/QuestionCard";
import { useEffect, useState } from "react";
import NewQuestionModal from "./common/NewQuestionModal";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { useDispatch } from "react-redux";
import { updateQuiz } from "../redux/reducer";
import { useNavigate } from "react-router-dom";

// Replace the imports with the following line to use the real api
// import { getQuizzes, getAllQuestions, putQuiz } from "../services/apiService";
import { getQuiz, getAllQuestions, putQuiz } from "../services/mockApiService";

const EditQuiz = () => {
  const { quizId, quizName } = useParams();
  const [editedQuizName, setEditedQuizName] = useState(quizName);
  const [quiz, setQuiz] = useState({});
  const [availableQuestions, setAvailableQuestions] = useState([]);
  const [newQuestionModalOpen, setNewQuestionModalOpen] = useState(false);
  const [editQuestionName, setEditQuestionName] = useState(false);

  const dispatch = useDispatch();

  const navigateTo = useNavigate();

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
        id: generateFakeId(),
        question: question.question,
        answer: question.answer,
      },
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
        {
          id: questionToBeMoved.id,
          question: questionToBeMoved.question,
          answer: questionToBeMoved.answer,
        },
      ]);
      let updatedQuiz = { ...quiz };
      updatedQuiz.questions = quiz.questions.filter(
        (question) => question.id !== questionToBeMoved.id
      );
      setQuiz(updatedQuiz);
    } else {
      //Add the question to the quiz
      let updatedQuiz = { ...quiz };
      updatedQuiz.questions = [
        ...quiz.questions,
        {
          id: questionToBeMoved.id,
          question: questionToBeMoved.question,
          answer: questionToBeMoved.answer,
        },
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

  const generateFakeId = () => {
    //Get all the ids of the questions and find the highest one
    let ids = availableQuestions.map((question) => question.id);
    let maxId = Math.max(...ids);
    //Return the highest id + 1
    return maxId + 1;
  };

  const handleSaveQuiz = () => {
    //Prepare the quiz to be saved
    let updatedQuiz = { ...quiz };
    updatedQuiz.name = editedQuizName;

    //PUT the quiz to the API
    putQuiz(updatedQuiz).then((response) => {
      dispatch(updateQuiz(response));
    });

    //Close the edit quiz page
    navigateTo("/");
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

export default EditQuiz;

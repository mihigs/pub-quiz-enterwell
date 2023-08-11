import quizzesMockData from "../data/quizzesMockData.json";
import { store } from "../main.jsx";
import { newQuiz, removeQuiz } from "../redux/reducer";

const getQuizzes = () => {
  return Promise.resolve(quizzesMockData);
};

const createQuiz = (quizName) => {
  //Return a promise with the quiz
  let mockResponse = {
    id: quizzesMockData.length + Math.floor(Math.random() * 100), // random number between to simulate a unique id
    name: quizName,
    questions: [],
  };
  return Promise.resolve(mockResponse);
};

const getQuiz = (quizId) => {
  return Promise.resolve(
    store.getState().quizzes.value.find((quiz) => quiz.id === parseInt(quizId))
  );
};

const getAllQuestions = () => {
  let quizzes = store.getState().quizzes.value;
  return Promise.resolve(
    quizzes.reduce((acc, quiz) => {
      return [...acc, ...quiz.questions];
    }, [])
  );
};

const deleteQuiz = (quizId) => {
  return Promise.resolve(quizId);
};

const putQuiz = (quiz) => {
  return Promise.resolve(quiz);
};

export { getQuizzes, createQuiz, getQuiz, getAllQuestions, deleteQuiz, putQuiz };

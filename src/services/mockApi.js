import quizzesMockData from "../data/quizzesMockData.json";
import { store } from "../main.jsx";

const getQuizzes = () => {
  return Promise.resolve(quizzesMockData);
};

const createQuiz = (quizName) => {
  let mockResponse = {
    id: quizzesMockData.length + Math.floor(Math.random() * 100), // random number between 0 and 100, to simulate a unique id
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

export { getQuizzes, createQuiz, getQuiz, getAllQuestions };

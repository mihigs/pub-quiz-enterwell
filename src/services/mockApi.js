import quizzesMockData from "../data/quizzesMockData.json";
import { store } from "../main.jsx";

const generateUniqueQuizId = () => {
  //Get the highest ID from the quizzes in the store
  let highestId = store.getState().quizzes.value.reduce((acc, quiz) => {
    return quiz.id > acc ? quiz.id : acc;
  }, 0);
  return highestId + 1;
};

const generateUniqueQuestionsId = (questions) => {
  //Get the highest ID from the questions in the store
  let quizzes = store.getState().quizzes.value;
  let questionsInStore = quizzes.reduce((acc, quiz) => {
      return [...acc, ...quiz.questions];
  }, [])
  questionsInStore = questionsInStore.filter((question, index, self) => self.findIndex((q) => q.id === question.id) === index);
  let highestId = questionsInStore.reduce((acc, question) => {
    return question.id > acc ? question.id : acc;
  }, 0);
  //Assign an ID to the questions that don't have one
  let questionsWithIds = questions.map((question) => {
    if(!question.id) {
      question.id = ++highestId;
    }
    return question;
  });
  return questionsWithIds;
};

const getQuizzes = () => {
  return Promise.resolve(quizzesMockData);
};

const createQuiz = (quiz) => {
  //Return a promise with the quiz
  let mockResponse = {
    id: generateUniqueQuizId(), //Simulate a unique quiz ID generated on the server
    name: quiz.name,
    questions: generateUniqueQuestionsId(quiz.questions), //Simulate unique question IDs generated on the server
  };
  return Promise.resolve(mockResponse);
};

const getQuiz = (quizId) => {
  //Check if the quiz exists in the store, if not, get it from the mock data //TODO: Review
  if (!store.getState().quizzes.value.find((quiz) => quiz.id === parseInt(quizId))) {
    let quiz = quizzesMockData.find((quiz) => quiz.id === parseInt(quizId));
    return Promise.resolve(quiz);
  }
  return Promise.resolve(store.getState().quizzes.value.find((quiz) => quiz.id === parseInt(quizId)));
};

const getAllQuestions = () => {
  //Get all the unique questions from the store, simulating a call to the server
  let questions = store.getState().questions.value;
  return Promise.resolve(questions);
};

const deleteQuiz = (quizId) => {
  //Returns a promise with the quiz object, simulating a successful response from the server
  let quiz = store.getState().quizzes.value.find((quiz) => quiz.id === parseInt(quizId));
  return Promise.resolve(quiz);
};

const updateQuiz = (quiz) => {
  //Check if there are new questions, if so, generate unique IDs for them
  quiz.questions = generateUniqueQuestionsId(quiz.questions);
  //Returns a promise with the quiz object, simulating a successful response from the server
  return Promise.resolve(quiz);
};

export {
  getQuizzes,
  createQuiz,
  getQuiz,
  getAllQuestions,
  deleteQuiz,
  updateQuiz
};

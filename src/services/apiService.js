import * as mockApi from './mockApi'
import * as quizMakerApi from './quizMakerApi'

//Switch between mockApi and quizMakerApi
const apiConfig = {
    useMockApi: true,
}

const { getQuizzes, createQuiz, getQuiz, getAllQuestions, deleteQuiz, updateQuiz } = apiConfig.useMockApi ? mockApi : quizMakerApi;

export default{
    apiConfig
};

export {
    getQuizzes,
    createQuiz,
    getQuiz,
    getAllQuestions,
    deleteQuiz,
    updateQuiz,
}

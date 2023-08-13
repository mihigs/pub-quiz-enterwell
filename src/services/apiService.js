import * as mockApi from './mockApi'
import * as quizMakerApi from './quizMakerApi'

const useMockApi = import.meta.env.VITE_USE_MOCK_API === 'true';
console.log('useMockApi', useMockApi)

const { getQuizzes, createQuiz, getQuiz, getAllQuestions, deleteQuiz, updateQuiz } = useMockApi ? mockApi : quizMakerApi;

export {
    getQuizzes,
    createQuiz,
    getQuiz,
    getAllQuestions,
    deleteQuiz,
    updateQuiz,
}

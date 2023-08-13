import { configureStore } from '@reduxjs/toolkit'
import { questionsReducer, quizzesReducer } from './reducer.js'

export default configureStore({
  reducer: {
    quizzes: quizzesReducer,
    questions: questionsReducer
  },
})
import { configureStore } from '@reduxjs/toolkit'
import quizzesReducer from './quizzesReducer.js'
import questionsReducer from './questionsReducer.js'

export default configureStore({
  reducer: {
    quizzes: quizzesReducer,
    questions: questionsReducer
  },
})
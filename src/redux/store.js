import { configureStore } from '@reduxjs/toolkit'
import quizzesReducer from './reducer.js'

export default configureStore({
  reducer: {
    quizzes: quizzesReducer,
  },
})
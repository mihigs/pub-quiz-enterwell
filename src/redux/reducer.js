import { createSlice } from '@reduxjs/toolkit'

export const quizzesSlice = createSlice({
  name: 'quizzes',
  initialState: {
    value: [],
  },
  reducers: {
    replaceQuizzes: (state, action) => {
        state.value = action.payload
    },
    newQuiz: (state, action) => {
      state.value = [...state.value, action.payload];
    },
    removeQuiz: (state, action) => {
        state.value = state.value.filter((quiz) => quiz.id !== action.payload);
    },
  },
})
export const { replaceQuizzes, newQuiz, removeQuiz } = quizzesSlice.actions
export default quizzesSlice.reducer
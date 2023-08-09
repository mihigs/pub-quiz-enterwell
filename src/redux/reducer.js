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
    addQuiz: (state, action) => {
      state.value = [...state.value, action.payload];
    },
    removeQuiz: (state, action) => {
        state.value = state.value.filter((quiz) => quiz.id !== action.payload);
    },
  },
})
export const { replaceQuizzes, addQuiz, removeQuiz } = quizzesSlice.actions
export default quizzesSlice.reducer
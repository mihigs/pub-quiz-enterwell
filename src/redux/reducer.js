import { createSlice } from '@reduxjs/toolkit'

export const quizzesSlice = createSlice({
  name: 'quizzes',
  initialState: {
    value: [],
  },
  reducers: {
    replaceQuizzes: (state, action) => {
        state.value = action.payload;
    },
    newQuiz: (state, action) => {
      state.value = [...state.value, action.payload];
    },
    removeQuiz: (state, action) => {
        //Set the 'hidden' property of the quiz to false
        let updatedQuizzes = state.value.map((quiz) => {
            if (quiz.id === action.payload) {
                quiz.hidden = true;
            }
            return quiz;
        });
        state.value = updatedQuizzes;
    },
    updateQuiz: (state, action) => {
        //Update the quiz
        let updatedQuizzes = state.value.map((quiz) => {
            if (quiz.id === action.payload.id) {
                quiz = action.payload;
            }
            return quiz;
        });
        state.value = updatedQuizzes;
    },
  },
})

export const { replaceQuizzes, newQuiz, removeQuiz, updateQuiz } = quizzesSlice.actions
export default quizzesSlice.reducer;
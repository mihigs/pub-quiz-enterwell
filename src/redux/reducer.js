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
    editQuiz: (state, action) => {
        //Update the quiz
        debugger;
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

export const questionsSlice = createSlice({
    name: 'questions',
    initialState: {
      value: [],
    },
    reducers: {
      addQuestionsFromQuizzes: (state, action) => {
        //Get all questions from all quizzes
        let allQuestions = [];
        action.payload.forEach((quiz) => {
          quiz.questions.forEach((question) => {
            allQuestions.push(question);
            });
          });
          //Remove duplicates
          let uniqueQuestions = allQuestions.filter((question, index, self) =>
          index === self.findIndex((t) => (
            t.id === question.id
            ))
            );
            debugger;
        state.value = uniqueQuestions;
      },
      addQuestion: (state, action) => {
        state.value = [...state.value, action.payload];
      },
    },
  })


export const { replaceQuizzes, newQuiz, removeQuiz, editQuiz } = quizzesSlice.actions
export const { addQuestionsFromQuizzes, addQuestion } = questionsSlice.actions
export const quizzesReducer = quizzesSlice.reducer;
export const questionsReducer = questionsSlice.reducer;
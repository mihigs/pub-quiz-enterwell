import { createSlice } from '@reduxjs/toolkit'

export const questionsSlice = createSlice({
    name: 'questions',
    initialState: {
      value: [],
    },
    reducers: { //TODO: Handle errors
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
        state.value = uniqueQuestions;
      },
      addQuestion: (state, action) => {
        state.value = [...state.value, action.payload];
      },
    },
  })


export const { addQuestionsFromQuizzes, addQuestion } = questionsSlice.actions
export default questionsSlice.reducer;
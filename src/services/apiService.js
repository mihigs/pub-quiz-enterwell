const getQuizzes = () => {
  return fetch("http://quiz-maker.apidocs.enterwell.space/quizzes")
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
};

const createQuiz = (quizName) => {
  return fetch("http://quiz-maker.apidocs.enterwell.space/quizzes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: quizName, questions: [] }),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
};

const getQuiz = (quizId) => {
  return fetch(`http://quiz-maker.apidocs.enterwell.space/quizzes/${quizId}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
};

const getAllQuestions = () => {
  return fetch("http://quiz-maker.apidocs.enterwell.space/questions")
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
};

const deleteQuiz = (quizId) => {
  return fetch(`http://quiz-maker.apidocs.enterwell.space/quizzes/${quizId}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
};

const updateQuiz = (quiz) => {
  return fetch(`http://quiz-maker.apidocs.enterwell.space/quizzes/${quiz.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(quiz),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
};

export { getQuizzes, createQuiz, getQuiz, getAllQuestions, deleteQuiz, updateQuiz };

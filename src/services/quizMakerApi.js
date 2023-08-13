const getQuizzes = () => {
  console.log(import.meta.env.VITE_API)
  return fetch(`${import.meta.env.VITE_API}/quizzes`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
};

const createQuiz = (quizName) => {
  return fetch(`${import.meta.env.VITE_API}/quizzes`, {
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
  return fetch(`${import.meta.env.VITE_API}/quizzes/${quizId}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
};

const getAllQuestions = () => {
  return fetch(`${import.meta.env.VITE_API}/questions`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
};

const deleteQuiz = (quizId) => {
  return fetch(`${import.meta.env.VITE_API}/quizzes/${quizId}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
};

const updateQuiz = (quiz) => {
  return fetch(`${import.meta.env.VITE_API}/quizzes/${quiz.id}`, {
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

export { 
  getQuizzes, 
  createQuiz, 
  getQuiz, 
  getAllQuestions, 
  deleteQuiz, 
  updateQuiz, 
};

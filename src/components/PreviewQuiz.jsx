import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Replace the imports with the following line to use the real api
import { getQuiz } from "../services/mockApiService";
// import { getQuiz } from "../services/apiService";

const PreviewQuiz = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [answerVisible, setAnswerVisible] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const navigateTo = useNavigate();

  const goToStep = (step) => {
    setActiveStep(step);
  };

  const handleNext = () => {
    goToStep((prevActiveStep) => prevActiveStep + 1);
    setAnswerVisible(false);
  };

  const handleBack = () => {
    goToStep((prevActiveStep) => prevActiveStep - 1);
    setAnswerVisible(false);
  };

  const handleReset = () => {
    goToStep(0);
    setAnswerVisible(false);
    setQuizStarted(false);
    setLinkCopied(false);
    };

    const handleFinish = () => {
        navigateTo('/');
    }

    const handleCopyLinkClicked = () => {
        navigator.clipboard.writeText(window.location.href);
        setLinkCopied(true);
    }

  useEffect(() => {
    //Get the quiz from the API
    getQuiz(quizId).then((data) => {
      setQuiz(data);
    });
  }, []);

  return (
    <div className="flex items-center h-[100vh] w-full text-2xl">
      {!quizStarted && (
        <div className="ml-auto mr-auto w-4/6 text-center flex-col flex gap-5">
          <div className=" h-[35vh] flex flex-col gap-5">
            <p className="overflow-y-auto">Are you ready to start the quiz?</p>
            {/* Allow users to copy the link to the quiz preview */}
            <div className="w-fit m-auto mt-10 gap-5 flex flex-col">
            <p className="text-xl">Share this link with your friends</p>
            <p onClick={handleCopyLinkClicked} className="overflow-y-auto bg-slate-900 p-3 hover:bg-slate-800">{window.location.href}</p>
            <p className={`text-sm ${linkCopied ? '' : 'invisible'}`}>Link copied!</p>
            </div>
          </div>
          <div>
            <Button onClick={() => setQuizStarted(true)}>Start</Button>
          </div>
        </div>
      )}

      {quizStarted && quiz?.questions?.length > 0 && (
        <div className="ml-auto mr-auto w-4/6 text-center flex-col flex gap-5">
          <div className=" h-[35vh] flex flex-col gap-5 justify-between">
            <p className="overflow-y-auto">
              {quiz?.questions[activeStep]?.question}
            </p>
            <p className={`${answerVisible ? "" : "invisible"} text-4xl mb-2`}>
              {quiz?.questions[activeStep]?.answer}
            </p>
          </div>
          <div>
            {answerVisible && (
              <Button onClick={() => setAnswerVisible(false)}>
                Hide answer
              </Button>
            )}
            {!answerVisible && (
              <Button onClick={() => setAnswerVisible(true)}>
                Show answer
              </Button>
            )}
            <div className="flex justify-center">
              {activeStep !== 0 && <Button onClick={handleBack}>Back</Button>}
              {activeStep !== quiz?.questions?.length - 1 && (
                <Button onClick={handleNext}>Next</Button>
              )}
              {activeStep === quiz?.questions?.length - 1 && (
                <div>
                  <Button onClick={handleReset}>Restart</Button>
                  <Button onClick={handleFinish}>Finish</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviewQuiz;
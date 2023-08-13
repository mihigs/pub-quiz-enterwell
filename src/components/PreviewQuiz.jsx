import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Button } from "@mui/material";

import { getQuiz } from "../services/apiService.js";

const PreviewQuiz = () => {
  const { quizId } = useParams();

  const [quiz, setQuiz] = useState({});
  const [quizStarted, setQuizStarted] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [answerVisible, setAnswerVisible] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const navigateTo = useNavigate();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setAnswerVisible(false);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setAnswerVisible(false);
  };

  const handleReset = () => {
    setActiveStep(0);
    setAnswerVisible(false);
    setQuizStarted(false);
    setLinkCopied(false);
  };

  const handleFinish = () => {
    navigateTo("/");
  };

  const handleCopyLinkClicked = () => {
    //Copy the game link to the clipboard
    let url = window.location.href;
    navigator.clipboard.writeText(url);
    setLinkCopied(true);
  };

  useEffect(() => {
    //Get the quiz from the API
    getQuiz(quizId).then((data) => {
      setQuiz(data);
    });
  }, [quizId]);

  return (
    <div className="flex items-center h-[100vh] w-full text-2xl">
      {/* Initial slide */}
      {!quizStarted && (
        <div className="ml-auto mr-auto md:w-4/6 text-center flex-col flex gap-5">
          <div className="flex flex-col gap-5">
            <p className="overflow-y-auto">Are you ready to start the quiz?</p>
            <div className="w-fit m-auto mt-10 gap-5 flex flex-col">
              <p className="text-xl">Share this link with your friends</p>
              <p
                onClick={handleCopyLinkClicked}
                className="text-sm md:text-md overflow-y-auto bg-slate-900 p-3 hover:bg-slate-800"
              >
                {window.location.href}
              </p>
              <p className={`text-sm ${linkCopied ? "" : "invisible"}`}>
                Link copied!
              </p>
            </div>
          </div>
          <div>
            <Button sx={{fontSize: '2rem'}} onClick={() => setQuizStarted(true)}>Start</Button>
          </div>
        </div>
      )}

      {/* Quiz slides */}
      {quizStarted && quiz?.questions?.length > 0 && (
        <div className="ml-auto mr-auto w-full md:w-4/6 text-center flex-col flex gap-5">
          {/* Question & Answer */}
          <div className="h-[45vh] md:h-[35vh] p-2 flex flex-col gap-5 justify-between">
            <p className="overflow-y-auto text-lg md:text-2xl">
              {quiz?.questions[activeStep]?.question}
            </p>
            <p className={`${answerVisible ? "" : "invisible"} text-4xl mb-2`}>
              {quiz?.questions[activeStep]?.answer}
            </p>
          </div>
          {/* Quiz Controls */}
          <div>
            {answerVisible && (
              <Button sx={{fontSize: '2rem'}} onClick={() => setAnswerVisible(false)}>
                Hide answer
              </Button>
            )}
            {!answerVisible && (
              <Button sx={{fontSize: '2rem'}} onClick={() => setAnswerVisible(true)}>
                Show answer
              </Button>
            )}
            <div className="flex justify-center flex-col">
              {activeStep !== 0 && <Button sx={{fontSize: '2rem'}} onClick={handleBack}>Back</Button>}
              {activeStep !== quiz?.questions?.length - 1 && (
                <Button sx={{fontSize: '2rem'}} onClick={handleNext}>Next</Button>
              )}
              {activeStep === quiz?.questions?.length - 1 && (
                <>
                  <Button sx={{fontSize: '2rem'}} onClick={handleReset}>Restart</Button>
                  <Button sx={{fontSize: '2rem'}} onClick={handleFinish}>Finish</Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviewQuiz;

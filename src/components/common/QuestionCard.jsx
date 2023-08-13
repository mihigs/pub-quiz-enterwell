import PropTypes from "prop-types";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const QuestionCard = ({question, answer, used, onAction}) => {
  const handleAction = () => {
    if(onAction) {
      onAction();
    }
  };

  return (
    <div className="border border-indigo-500 p-3 m-5 rounded-md bg-[#272727]">
      <div className="flex-col p-[1rem]">
        <p className="">Q: {question}</p>
      </div>
      <div className="p-[1rem] flex justify-between items-center">
        <p>A: {answer}</p>
        <div onClick={handleAction}>
          {/* Display remove icon if the question is used, othervise display add icon */}
          {used ? (
            <RemoveCircleIcon sx={{ color: "red", fontSize: 30 }} />
          ) : (
            <AddCircleIcon sx={{ color: "green", fontSize: 30 }} />
          )}
        </div>
      </div>
    </div>
  );
};

QuestionCard.defaultProps = {
  question: "",
  answer: "",
  used: false,
  onAction: () => {},
};

QuestionCard.propTypes = {
  question: PropTypes.string,
  answer: PropTypes.string,
  used: PropTypes.bool,
  onAction: PropTypes.func,
};

export default QuestionCard;

import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useDispatch } from "react-redux";
import { removeQuiz } from "../../redux/reducer";

const QuizCard = ({
    id,
    name,
    questions,
    ...props
}) => {
    const dispatch = useDispatch();

  return (
    <>
      <div className="border border-indigo-500 p-5 m-5 flex justify-between content-center rounded-md">
        <h1 className="font-bold leading-8">{name}</h1>
        <div className="flex gap-4">
          <Button variant="outlined" startIcon={<DeleteIcon />} onClick={ () => dispatch(removeQuiz(id))}>
            Delete
          </Button>
          <Button variant="outlined" startIcon={<EditIcon />}>
            Edit
          </Button>
          <Button variant="outlined" startIcon={<PlayArrowIcon />}>
            Play
          </Button>
        </div>
      </div>
    </>
  );
};

export default QuizCard;

import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeQuiz } from "../../redux/reducer";
import { deleteQuiz } from "../../services/mockApiService";

import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import SimpleDialog from "./SimpleDialog";

const QuizCard = ({
    id,
    name,
    onClick,
    onDelete,
    onPlay,
}) => {
    const dispatch = useDispatch();

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const handleCardClicked = () => {
      if(onClick) {
        onClick(id);
      }
    };
  
    const handleDeleteClicked = (event, id) => {
      event.stopPropagation();
      setDeleteDialogOpen(true);
    };

    const handlePlayClicked = (event, id) => {
      event.stopPropagation();
      if(onPlay) {
        onPlay(id);
      }
    };

    const handleClose = () => {
      setDeleteDialogOpen(false);
    };

  return (
    <>
      <div className="border border-indigo-500 p-5 m-5 flex justify-between content-center rounded-md" onClick={handleCardClicked}>
        <h1 className="font-bold leading-8">{name}</h1>
        <div className="flex gap-4">
          <Button variant="outlined" startIcon={<DeleteIcon />} onClick={ (event) => handleDeleteClicked(event, id)}>
            Delete
          </Button>
          <Button variant="outlined" startIcon={<PlayArrowIcon />} onClick={ (event) => handlePlayClicked(event, id) } >
            Play
          </Button>
        </div>
      </div>

      <SimpleDialog
        open={deleteDialogOpen}
        onClose={handleClose}
        onConfirm={() => onDelete(id)}
      />
    </>
  );
};

export default QuizCard;

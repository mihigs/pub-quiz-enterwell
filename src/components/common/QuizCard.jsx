import { useState } from "react";
import PropTypes from "prop-types";

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
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const handleCardClicked = () => {
      if(onClick) {
        onClick(id);
      }
    };
  
    const handleDeleteClicked = (event) => {
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
      <div className="border border-indigo-500 bg-[#202020] p-5 m-5 flex justify-between content-center rounded-md flex-col sm:flex-row" onClick={handleCardClicked}>
        <h1 className="font-bold leading-8 mb-5 text-center sm:text-left sm:mb-0">{name}</h1>
        <div className="flex gap-4 justify-center">
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

QuizCard.defaultProps = {
  id: "",
  name: "",
  onClick: () => {},
  onDelete: () => {},
  onPlay: () => {},
};

QuizCard.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  onClick: PropTypes.func,
  onDelete: PropTypes.func,
  onPlay: PropTypes.func,
};

export default QuizCard;

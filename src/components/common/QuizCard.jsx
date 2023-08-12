import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useDispatch } from "react-redux";
import { removeQuiz } from "../../redux/reducer";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import SimpleDialog from "./SimpleDialog";
import { deleteQuiz } from "../../services/mockApiService";

const QuizCard = ({
    id,
    name,
    questions,
    ...props
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
    const handleClickOpen = (event, id) => {
      event.stopPropagation();
      setDeleteDialogOpen(true);
    };

    const handlePlayClicked = (event, id) => {
      event.stopPropagation();
      navigate(`/quiz/${id}/preview`);
    };

    const handleDelete = (id) => {
      deleteQuiz(id).then((response) => {
        //todo: check if response successful
        dispatch(removeQuiz(id));
      });
    };
  
    const handleClose = () => {
      setDeleteDialogOpen(false);
    };

  return (
    <>
      <div className="border border-indigo-500 p-5 m-5 flex justify-between content-center rounded-md" onClick={ () => navigate(`/quiz/${id}/${name}/edit`) }>
        <h1 className="font-bold leading-8">{name}</h1>
        <div className="flex gap-4">
          <Button variant="outlined" startIcon={<DeleteIcon />} onClick={ (event) => handleClickOpen(event, id)}>
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
        onConfirm={() => handleDelete(id)}
      />
    </>
  );
};

export default QuizCard;

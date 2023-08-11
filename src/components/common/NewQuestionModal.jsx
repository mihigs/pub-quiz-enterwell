import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { useState } from 'react';

const NewQuestionModal = ({ open, onClose, onSubmit }) => {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const handleClose = () => {
        if(onClose){
            onClose();
        }
    };

    const handleSubmit = (name) => {
        if(onSubmit){
            onSubmit(name);
        }
        handleClose();
    };

    const handleQuestionChange = (event) => {
        setQuestion(event.target.value);
    }

    const handleAnswerChange = (event) => {
        setAnswer(event.target.value);
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>New Question</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="question"
                    label="Question"
                    type="text"
                    fullWidth
                    value={question}
                    onChange={handleQuestionChange}
                    multiline
                    inputProps={{
                        style: {
                          height: "50px",
                        },
                      }}
                />
                <TextField
                    margin="dense"
                    id="answer"
                    label="Answer"
                    type="text"
                    fullWidth
                    value={answer}
                    onChange={handleAnswerChange}
                    multiline
                    inputProps={{
                        style: {
                          height: "50px",
                        },
                      }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleSubmit({question, answer})}>Create</Button>
                <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}

export default NewQuestionModal;
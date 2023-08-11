import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { useState } from 'react';

const NameInputDialog = ({ open, onClose, onSubmit }) => {
    const [name, setName] = useState("");

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

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Enter quiz name</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Quiz name"
                    type="text"
                    fullWidth
                    value={name}
                    onChange={handleNameChange}
                    onKeyUp={(event) => {
                        if (event.key === 'Enter') {
                            handleSubmit(name);
                        }
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleSubmit(name)}>Create</Button>
                <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}

export default NameInputDialog;
import { Dialog, DialogTitle, Button } from "@mui/material";

const SimpleDialog = ({ onClose, open, onConfirm, ...props }) => {
  const handleClose = () => {
    onClose();
  };

  const handleConfirm = () => {
    onConfirm();
    handleClose();
  };

  const handleCancel = () => {
    handleClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Delete quiz?</DialogTitle>
      <Button onClick={handleConfirm}>Yes</Button>
      <Button onClick={handleCancel}>No</Button>
    </Dialog>
  );
};

export default SimpleDialog;

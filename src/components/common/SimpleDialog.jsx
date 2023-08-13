import { Dialog, DialogTitle, Button } from "@mui/material";

const SimpleDialog = ({ open, dialogMessage, onClose, onConfirm }) => {
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
      <DialogTitle>{dialogMessage}</DialogTitle>
      <Button onClick={handleConfirm}>Yes</Button>
      <Button onClick={handleCancel}>No</Button>
    </Dialog>
  );
};

SimpleDialog.defaultProps = {
  open: false,
  dialogMessage: "Are you sure?",
  onClose: () => {},
  onConfirm: () => {},
};

export default SimpleDialog;

import { useState } from 'react';

const useModal = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return {
    open,
    handleClickOpen,
    handleClose
  };
};

export default useModal;

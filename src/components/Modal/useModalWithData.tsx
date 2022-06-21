import { useState } from 'react';
import useModal from './useModal';

const useModalWithData = (initialSelected = null) => {
  const { open, handleClickOpen, handleClose } = useModal();
  const [selected, setSelected] = useState(initialSelected);
  const setModalState = (state: boolean) => {
    handleClickOpen();
    if (state === false) {
      setSelected(null);
    }
  };
  return {
    open,
    handleClickOpen,
    selected,
    setSelected,
    setModalState,
    handleClose
  };
};

export default useModalWithData;

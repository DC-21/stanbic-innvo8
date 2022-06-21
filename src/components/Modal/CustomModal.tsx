import * as React from 'react';
import withStyles from '@mui/styles/withStyles';
import Dialog from '@mui/material/Dialog';
import MuiDialogContent from '@mui/material/DialogContent';
import ModalTitle from './ModalTitle';

interface ModalProps {
  open: boolean;
  title?: string;
  subTitle?: string;
  fullScreen?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  handleClose: () => void;
}

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

const CustomModal: React.FC<React.PropsWithChildren<ModalProps>> = (props) => {
  const { children, open, title, subTitle, fullScreen, maxWidth, handleClose } =
    props;

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        fullWidth
        maxWidth={maxWidth}
        onClose={handleClose}
        open={open}
      >
        {title ? (
          <ModalTitle subheader={subTitle || ''} handleClose={handleClose}>
            {title}
          </ModalTitle>
        ) : null}

        <DialogContent dividers>{children}</DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomModal;

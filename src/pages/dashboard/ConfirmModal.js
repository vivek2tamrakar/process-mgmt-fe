import * as React from 'react';
import { Button, IconButton } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { CloseOutlined } from '@ant-design/icons';

const ConfirmModal = ({ deleteModal, SetDeleteModal, membershipdata, deleteplan, title }) => {
  const handleClose = () => {
    SetDeleteModal(false);
  };
  const DeleteMembershipplan = () => {
    deleteplan();
    SetDeleteModal(false);
  };

  return (
    <>
      <Dialog open={deleteModal} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle sx={{ m: 0, p: 2, maxWidth: { xs: 400, lg: 400 }, width: { xs: '100%', lg: 350 } }} id="customized-dialog-title">
          <h3 style={{ marginTop: '0px', marginBottom: '0px' }}>Are You Sure Want to Delete </h3>
          <h3 style={{ marginTop: '0px' }}>{title} ?</h3>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500]
            }}
          >
            <CloseOutlined />
          </IconButton>
        </DialogTitle>

        <DialogActions>
          <Button variant="contained" onClick={DeleteMembershipplan}>
            Yes
          </Button>
          <Button variant="contained" onClick={handleClose} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default ConfirmModal;

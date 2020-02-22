import React from 'react';
import { Snackbar, SnackbarContent } from '@material-ui/core';

const getBackgroundColor = variant => {
  switch (variant) {
    case 'success':
      return 'green';
    case 'error':
      return 'red';
    case 'info':
      return 'blue';
    default:
      return 'black';
  }
};

const index = ({
  classes,
  className,
  message,
  onClose,
  variant,
  open,
  ...other
}) => (
  <Snackbar
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right'
    }}
    open={open}
    autoHideDuration={3000}
    onClose={onClose}
  >
    <SnackbarContent
      style={{
        backgroundColor: getBackgroundColor(variant)
      }}
      aria-describedby='client-snackbar'
      message={<span id='client-snackbar'>{message}</span>}
      {...other}
    />
  </Snackbar>
);

export default index;

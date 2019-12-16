import React, { Fragment, useState } from 'react';

// import Dialog from 'material-ui/Dialog';
import Dialog from '@material-ui/core/Dialog';
// You may make a dialog responsively full screen using useMediaQuery. https://material-ui.com/es/components/dialogs/
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// CUSTOMIZAR ESTILOS EN MUI
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        minWidth: '0'
      },
      text: {
        width: 'auto',
        margin: '0',
        padding: '0',
        color: 'rgb(109,109,109)',
        background: 'transparent',
        textDecoration: 'underline',
        '&:hover': {
          color: 'rgb(109,109,109)',
          background: 'transparent',
          textDecoration: 'underline'
        }
      }
    }
  }
});


export default function ButtonCustom(props) {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');
  const { text } = props;

  const handleClickOpen = scrollType => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <Button
          onClick={handleClickOpen('paper')}
        >
          Leer
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
        >
          <DialogTitle id="scroll-dialog-title">
            SOME TITLE
          </DialogTitle>
          <DialogContent dividers={scroll === 'paper'}>
            <DialogContentText>
                SOME CONTENT
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose} color="primary">
            Cancel
            </Button>
          </DialogActions>

        </Dialog>
      </ThemeProvider>
    </Fragment>
  );
}

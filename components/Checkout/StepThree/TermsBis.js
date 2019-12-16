import _ from 'lodash';
import React, { Fragment, useState, useEffect } from 'react';

import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// CUSTOMIZAR ESTILOS EN MUI
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import { api } from '../../../serverServices';

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        minWidth: '0',
        textTransform: 'none'
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

export default function TermsBis() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState({});
  const [scroll, setScroll] = useState('paper');

  const getContent = (key) => {
    api.contents.getByKey(key, (error, res) => {
      if (res) {
        const newContent = res.data;
        setContent(newContent);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    getContent('terms-and-conditions');
  });

  const handleClickOpen = scrollType => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (loading) return null;

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
            <div className="app-legal-info">
              <h1 className="app-legal-title-h1">{ _.get(content, 'title.es', '') }</h1>
            </div>
          </DialogTitle>
          <DialogContent dividers={scroll === 'paper'}>
            <DialogContentText>
              <div
                className="app-legal-info app-legal-more_info"
                dangerouslySetInnerHTML={{ __html: _.get(content, 'longDesc.es', '') }}
              />
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose} color="primary">
            Cerrar
            </Button>
          </DialogActions>

        </Dialog>
      </ThemeProvider>
      {/* <span onClick={onOpen}>Leer</span>
      <Dialog
        actions={actions}
        modal={false}
        open={open}
        onRequestClose={onClose}
        autoScrollBodyContent
      >

        <section className="app-legal">

          <div className="app-legal-info">
            <h1 className="app-legal-title-h1">{ _.get(content, 'title.es', '') }</h1>
          </div>

          <div
            className="app-legal-info app-legal-more_info"
            dangerouslySetInnerHTML={{ __html: _.get(content, 'longDesc.es', '') }}
          />

        </section>

      </Dialog> */}
    </Fragment>
  );
}

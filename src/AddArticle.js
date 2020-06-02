import React, { useState } from 'react'
import Dexie from 'dexie'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Form from './FormAddArticle.js'
import {Link } from 'react-router-dom';
import store from 'store';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
    textAlign: 'center',
  },
}));
const AddArticle = () => {
  const classes = useStyles();
  return (
    <div>
    {!store.get('loggedIn') && 
      <div>sorry, You not logged</div>
    }
    {
      store.get('loggedIn') &&
   
    <MuiThemeProvider>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" onClick={()=>window.location.href='/home'} style={{textAlign:'left'}}>Home</Button>
          <Typography variant="h6" className={classes.title}>
            Add Article
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={{ margin: '2rem auto', width: '500px' }}>
       <Form/>
    </div>
    </MuiThemeProvider>}
    </div>
    
  )
}

export default AddArticle
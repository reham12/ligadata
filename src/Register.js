import React, { useState } from 'react'
import Dexie from 'dexie'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Form from './FormRegister.js'
import {Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
    textAlign: 'center',
  },
}));
const App = () => {
  const [open, setOpen] = useState(true)
  const classes = useStyles();

  return (
    <div>
   
    <MuiThemeProvider>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            register
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={{ margin: '2rem auto', width: '300px' }}>
       <Form/>
       
    </div>
    <div style={{flexGrow:1 , textAlign: 'center'}}>
    <Link to={'/'} className="nav-link"> Already registered.Go to Login </Link>
    
    </div>

    </MuiThemeProvider>
    </div>
    
  )
}

export default App
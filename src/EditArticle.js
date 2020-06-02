import React, { Component } from 'react'
import Dexie from 'dexie'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Form from './FormEditArticle.js'
import {Link } from 'react-router-dom';
import store from 'store';
const db = new Dexie('MyDatabase');
const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
    textAlign: 'center',
  },
}));
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    
  }
  render() {
 
  return (

     <MuiThemeProvider>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{flexGrow: 1,textAlign: 'center',}}>
            Edit Article
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={{ margin: '2rem auto', width: '500px' }}>
        <Form  id={this.props.match.params.id}/>
    </div>
    </MuiThemeProvider> 

  )
}
}

export default App

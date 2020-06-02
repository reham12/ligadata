import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Form from './Form'
import ListArticles from './ListArticles'
import {Link } from 'react-router-dom';
import { withRouter  } from 'react-router';

import store from 'store';

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
    textAlign: 'center',
  },
  logout:{
    textAlign:'left'
  },
  addArticle:{
    textAlign:'right'
  }
}));
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }
  componentDidMount() {
     
  }
  handleLogout = async (e) => {
    e.preventDefault()
      store.remove('loggedIn');
      this.props.history.push("/");
  }
  render() {
 
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
          
          <Button color="inherit" onClick={this.handleLogout} style={{textAlign:'left'}}>logout</Button>

          <Typography variant="h6" style={{flexGrow: 1,textAlign: 'center',}}>
            Home
          </Typography>
          <Button color="inherit" onClick={()=>this.props.history.push("/add_article")} style={{textAlign:'right'}}>add article</Button>

            
        </Toolbar>
      </AppBar>
      <ListArticles history={this.props.history}/>
    
    </MuiThemeProvider> 
    }
   
    </div>
    
  )
}
}

export default App
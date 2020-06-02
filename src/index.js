import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Home from './Home';
import Register from './Register';
import AddArticle from './AddArticle';
import EditArticle from './EditArticle';

import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
ReactDOM.render(
  <React.StrictMode>
   <Router>
        <div>
          <Switch>
              <Route exact path='/' component={App} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/home' component={Home} />
              <Route exact path='/add_article' component={AddArticle} />
              <Route exact path='/edit_article/:id' component={EditArticle} />
           
          </Switch>
        </div>
      </Router>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

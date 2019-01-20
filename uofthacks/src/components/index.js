import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import EditExp from './components/EditExp';
import CreateExp from './components/CreateExp';
import ShowExp from './components/ShowExp';
import EditSkl from './components/EditSkl';
import CreateSkl from './components/CreateSkl';
import ShowSkl from './components/ShowSkl';
import ShowCnt from './components/ShowCnt';
import EditCnt from './components/EditCnt';
ReactDOM.render(
  <Router>
      <div>
        <Route exact path='/' component={App} />
        <Route path='/editexp/:id' component={EditExp} />
        <Route path='/editskl/:id' component={EditSkl} />
        <Route path='/createexp' component={CreateExp} />
        <Route path='/createskl' component={CreateSkl} />
        <Route path='/showexp/:id' component={ShowExp} />
        <Route path='/showskl/:id' component={ShowSkl} />
        <Route path='/showcnt/:id' component={ShowCnt} />
        <Route path='/editcnt/:id' component={EditCnt} />
      </div>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

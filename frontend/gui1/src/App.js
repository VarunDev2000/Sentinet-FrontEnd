import React from 'react';
import { Router,Route,Switch } from 'react-router-dom'; 
import history from './components/common/history';
import './App.css';

import Firstpage from './components/IndexPage/index';
import MapVisualize from './components/MapVisualize';
import ChartVisualize from './components/ChartVisualize';


function App() {
  return (
    <div className="App">
      <Router history = {history}>
        <Switch>
        <Route exact path ='/' component = {Firstpage}/>
        <Route exact path ='/map' component = {MapVisualize}/>
        <Route exact path ='/graph' component = {ChartVisualize}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

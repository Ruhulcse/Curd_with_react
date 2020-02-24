import React from 'react';
import './App.css';
import Form from './Components/Form';
import Show from './Components/Show';
import Update from './Components/Update'
import {BrowserRouter as Router, Route} from 'react-router-dom';

function App() {
  
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Form}/>
        <Route exact path="/show" component = {Show } />
        <Route exact path="/update/:id" component = {Update }/>
      </Router>
    </div>
  );
}

export default App;

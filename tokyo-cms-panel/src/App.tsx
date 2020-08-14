// import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Editor from './pages/Editor';

const App = () => {
  return (
    <BrowserRouter>
      <Route path='/' exact component={Auth}></Route>
      <Route path='/editor' exact component={Editor}></Route>
      <Route path='/dashboard' exact component={Dashboard}></Route>
    </BrowserRouter>
  );
}

export default App


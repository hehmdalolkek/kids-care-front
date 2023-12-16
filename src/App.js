import React from 'react';
import './App.css';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './layout/Navbar';
import Home from './pages/Home';
import EditGroup from './groups/EditGroup';
import AddGroup from './groups/AddGroup';
import ViewGroup from './groups/ViewGroup';
import AddChild from './children/AddChild';

function App() {
  return (
    <div className="App min-vh-100">
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/editgroup/:id' element={<EditGroup/>} />
          <Route exact path='/group/:id' element={<ViewGroup/>} />
          <Route exact path='/addgroup' element={<AddGroup/>} />
          <Route exact path='/addchild/:id' element={<AddChild/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

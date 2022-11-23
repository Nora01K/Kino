import React from 'react';
import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
<<<<<<< HEAD
import Login from './components/Login';
import OverviewView from './views/OverviewView';
import SignUp from './components/SignUp';

function App() {
  return (
      <BrowserRouter>
        <div>
          <Routes>     
            <Route path="/" element={<OverviewView />} />     
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
          </Routes>
        </div>
      </BrowserRouter>      
=======
import Header from './components/Header';
import OverviewView from './views/OverviewView';

function App() {
  return (
    <BrowserRouter>
    <div> 
      <Header></Header>
<<<<<<< HEAD
=======
      <nav>
        <ul>
          <li>
            <Link to="/">OverviewView</Link>
          </li>
          <li>
            <Link to="/header">Header</Link>
          </li>
        </ul>
      </nav>
>>>>>>> a3a3d54 (feat: header first setup)
      <Routes>     
        <Route path="/" element={<OverviewView />} />     
        <Route path="/header" element={<Header />} />
      </Routes>
    </div>
  </BrowserRouter>      
>>>>>>> 1557c76 (feat: established route and first styles)
  );
}

export default App;

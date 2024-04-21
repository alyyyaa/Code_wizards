import React from 'react'
import ReactDOM from 'react-dom'
import Main from './pages/Main';
import Login from './pages/Login';
import Application from './pages/Application';
import New_requests from './pages/New_requests';
import Requests_in_work from './pages/Requests_in_work';
import Completed_requests from './pages/Completed_requests';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Appeals from './pages/Appeals'

function App() {
 // <Main/>
  return (
    <Completed_requests/>
 //   <Router>
  //    <div>
    //    <Routes>
      //    <Route path="/" element = {<Main/>}/>
        //  <Route path="/login" element = {<Login/>}/>
         // <Route path="/application" element = {<Application/>}/>
         // <Route path="/appeals" element = {<Appeals/>}/>
         // <Route path="/new_requests" element = {<New_requests/>}/>
         // <Route path="/requests_in_work" element = {<Requests_in_work/>}/>
      //  </Routes>
     // </div>
   // </Router>
  );
 }
 export default App;

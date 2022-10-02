import './App.css';
import React from 'react';
import { Nav } from './UI';
import { Route, Routes, BrowserRouter } from "react-router-dom";

import DetailGraph from './components/DetailGraph';
import InitialPage from './components/InitialPage'
import Login from "./components/Login";
import FindPassword from './components/FindPassword';
import Register from './components/Register';
import MainFeed from './components/MainFeed';
import Footer from './UI/Footer';

const App =()=>{
  const isLogin = false; //로그인 여부
// const isLogin = true;

  return (
    <div id="root">
      <BrowserRouter>
          <Nav pageTitle="오늘의 일기" Auth={isLogin} />
        <div id="contentPage">
          <Routes>
            <Route exact path="/" element={<InitialPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/mainFeed" element={<MainFeed />} />
            <Route path="/findPw" element={<FindPassword/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/Diary/detail" element={<DetailGraph/>}/>
          </Routes>
        </div>
          <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
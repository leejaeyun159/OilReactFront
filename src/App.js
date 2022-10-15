import './App.css';
import React from 'react';
import { Nav } from './UI';
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Footer from './UI/Footer';

import Calendar from './components/Calendar';
import DetailGraph from './components/DetailGraph';
import FindPassword from './components/FindPassword';
import InitialPage from './components/InitialPage'
import Login from "./components/Login";
import MainFeed from './components/MainFeed';
import Register from './components/Register';
import SearchingPage from './components/SearchingPage';
import FindPasswordSend from './components/FindPasswordSend';
import FAQ from './components/FAQ';
import DeleteAccount from './components/DeleteAccount';

const App =()=>{
  // const isLogin = false; //로그인 여부
const isLogin = true;

  return (
    <BrowserRouter>
      <Nav pageTitle="오늘의 일기" Auth={isLogin} />
      <div id="contentPage">
        <Routes>
          <Route path="/Calendar" element={<Calendar />} />
          <Route path="/Diary/detail" element={<DetailGraph />} />
          <Route path="/findPw" element={<FindPasswordSend />} />
          <Route path="/ChangePw" element={<FindPassword />} />
          <Route exact path="/" element={<InitialPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mainFeed" element={<MainFeed />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<SearchingPage />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/delAccount" element={<DeleteAccount />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
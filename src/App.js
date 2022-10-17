import './App.css';
import React, { useContext } from 'react';
import { Nav, Footer } from './UI';
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
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
import DeleteAccount from './components/DeleteAccount'
import AuthContext from './store/oil-context';

const App =()=>{
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn
  return (
    <BrowserRouter>
      <Nav pageTitle="오늘의 일기" />
      <div id="contentPage">
        <Routes>
          {!isLoggedIn && <Route path="/findPw" element={<FindPasswordSend />} />}
          {!isLoggedIn && <Route exact path="/" element={<InitialPage />} /> }
          {!isLoggedIn && <Route path="/login" element={<Login />} /> }
          {!isLoggedIn && <Route path="/register" element={<Register />} /> }
          {/* 인증 안했을 시에 나오는 창 */}
          
          {isLoggedIn && <Route path="/authfindPw" element={<FindPasswordSend />} />}
          {isLoggedIn && <Route path="/changePw" element={<FindPassword />} />}
          {isLoggedIn && <Route path="/calendar" element={<Calendar />} />}
          {isLoggedIn && <Route path="/diarydetail" element={<DetailGraph />} />}
          {isLoggedIn && <Route path="/mainFeed" element={<MainFeed />} />}
          {isLoggedIn && <Route path="/search" element={<SearchingPage />} />}
          {isLoggedIn && <Route path="/faq" element={<FAQ />} />}
          {isLoggedIn && <Route path="/delAccount" element={<DeleteAccount />} />}
          {/* 인증했을 시에 나오는 창 */}

          <Route path="/*" 
          element={isLoggedIn?
          <Navigate to ="/mainFeed" replace={true}/>
          :<Navigate to ="/login" replace={true}/>}/>
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
import {
  OilCalendar,
  DetailGraph,
  FindPassword,
  InitialPage,
  Login,
  MainFeed,
  Register,
  SearchingPage,
  Statistics,
  FindPasswordSend,
  FAQ,
  DeleteAccount,
} from "./components";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import React, { useContext } from "react";
import { Nav, Footer } from "./UI";
import ChannelService from "./API/ChannelService";
import AuthContext from "./store/oil-context";
import "./App.css";

const App = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const location = useLocation();
  if (isLoggedIn && location.pathname === "/faq") {
    const chennel = ChannelService.boot({
      pluginKey: "5a4da9d3-9851-4899-8536-71ca218ccd42",
      profile: {
        name: localStorage.getItem("USERNAME"),
      },
    });
  } else {
    const chennel = ChannelService.shutdown({});
  }
  return (
    <>
      <Nav />
      <TransitionGroup component="div" className="contentPage">
        <CSSTransition
          key={location.pathname}
          timeout={500}
          classNames="page"
          unmountOnExit
        >
          <Routes>
            {!isLoggedIn && (
              <Route path="/findPw" element={<FindPasswordSend />} />
            )}
            {!isLoggedIn && (
              <Route path="/changePw" element={<FindPassword />} />
            )}
            {!isLoggedIn && <Route exact path="/" element={<InitialPage />} />}
            {!isLoggedIn && <Route path="/login" element={<Login />} />}
            {!isLoggedIn && <Route path="/register" element={<Register />} />}
            {/* 인증 안했을 시에 나오는 창 */}

            {isLoggedIn && (
              <Route path="/authfindPw" element={<FindPasswordSend />} />
            )}
            {isLoggedIn && (
              <Route path="/authchangePw" element={<FindPassword />} />
            )}
            {isLoggedIn && <Route path="/calendar" element={<OilCalendar />} />}
            {isLoggedIn && (
              <Route path="/diarydetail" element={<DetailGraph />} />
            )}
            {isLoggedIn && <Route path="/mainFeed" element={<MainFeed />} />}
            {isLoggedIn && <Route path="/search" element={<SearchingPage />} />}
            {isLoggedIn && <Route path="/faq" element={<FAQ />} />}
            {isLoggedIn && (
              <Route path="/statistics" element={<Statistics />} />
            )}
            {isLoggedIn && (
              <Route path="/delAccount" element={<DeleteAccount />} />
            )}
            {isLoggedIn && (
              <Route path="./search" element={<SearchingPage />} />
            )}
            {/* 인증했을 시에 나오는 창 */}

            <Route
              path="/*"
              element={
                isLoggedIn ? (
                  <Navigate to="/mainFeed" replace={true} />
                ) : (
                  <Navigate to="/login" replace={true} />
                )
              }
            />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
      <Footer />
    </>
  );
};

export default App;

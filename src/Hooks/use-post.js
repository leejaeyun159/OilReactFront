import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import OilContext from "../store/oil-context";
import Swal from "sweetalert2";
import qs from "qs";

const usePost = () => {
  const [isResponse, setIsResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(OilContext);
  const TOKEN = authCtx.token;
  const navigate = useNavigate();
  const sendRequest = (requsetBody, mode, close, onPost) => {
    setIsLoading(true);
    let postRequestPayload = {};

    switch (mode) {
      case "emailSend": //회원가입 ,비밀번호 찾기 이메일 전송
        postRequestPayload = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: qs.stringify({
            email: requsetBody.email ? requsetBody.email : "",
            type: requsetBody.type ? requsetBody.type : "",
          }),
        };
        break;
      case "register": //회원가입
        postRequestPayload = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: qs.stringify({
            email: requsetBody.email ? requsetBody.email : "",
            password: requsetBody.password ? requsetBody.password : "",
            nickname: requsetBody.nickname
              ? requsetBody.nickname
              : "익명" + Math.floor(Math.random() * 99999),
          }),
        };
        break;
      case "login":
        postRequestPayload = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: qs.stringify({
            email: requsetBody.email ? requsetBody.email : "",
            password: requsetBody.password ? requsetBody.password : "",
          }),
        };
        break;
      case "postDiary":
        postRequestPayload = {
          headers: {
            Authorization: "Bearer " + TOKEN,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: qs.stringify({
            title: requsetBody.title ? requsetBody.title : "",
            content: requsetBody.content ? requsetBody.content : "",
            weather: requsetBody.weather ? requsetBody.weather : "",
          }),
        };
        break;
      default:
        postRequestPayload = {};
    }
    fetch(requsetBody.url, {
      method: "POST",
      redirect: "follow",
      headers: postRequestPayload.headers,
      body: postRequestPayload.body,
    })
      .then((res) => res.json())
      .then((res) => {
        setIsResponse(res);
        if (mode === "emailSend") {
          Swal.fire({
            title: res.success ? "이메일 전송" : "에러!",
            text: res.success ? "인증번호가 전송되었습니다" : res.message,
            icon: res.success ? "success" : "error",
            confirmButtonColor: "#002560",
            confirmButtonText: "확인",
          });
          localStorage.setItem("AUTHCODE", res.data);
        } else if (mode === "login") {
          Swal.fire({
            title: res.success ? "환영합니다" : "에러!",
            text: res.success ? "오늘의 감정을 남겨보세요" : res.message,
            icon: res.success ? "success" : "error",
            confirmButtonColor: "#002560",
            confirmButtonText: "확인",
          });
          const expiractionTime = new Date(new Date().getTime() + 10800000);
          authCtx.login(res.data.token, expiractionTime.toISOString());
          localStorage.setItem("USERNAME", res.data.user.nickname);
        } else if (mode === "postDiary") {
          Swal.fire({
            title: res.success ? "게시물 등록" : "에러!",
            text: res.success ? "정상적으로 등록되었습니다" : res.message,
            icon: res.success ? "success" : "error",
            confirmButtonColor: "#002560",
            confirmButtonText: "확인",
          });
          if (res.success) {
            close();
            setTimeout(() => onPost(), 2000);
          }
        } else if (mode === "register") {
          if (res.success) {
            Swal.fire({
              title: "가입완료",
              text: "로그인 후 감정을 남겨보세요",
              icon: "success",
              confirmButtonColor: "#002560",
              confirmButtonText: "확인",
            });
            navigate("/login", { replace: true });
          } else {
            Swal.fire({
              title: "에러",
              text: res.message,
              icon: "error",
              confirmButtonColor: "#002560",
              confirmButtonText: "확인",
            });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };
  return {
    sendRequest,
    isResponse,
    isLoading,
  };
};

export default usePost;

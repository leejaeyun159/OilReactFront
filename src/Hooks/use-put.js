import { useState, useContext } from "react";
import OilContext from "../store/oil-context";
import Swal from "sweetalert2";
import qs from "qs";

const usePut = () => {
  const [isResponse, setIsResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(OilContext);
  const TOKEN = authCtx.token;

  const sendRequest = (requsetBody, mode, close, onPost) => {
    setIsLoading(true);
    let putRequestPayload = {};

    switch (mode) {
      case "passwordChange": //회원가입 ,비밀번호 찾기 이메일 전송
        putRequestPayload = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: qs.stringify({
            email: requsetBody.email ? requsetBody.email : "",
            password: requsetBody.password ? requsetBody.password : "",
          }),
        };
        break;
      case "putDiary":
        putRequestPayload = {
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
        putRequestPayload = {};
    }
    fetch(requsetBody.url, {
      method: "PUT",
      redirect: "follow",
      headers: putRequestPayload.headers,
      body: putRequestPayload.body,
    })
      .then((res) => res.json())
      .then((res) => {
        setIsResponse(res);
        if (mode === "passwordChange")
          Swal.fire({
            title: res.success ? "비밀번호 변경" : "에러!",
            text: res.success
              ? "성공적으로 변경되었습니다"
              : "처음부터 다시 시도해주세요",
            icon: res.success ? "success" : "error",
            confirmButtonColor: "#002560",
            confirmButtonText: "확인",
          });
        else if (mode === "putDiary") {
          Swal.fire({
            title: res.success ? "게시물 수정" : "에러!",
            text: res.message,
            icon: res.success ? "success" : "error",
            confirmButtonColor: "#002560",
            confirmButtonText: "확인",
          });
          if (res.success) {
            close();
            setTimeout(() => onPost(), 2000);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(setIsLoading(false));
  };
  return {
    sendRequest,
    isResponse,
    isLoading,
  };
};

export default usePut;

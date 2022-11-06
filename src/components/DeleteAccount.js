import styled from "./DeleteAccount.module.css";
import { useState, useCallback, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "../UI";
import AuthContext from "../store/oil-context";
import Swal from "sweetalert2";
import LinearProgress from "@mui/material/LinearProgress";
import qs from "qs";

const DeleteAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const nick = localStorage.getItem("USERNAME");
  const AuthCtx = useContext(AuthContext);
  const TOKEN = AuthCtx.token;
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const naviate = useNavigate();

  const deleteRequestPayload = {
    headers: {
      Authorization: "Bearer " + TOKEN,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  const deleteAccHandler = useCallback(async () => {
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);
    try {
      const getFetch = await fetch(
        "http://54.64.27.138:8080/api/users/account",
        {
          method: "DELETE",
          redirect: "follow",
          headers: deleteRequestPayload.headers,
          body: qs.stringify({
            email: enteredEmail,
            password: enteredPassword,
          }),
        }
      );
      const response = getFetch.json();
      Swal.fire({
        title: "삭제완료",
        text: response.message,
        icon: "success",
        confirmButtonColor: "#002560",
        confirmButtonText: "확인",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "에러",
        text: error,
        icon: "error",
        confirmButtonColor: "#002560",
        confirmButtonText: "확인",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <form className={styled.DelBox}>
      <span>
        <h2>회원탈퇴</h2>
        <h4>개인정보확인</h4>
      </span>
      <h4>아쉬운 마음입니다.</h4>
      <p>
        {` ${nick} 회원님의 소중한 정보를 안전하게 보호하기 위해 이메일과 비밀번호를 다시
          한번 입력해주시기 바랍니다. 입력하신 정보는 회원탈퇴 이외의 목적으로 사용하지 않습니다.`}
      </p>

      <TextField
        place="이메일을 입력하세요"
        type="email"
        inputRef={emailInputRef}
      />
      <TextField place="⦁⦁⦁⦁⦁⦁⦁⦁" type="password" inputRef={passwordInputRef} />
      <div>
        <Button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            Swal.fire({
              title: "계정 삭제",
              text: "정말로 삭제하시겠습니까?",
              icon: "question",
              showCancelButton: true,
              confirmButtonColor: "grey",
              cancelButtonColor: "#002560",
              confirmButtonText: "삭제",
              cancelButtonText: "취소",
            }).then((result) => {
              if (result.isConfirmed) {
                deleteAccHandler();
                AuthCtx.logout();
              }
            });
          }}
          child="탈퇴"
          padding="10"
          bgcolor="grey"
        />
      </div>
      {isLoading && <LinearProgress sx={{ m: 2 }} />}
    </form>
  );
};

export default DeleteAccount;

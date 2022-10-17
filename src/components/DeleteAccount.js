import { useState } from "react";
import styled from "./DeleteAccount.module.css";
import { Button, TextField } from "../UI";

const DeleteAccount = () => {
  const [deleteAcc, setDeleteAcc] = useState(false);
  const deleteAccHandler = () => {
    setDeleteAcc(true);
  };

  const cancelAccHandler = () => {
    console.log(deleteAcc);
    setDeleteAcc(false);
  };

  return (
    <form className={styled.DelBox}>
        <h2>회원탈퇴</h2>
        <h3> 개인정보확인</h3>
        <h4>아쉬운 마음입니다.</h4>
        <p>
          {` 회원님의 소중한 정보를 안전하게 보호하기 위해 이메일과 비밀번호를 다시
          한번 입력해주시기 바랍니다.`}</p>
        <p>{` 입력하신 정보는 회원탈퇴 이외의 목적으로 사용하지 않습니다.`}</p>

        <TextField place="이메일을 입력하세요" type="email"/>
        <TextField place="⦁⦁⦁⦁⦁⦁⦁⦁" type="password"/>
        <span>
          <Button type="submit" onCancel={cancelAccHandler} child="탈퇴" padding="10" bgcolor="grey"/>
          <Button type="submit" onCancel={cancelAccHandler} child="취소" padding="10"/>
        </span>
    </form>
  );
};

export default DeleteAccount;

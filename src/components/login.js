import styled from './Login.module.css';
import { TextField, Button, Card } from "../UI";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className={styled.div}>
      <img src="/asset/BigLogo.png" alt="mainLogo"></img>
      <div>
        <Card mxWidth="350">
          <TextField place="이메일을 입력하세요" type="text" />
          <TextField place="⦁⦁⦁⦁⦁⦁⦁⦁" type="password" />
          <Button type="submit" child="로그인" padding="10" />
        </Card>
        <Card>
          <Link to="/findPW">비밀번호 찾기</Link>
          <Link to="/register">회원가입</Link>
        </Card>
      </div>
    </div>
  );
};

export default Login;

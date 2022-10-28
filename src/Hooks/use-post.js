import { useState, useContext } from 'react';
import qs from 'qs';
import OilContext from '../store/oil-context';
import Swal from 'sweetalert2';

const usePost = () =>{
    const [isResponse, setIsResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const authCtx = useContext(OilContext);

    const sendRequest = (requsetBody, mode) =>{
        setIsLoading(true);
        let postRequestPayload ={};

        switch(mode){
          case 'emailSend': //이메일 전송
            postRequestPayload={
                headers : {
                "Content-Type": "application/x-www-form-urlencoded",
                "Cookie": "emailKey=%242b%2410%24%2Fbx%2FaNTrqRNLw6ve62CW9uVNnie77JQNCDKhiNf9fWidT9NobJnHq"
                },
                body : qs.stringify({
                    email:requsetBody.email?requsetBody.email:''
                })
            }
            break;
          case 'register': //회원가입
            postRequestPayload = {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body : qs.stringify({
                email: requsetBody.email? requsetBody.email:'',
                password: requsetBody.password? requsetBody.password:'',
                nickname: requsetBody.nickname? requsetBody.nickname:'익명'+Math.floor(Math.random() * 99999)
              })
            };
            break;
          case 'login':
            postRequestPayload = {
                headers : {
                "Content-Type": "application/x-www-form-urlencoded",
                "Cookie": "emailKey=%242b%2410%24AVPSg2ooYDBBQfnlbzUyruoDbagl8d2%2FNcdi%2F0jPqBbjySS.Wak4u"
                },
                body: qs.stringify({
                  email: requsetBody.email? requsetBody.email:'',
                  password: requsetBody.password? requsetBody.password:''
                })
            };
            break;
          default:
            postRequestPayload = {}          
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
            Swal.fire({
              title: res.success ? "환영합니다" : "에러!",
              text: res.success ? "오늘의 감정을 남겨보세요" : res.message,
              icon: res.success ? "success" : "error",
              confirmButtonColor: "#002560",
              confirmButtonText: "확인",
            });
            if(mode==='login'){
              console.log(res)
              const expiractionTime = new Date(new Date().getTime() + 10800000);
              authCtx.login(res.data, expiractionTime.toISOString());
            }
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(()=>setIsLoading(false))
          
    }
    return {
        sendRequest,
        isResponse,
        isLoading
    }
}

export default usePost;
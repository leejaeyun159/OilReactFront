import { useState } from 'react';
import { useNavigate} from "react-router-dom";

const APIKEY = "AIzaSyCvS0xnX5DZ5q5YAvwO5J0kxnqGNRSJ8zk";

const usePassWordFind = () =>{
    const [isResponse, setIsResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const sendRequest = (requestConfig, mode) => {
        setIsLoading(true);
      const sendBody = {
        email: requestConfig.email ? requestConfig.email : null,
        requestType: requestConfig.requestType ? requestConfig.requestType : null 
      };
      const confirmBody = {
        oobCode: requestConfig.oobCode?requestConfig.oobCode: null,
        newPassword: requestConfig.newPassword?requestConfig.newPassword: null
      };

      const bodyFormat = mode === "send"
            ? JSON.stringify(sendBody)
            : (mode === "change"
            ? JSON.stringify(confirmBody)
            : null);

      fetch(requestConfig.url + APIKEY, {
        method: "POST",
        body: bodyFormat,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            return response.json().then((data) => {
              let errMsg = "잘못된 접근" + data;
              throw new Error(errMsg);
            });
          }
        })
        .then((data) => {
          alert("해당 이메일로 인증 사이트가 발송되었습니다.(유효시간 5분)");
          setIsResponse(data);
          navigate('/',{replace:true});
        })
        .catch((err) => {
          alert("유효한 아이디를 입력해주세요(이메일 형식)");
          setIsResponse(err);
        }).finally(()=>{
            setIsLoading(false);
        });
    };

    return {
        sendRequest,
        isResponse,
        isLoading
    }
}
export default usePassWordFind;
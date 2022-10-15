import { useState } from 'react';

const APIKEY = "AIzaSyCvS0xnX5DZ5q5YAvwO5J0kxnqGNRSJ8zk";

const usePassWordFind = () =>{
    const [isResponse, setIsResponse] = useState(null);

    const sendRequest = (requestConfig, mode) => {
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
          alert("성공" + data);
          console.log(data);
          setIsResponse(data);
        })
        .catch((err) => {
          alert(err);
          setIsResponse(err);
        });
    };

    return {
        sendRequest,
        isResponse
    }
}
export default usePassWordFind;
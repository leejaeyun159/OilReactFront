import { useState } from 'react';
import { useCookies } from "react-cookie";
import qs from 'qs';

const usePut = () =>{
    const [isResponse, setIsResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [cookie, setCookie] = useCookies(["id"]);
   
    const sendRequest = (requsetBody, mode) =>{
        setIsLoading(true);
       
        let putRequestPayload = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            // 'Authorization': cookie.EmailCookie
          },
          Body: qs.stringify({
            key: requsetBody.key,
          }),
        };

        fetch(requsetBody.url, {
          method: "PUT",
          redirect: "follow",
          headers: putRequestPayload.headers,
          body: putRequestPayload.Body,
          // mode: "cors",
          // credentials: "include",
          // withCredentials: true,
        })
          .then((res) => res.json())
          .then((res) => {
            setIsResponse(res);
            if (res.success === true) alert(res.message);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(setIsLoading(false));
    }
    return {
        sendRequest,
        isResponse,
        isLoading
    }
}

export default usePut;
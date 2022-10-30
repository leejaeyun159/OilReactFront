import { useState, useContext,useEffect } from 'react';
import OilContext from '../store/oil-context';
import Swal from 'sweetalert2';

const useGet = (URL, callback, mode) => {
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(OilContext);
  const TOKEN = authCtx.token;
  let getRequestPayload = {};
  let data ={};
  
  switch (mode) {
    case "requestMain": //메인피드 가져오기
      getRequestPayload = {
        headers: {
          Authorization: "Bearer " + TOKEN,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
      break;
    default:
      getRequestPayload = {};
  }

  const sendRequest = async () => {
    setIsLoading(true);
    const response = await fetch(URL, {
      method: "GET",
      headers: getRequestPayload.headers,
      redirect: "follow",
    });
    data = await response.data;
    callback(data);
    setIsLoading(false);
  };

  useEffect(() => {
    sendRequest();
  }, []);

  return data;
};

export default useGet;
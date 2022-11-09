import styled from "./CreatePage.module.css";
import { useRef, useState, useContext } from "react";
import { Card, DiaryTextField, TextField } from "../UI";
import { SelectAutoWidth, LoadingButtonsTransition } from "../MUI";
import { weather } from "../API/optionData";
import useValid from "../Hooks/use-valid";
import AuthContext from "../store/oil-context";
import usePost from "../Hooks/use-post";
import usePut from "../Hooks/use-put";
import { HOSTIP } from "../API/privateText";

const CreatePage = (props) => {
  const titleInputRef = useRef();
  const textInputRef = useRef();
  const weatherInputRef = useRef();

  const { sendRequest: sendPostRequest } = usePost();
  const { sendRequest: sendPutRequest } = usePut();
  const [loading, setLoading] = useState(false);
  const [weatherPick, setWeatherPick] = useState(""); //weather 데이터 처리

  const {
    value: weatherValue,
    isValid: weatherValid,
    validError: weatherValidError,
    enterChangeHandler: weatherEnterChangeHandler,
    blurHandler: weatherBlurHandler,
    reset: weatherReset,
  } = useValid((element) => element !== ""); //날씨 유효성

  const {
    value: titleValue,
    isValid: titleValid,
    validError: titleValidError,
    enterChangeHandler: titleEnterChangeHandler,
    blurHandler: titleBlurHandler,
    reset: titleReset,
  } = useValid((element) => element.trim() !== ""); //제목 유효성

  const {
    value: textValue,
    isValid: textValid,
    validError: textValidError,
    enterChangeHandler: textEnterChangeHandler,
    blurHandler: textBlurHandler,
    reset: textReset,
  } = useValid((element) => element.trim() !== ""); //본문 유효성

  let formIsValid = false;
  if (weatherValue && titleValue && textValue) {
    formIsValid = true;
  } //버튼 활성화 조건문

  const handleClick = (e) => {
    if (!weatherValid || !titleValid || !textValid) return;
    setLoading(true);

    e.preventDefault();
    const enterdTitle = titleInputRef.current.value;
    const enteredText = textInputRef.current.value;

    if (props.mode === "UPDATE") {
      const requestBody = {
        title: enterdTitle,
        content: enteredText,
        weather: weatherPick,
        url: HOSTIP + "api/posts/" + props.data.id,
      };
      sendPutRequest(requestBody, "putDiary", props.close, props.onPost);
    } else {
      const requsetBody = {
        title: enterdTitle,
        content: enteredText,
        weather: weatherPick,
        url: HOSTIP + "api/posts/write",
      };
      sendPostRequest(requsetBody, "postDiary", props.close, props.onPost);
    }
    weatherReset();
    titleReset();
    textReset();
    //보내고 초기화
    setLoading(false);
  };

  const weatherChangeHandler = (e) => {
    setWeatherPick(e.target.value);
    weatherEnterChangeHandler(e);
  };

  return (
    <form className={styled.form}>
      <Card>
        <Card>
          <div>
            <SelectAutoWidth
              label="날씨"
              list={weather}
              onBlur={weatherBlurHandler}
              onChange={weatherChangeHandler}
              inputRef={weatherInputRef}
              pick={weatherPick}
            />
          </div>
          <LoadingButtonsTransition
            child="등록"
            onClick={handleClick}
            loading={loading}
            disabled={!formIsValid}
          />
        </Card>
        <TextField
          place="제목을 입력하세요"
          type="text"
          fsize="20"
          onBlur={titleBlurHandler}
          onChange={titleEnterChangeHandler}
          inputRef={titleInputRef}
          defaultValue={props.mode === "UPDATE" ? props.data.title : ""}
        />
        <DiaryTextField
          place="내용을 입력하세요"
          type="text"
          onBlur={textBlurHandler}
          onChange={textEnterChangeHandler}
          inputRef={textInputRef}
          defaultValue={props.mode === "UPDATE" ? props.data.sentences : ""}
        />
        {weatherValidError || titleValidError || textValidError ? (
          <p>* 날짜, 날씨, 제목, 내용을 모두 입력해주세요</p>
        ) : (
          <p></p>
        )}
      </Card>
    </form>
  );
};
export default CreatePage;

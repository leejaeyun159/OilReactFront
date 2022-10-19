import styled from './CreatePage.module.css';
import { useRef, useState } from 'react'
import { Card ,DiaryTextField, TextField} from "../UI";
import { SelectAutoWidth,LoadingButtonsTransition } from "../MUI";
import { date, weather } from '../API/optionData';
import useValid from '../Hooks/use-valid';

const CreatePage =()=>{
  const [loading, setLoading] = useState(false);
  const [datePick, setDatePick] = useState(""); //date 데이터 처리
  const [weatherPick, setWeatherPick] = useState(""); //weather 데이터 처리

  const { value: dateValue, isValid: dateValid, validError: dateValidError,
    enterChangeHandler: dateEnterChangeHandler, blurHandler: dateBlurHandler, reset: dateReset,
  } = useValid((element)=> element !== ""); //날짜 유효성

  const { value: weatherValue, isValid: weatherValid, validError: weatherValidError,
    enterChangeHandler: weatherEnterChangeHandler, blurHandler: weatherBlurHandler, reset: weatherReset,
  } = useValid((element)=> element !== ""); //날씨 유효성
  
  const { value: titleValue, isValid: titleValid, validError: titleValidError,
    enterChangeHandler: titleEnterChangeHandler, blurHandler: titleBlurHandler, reset: titleReset,
  } = useValid((element)=> element.trim() !== ""); //제목 유효성
  
  const { value: textValue, isValid: textValid, validError: textValidError,
    enterChangeHandler: textEnterChangeHandler, blurHandler: textBlurHandler, reset: textReset,
  } = useValid((element)=> element.trim() !== ""); //본문 유효성

  let formIsValid = false;
  if(dateValue && weatherValue && titleValue && textValue){
    formIsValid = true;
  } //버튼 활성화 조건문

  // const diaryTitle = useRef();

  function handleClick() {
    setLoading(true);
    setTimeout(() => {
    setLoading(false);
      }, 3000);
  }

    const dateChangeHandler = (e) => {
      setDatePick(e.target.value);
      dateEnterChangeHandler(e);
    };
    const weatherChangeHandler = (e) => {
      setWeatherPick(e.target.value);
      weatherEnterChangeHandler(e);
    }

  const submitHandler =(e)=>{
    e.preventDefault();
    if(!dateValid || !weatherValid || !titleValid || !textValid) return;
    
    dateReset();
    weatherReset();
    titleReset();
    textReset(); 
    //보내고 초기화
  }

return (
  <form className={styled.form} onSubmit={submitHandler}>
    <Card>
      <Card>
        <div>
          {/* <SelectAutoWidth
            label="날짜"
            list={date}
            onBlur={dateBlurHandler}
            onChange={dateChangeHandler}
            pick={datePick}
          /> */}
          <SelectAutoWidth
            label="날씨"
            list={weather}
            onBlur={weatherBlurHandler}
            onChange={weatherChangeHandler}
            pick={weatherPick}
          />
        </div>
        <LoadingButtonsTransition
          child="등록"
          loadingHandler={handleClick}
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
      />
      <DiaryTextField
        place="내용을 입력하세요"
        type="text"
        onBlur={textBlurHandler}
        onChange={textEnterChangeHandler}
      />
      {dateValidError ||
      weatherValidError ||
      titleValidError ||
      textValidError ? (
        <p>* 날짜, 날씨, 제목, 내용을 모두 입력해주세요</p>
      ) : (
        <p></p>
      )}
    </Card>
  </form>
);
}
export default CreatePage;
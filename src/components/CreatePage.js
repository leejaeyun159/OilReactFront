import styled from './CreatePage.module.css';
import { useRef, useState } from 'react'
import { Card ,DiaryTextField, TextField} from "../UI";
import { SelectAutoWidth,LoadingButtonsTransition } from "../MUI";
import { date, weather } from '../API/optionData';
import useValid from '../Hooks/use-valid';

const CreatePage =()=>{
  const {
    value: titleValue,
    isValid: titleValid,
    validError: titleValidError,
    enterChangeHandler: titleEnterChangeHandler,
    blurHandler: titleBlurHandler,
    reset: titleReset,
  } = useValid((element)=> element.trim() !== "");

  let formIsValid = false;
  if(titleValue){
    formIsValid = true;
  }

  const diaryTitle = useRef();

  const [loading, setLoading] = useState(false);
    
  function handleClick() {
    setLoading(true);
    setTimeout(() => {
    setLoading(false);
      }, 3000);
  }

  const submitHandler =(e)=>{
    e.preventDefault();
    if(!titleValid) return;
    titleReset();
  }

return (
  <form className={styled.form} onSubmit={submitHandler}>
    <Card>
      <Card>
        <div>
          <SelectAutoWidth label="날짜" list={date} />
          <SelectAutoWidth label="날씨" list={weather} />
        </div>
        <LoadingButtonsTransition
          child="등록"
          loadingHandler={handleClick}
          loading={loading}
        />
      </Card>
      <TextField
        place="제목을 입력하세요"
        type="text"
        fsize="20"
        onBlur={titleBlurHandler}
        onChange={titleEnterChangeHandler}
      />
      <DiaryTextField place="내용을 입력하세요" type="text" />
      {titleValidError ? ( <p>* 날짜, 날씨, 제목, 내용을 모두 입력해주세요</p>) 
      : ( <p></p> )}
    </Card>
  </form>
);
}
export default CreatePage;
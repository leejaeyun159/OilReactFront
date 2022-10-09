import styled from './CreatePage.module.css';
import { useRef, useState } from 'react'
import { Card ,DiaryTextField, TextField} from "../UI";
import { SelectAutoWidth,LoadingButtonsTransition } from "../MUI";


const date = [
  {
    name: '오늘',
    value: '2022-10-08'
  },
  {
    name: '어제',
    value: '2022-10-07'
  }
]

const weather = [
  {
    name: "맑음",
    value: "Sunny",
  },
  {
    name: "흐림",
    value: "Cloudy",
  },
  {
    name: "눈",
    value: "Snowy",
  },
  {
    name: "비",
    value: "Rainy",
  },
  {
    name: "우박",
    value: "Hail",
  }
];

const CreatePage =()=>{
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
      console.log(e);
    }
    return (
      <form className={styled.form} onSubmit={submitHandler}>
        <Card>
          <Card>
            <SelectAutoWidth label="날짜" list={date} />
            <SelectAutoWidth label="날씨" list={weather} />
            <LoadingButtonsTransition
              child="등록"
              loadingHandler={handleClick}
              loading ={loading}
            />
          </Card>
          <TextField place="제목을 입력하세요" type="text" fsize="20" />
          <DiaryTextField place="내용을 입력하세요" type="text" />
        </Card>
      </form>
    );
}
export default CreatePage;
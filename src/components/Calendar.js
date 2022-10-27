import Calendar from "react-calendar";
import { useState } from "react";
import moment from "moment";
import "react-calendar/dist/Calendar.css";
import styled from "./Calendar.module.css";
import "./Calendar.css"

const marks = [
    "15-10-2022",
    "03-10-2022",
    "07-10-2022",
    "12-10-2022",
    "13-10-2022",
    "15-10-2022"
]

const markCondition = {
  "15-10-2022": "negative",
  "03-10-2022": "negative",
  "07-10-2022": "positive",
  "12-10-2022": "default",
  "13-10-2022": "default",
  "15-10-2022": "default" //저장할 때 최고감정도 같이 저장되어있음
};

const OilCalendar = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className={styled.div}>
      <span>
        <h2>캘린더</h2>
        <h4>한 달의 감정을 총 정리합니다</h4>
      </span>
      <Calendar
        className={styled["react-calendar"]}
        onChange={setDate}
        value={date}
        formatDay={(locale, date) => moment(date).format("DD")}
        calendarType="US"
        tileClassName=
        {({ date, view }) => {
          if (marks.find((x) =>( 
          x === moment(date).format("DD-MM-YYYY") && markCondition[x] === "negative"  
            ))) {
              return "negativeDay";
            }            
          else if(marks.find((x) =>( 
          x === moment(date).format("DD-MM-YYYY") && markCondition[x] === "default"  
            ))) {
              return "defaultDay";
            }    
          else if(marks.find((x) =>( 
            x === moment(date).format("DD-MM-YYYY") && markCondition[x] === "positive"  
              ))) {
                return "positiveDay";
              }    
            }
          }      
      />
      <h3 className={styled.dateTitle}>
        {moment(date).format("YYYY년 MM월 DD일")}
      </h3>
    </div>
  );
};

export default OilCalendar;

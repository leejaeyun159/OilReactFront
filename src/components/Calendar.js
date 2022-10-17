import Calendar from "react-calendar";
import { useState } from "react";
import moment from "moment";
import "react-calendar/dist/Calendar.css";
import styled from "./Calendar.module.css";

const OilCalendar = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className={styled.div}>
      <span>
        <h2>캘린더</h2>
        <h4>한 달의 감정을 총 정리합니다</h4>
      </span>
      <Calendar
        className={styled['react-calendar']}
        onChange={setDate}
        value={date}
        formatDay={(locale, date) => moment(date).format("DD")}
        tileContent=''
        calendarType="US"
      />
      <h3 className={styled.dateTitle}>
        {moment(date).format("YYYY년 MM월 DD일")}
      </h3>
    </div>
  );
};

export default OilCalendar;

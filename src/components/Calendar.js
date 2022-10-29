import Calendar from "react-calendar";
import { useState } from "react";
import moment from "moment";
import "react-calendar/dist/Calendar.css";
import styled from "./Calendar.module.css";
import "./Calendar.css"
import { DiaryPage } from "../UI";
import {Link} from 'react-router-dom';

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
  "15-10-2022": "default"
};

const OilCalendar = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div>
      <div className={styled.calendarBox}>
        <span>
          <h2>캘린더</h2>
          <h4>한 달의 감정을 한 눈에 보기</h4>
        </span>
        <Calendar
          className={styled["react-calendar"]}
          onChange={setDate}
          value={date}
          formatDay={(locale, date) => moment(date).format("DD")}
          calendarType="US"
          tileClassName={({ date, view }) => {
            if (
              marks.find(
                (x) =>
                  x === moment(date).format("DD-MM-YYYY") &&
                  markCondition[x] === "negative"
              )
            ) {
              return "negativeDay";
            } else if (
              marks.find(
                (x) =>
                  x === moment(date).format("DD-MM-YYYY") &&
                  markCondition[x] === "default"
              )
            ) {
              return "defaultDay";
            } else if (
              marks.find(
                (x) =>
                  x === moment(date).format("DD-MM-YYYY") &&
                  markCondition[x] === "positive"
              )
            ) {
              return "positiveDay";
            }
          }}
        />
        <h3 className={styled.dateTitle}>
          {moment(date).format("YYYY년 MM월 DD일")}
        </h3>
        <span className={styled.Number}>
          <div
            className={`${styled.Condition} ${styled.Negative}`}
            color={"#db9791"}
          >
            부 정 1
          </div>
          <div
            className={`${styled.Condition} ${styled.Nutreal}`}
            color={"#CADB69"}
          >
            평 범 3
          </div>
          <div
            className={`${styled.Condition} ${styled.Positive}`}
            color={"#80abdb"}
          >
            긍 정 1
          </div>
        </span>
      </div>
      <div className={styled.feedBox}>
        <Link to="/diarydetail?postId=diary1">
          <DiaryPage
            key={"diary1"}
            title={"소나기 일부 발췌"}
            days={"20221023 PM"}
            weather={"Rainy Weather"}
            mmdd={"1023"}
            preview={{
              negative: 90.00112,
              positive: 0.26289228,
              neutral: 9.735989,
            }}
          />
        </Link>
      </div>
    </div>
  );
};

export default OilCalendar;

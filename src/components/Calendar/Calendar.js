import { useState, useCallback, useContext, useEffect } from "react";
import { HOSTIP } from "../../API/privateText";
import { Link } from "react-router-dom";
import { DiaryPage, Dot } from "../../UI";
import AuthContext from "../../store/oil-context";
import Skeleton from "@mui/material/Skeleton";
import styled from "./Calendar.module.css";
import Calendar from "react-calendar";
import moment from "moment";
import "react-calendar/dist/Calendar.css";

let DAYSKEY = [];
let MARKDATA = [];
let MARKCONDITION = {};

const OilCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  const TOKEN = authCtx.token;

  const GetHandler = useCallback(async (date) => {
    setDate(date);
    DAYSKEY = [];
    MARKDATA = [];
    MARKCONDITION = {};
    try {
      setIsLoading(true);
      const getFetch = await fetch(
        HOSTIP +
          "api/calendar?y=" +
          moment(date).format("YYYY") +
          "&m=" +
          moment(date).format("MM"),
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + TOKEN,
          },
          redirect: "follow",
        }
      );
      const response = await getFetch.json();
      const result = await response.data;

      for (const key in result) {
        let daysFormat =
          result[key].yyyymmdd.slice(6, 8) +
          "-" +
          result[key].yyyymmdd.slice(4, 6) +
          "-" +
          result[key].yyyymmdd.slice(0, 4);

        if (DAYSKEY.includes(daysFormat)) break;
        DAYSKEY.push(daysFormat);
        MARKDATA.push({
          dayId: daysFormat,
          id: result[key].id,
          title: result[key].title,
          days: result[key].yyyymmdd,
          weather: result[key].weather + " Weather",
          mmdd: result[key].yyyymmdd.slice(4, 9),
          sentiment: result[key].sentiment,
          CoditionPer: {
            R: result[key].negative,
            G: result[key].neutral,
            B: result[key].positive,
          },
        });
        MARKCONDITION[daysFormat] = result[key].sentiment;
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    GetHandler();
  }, [GetHandler]);

  const countByElement = (arr, val) => {
    return arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
  };

  return (
    <div>
      <div className={styled.calendarBox}>
        <span>
          <h2>캘린더</h2>
          <h4>한 달의 감정을 한 눈에 보기</h4>
        </span>
        <Calendar
          className={styled["react-calendar"]}
          onChange={GetHandler}
          date={date}
          formatDay={(locale, date) => moment(date).format("DD")}
          calendarType="US"
          tileContent={({ date }) => {
            if (
              DAYSKEY.find(
                (x) =>
                  x === moment(date).format("DD-MM-YYYY") &&
                  MARKCONDITION[x] === "negative"
              )
            ) {
              return <Dot color="negative" />;
            } else if (
              DAYSKEY.find(
                (x) =>
                  x === moment(date).format("DD-MM-YYYY") &&
                  MARKCONDITION[x] === "neutral"
              )
            ) {
              return <Dot color="neutral" />;
            } else if (
              DAYSKEY.find(
                (x) =>
                  x === moment(date).format("DD-MM-YYYY") &&
                  MARKCONDITION[x] === "positive"
              )
            ) {
              return <Dot color="positive" />;
            }
            return <Dot />;
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
            부 정 {countByElement(Object.values(MARKCONDITION), "negative")}
          </div>
          <div
            className={`${styled.Condition} ${styled.Neutral}`}
            color={"#CADB69"}
          >
            평 범 {countByElement(Object.values(MARKCONDITION), "neutral")}
          </div>
          <div
            className={`${styled.Condition} ${styled.Positive}`}
            color={"#80abdb"}
          >
            긍 정 {countByElement(Object.values(MARKCONDITION), "positive")}
          </div>
        </span>
      </div>
      {!isLoading && (
        <ul className={styled.feedBox}>
          {MARKDATA.filter(
            (data) => data.dayId === moment(date).format("DD-MM-YYYY")
          ).map((data) => (
            <li key={data.id}>
              <Link to={"/diarydetail?postId=" + data.id}>
                <DiaryPage
                  key={data.id}
                  title={data.title}
                  days={data.days}
                  weather={data.weather}
                  mmdd={data.mmdd}
                  preview={data.CoditionPer}
                />
              </Link>
            </li>
          ))}
        </ul>
      )}
      {isLoading && (
        <Skeleton
          className={styled.feedLoading}
          sx={{ borderRadius: "0 0 15px 0", bgcolor: "#e9eef7" }}
          variant="rectangular"
          width={"100%"}
          height={80}
        />
      )}
    </div>
  );
};

export default OilCalendar;

import styled from "./SearchingPage.module.css";
import { LoadingSkeleton } from "../MUI";
import { DiaryPage } from "../UI";
import { useState, useCallback, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../store/oil-context";
import { HOSTIP } from "../API/privateText";
import { useSearchParams } from "react-router-dom";

let SEARCHFEED = [];
let FEEDKEY = [];

const SearchingPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const authCtx = useContext(AuthContext);
  const TOKEN = authCtx.token;
  const [searchParams, setSearchParams] = useSearchParams();
  const contents = searchParams.get("contents");

  const getRequestPayload = {
    headers: {
      Authorization: "Bearer " + TOKEN,
    },
  };

  const GetHandler = useCallback(async () => {
    setIsLoading(true);
    setIsError(null);
    SEARCHFEED = [];
    FEEDKEY = [];
    try {
      const getFetch = await fetch(
        HOSTIP +
          "api/posts/search/result?q=" +
          contents +
          "&filter=content&page=0",
        {
          method: "GET",
          headers: getRequestPayload.headers,
          redirect: "follow",
        }
      );

      const response = await getFetch.json();
      const result = response.data;
      for (const key in result) {
        if (FEEDKEY.includes(key)) break;
        FEEDKEY.push(key); //중복된 key값이 있으면 안불러옴
        SEARCHFEED.push({
          id: result[key].id,
          title: result[key].title,
          days: result[key].yyyymmdd,
          weather: result[key].weather + " Weather",
          mmdd: result[key].yyyymmdd.slice(4, 9),
          CoditionPer: {
            R: result[key].negative,
            G: result[key].neutral,
            B: result[key].positive,
          },
        });
      }
    } catch (error) {
      console.log(error);
      setIsError(error);
    }
    setIsLoading(false);
  }, [contents]);

  useEffect(() => {
    GetHandler();
  }, [GetHandler]);

  return (
    <div>
      <div className={styled.searchTitle}>
        <span>
          <h2>검색결과</h2>
          <h4>
            "{contents}"에 대한 검색결과가 {SEARCHFEED.length}건 있습니다
          </h4>
        </span>
      </div>
      <div className={styled.searchContent}>
        {!isLoading && (
          <ul>
            {SEARCHFEED.map((feed) => (
              <li key={feed.id}>
                <Link to={"/diarydetail?postId=" + feed.id}>
                  <DiaryPage
                    key={feed.id}
                    title={feed.title}
                    days={feed.days}
                    weather={feed.weather}
                    mmdd={feed.mmdd}
                    preview={feed.CoditionPer}
                  />
                </Link>
              </li>
            ))}
          </ul>
        )}
        {isLoading && <LoadingSkeleton />}
        {isError && <h2>페이지를 불러올 수 없습니다</h2>}
      </div>
    </div>
  );
};
export default SearchingPage;

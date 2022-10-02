import "./App.css";
import DetailGraph from "./components/DetailGraph";
import { useReducer, useRef } from "react";

const reducer = (state, action) => {
  //state의 스냅샷을 가져오는 함수
  let newState = [];

  switch (action.type) {
    case "INIT": {
      //초기화
      return action.data;
    }
    case "CREATE": {
      const newItem = {
        ...action.data,
      };
      newState = [newItem, ...state]; //newState에 추가
      break;
    }
    case "REMOVE": {
      newState = state.filter(
        (
          it //action.data와 다른 state만 남김
        ) => it.id !== action.data
      );
      break;
    }
    case "EDIT": {
      newState = state.map(
        (
          it //id와 action.data.id가 같으면 data불러오기
        ) => (it.id === action.data.id ? { ...action.data } : it)
      );
      break;
    }
    default:
      return state;
  }
  return newState; //newState반환
};

const App = () => {
  const [data, dispatchOil] = useReducer(reducer, []);
  const dataId = useRef(0);

  const onCreate = (date, content, weather, condition, author) => {
    dispatchOil({
      type: "CREATE",
      data: {
        id: dataId.current,
        data: new Date(date).getTime(), //이것도 드롭 박스로 해야될 듯한데
        content,
        weather,
        condition, //감정을 일단 넣어놓음
        author, // 작성자도 넣어놔야할 듯
      },
    });
    dataId.current = Math.random(); //원문에서는 Id를 순서대로 함 UUID를 써야될 듯
  };

  const onRemove = (targetId) => {
    dispatchOil({
      type: "REMOVE",
      targetId,
    });
  };

  const onEdit = (targetId, date, content, condition, author) => {
    dispatchOil({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        condition,
        author,
      },
    });
  };
  return (
    <div id="root">
      <DetailGraph />
    </div>
  );
};

export default App;

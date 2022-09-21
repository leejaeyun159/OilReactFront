import './App.css';
import UIConditionGradation from "./UI/UIConditionGradation.js";
import UIProgressBar from './UI/UIProgressBar';
const CoditionPer = {'R':12,'G':80,'B':8}

const App = () =>{
  return (
    <div id="root">
      <div className="App">
        <h1>오늘의 감정</h1>
        <div>
          <UIConditionGradation color={CoditionPer} />
          <br />
          <UIProgressBar color={"#f13e3eb5"} persent={CoditionPer["R"]} />
          <UIProgressBar color={"#40a1469e"} persent={CoditionPer["G"]} />
          <UIProgressBar color={"#1649cb9e"} persent={CoditionPer["B"]} />
          <br />
          <p>
            positive: {CoditionPer["R"]}%<br />
            defualt: {CoditionPer["G"]}%<br />
            negative: {CoditionPer["B"]}%<br />
            <br />
            <br />" 명언 어쩌구 저쩌구"
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
import styled from './InitialPage.module.css';

const InitialPage =()=>{
    return (
      <div className={styled.div}>
        <h2>오늘 하루의 감정을 소중히</h2>
        <h1>오늘의 일기</h1>
        <img src="../../asset/PaintMain.png" alt="logoPainting" />
      </div>
    );
}

export default InitialPage;
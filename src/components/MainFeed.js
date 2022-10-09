import styled from './MainFeed.module.css'; 
// import { Link } from 'react-router-dom'
import { FloatingActionButtons } from '../MUI';

const MainFeed = ()=>{
    return (
      <div className={styled.div}>
        <FloatingActionButtons LinkTo="/create"/>
      </div>
    );
}

export default MainFeed;

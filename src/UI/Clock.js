import styled from 'styled-components';
import  { useState, useEffect } from 'react';

const Clock = (props) => {
    const [isDate, setIsDate] = useState(new Date());

    useEffect(()=>{
        const timer = setInterval(()=>{
            setIsDate(new Date());
        },1000);
        return (()=>clearInterval(timer))
    },[])
    
    return (
      <div>
        <>{props.timeStamp}</>
        <>{isDate.getTime()}</>
      </div>
    );
}

export default Clock;
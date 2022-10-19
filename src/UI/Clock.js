import { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';

const ClockCounter = styled.div`
  font-family: "Press Start 2P", cursive;
  font-weight: 300;
  background-color: ${(props) => props.lightOn ? "rgb(0 255 129)" : "rgb(169 206 208)"};
  border: #020b19 solid 2px;
  box-shadow: inset 0 0 7px;
  width: 120px;
  padding: 3px;
  color: ${(props) => props.color};
  text-align: center;
`;


const Clock = (props) =>{
    let timer;
    const [time,setTime] = useState(moment());
    const [color,setColor] = useState('green');
    useEffect(() => {
      timer = setInterval(() => {
        setTime(moment());
      }, 1000);

      if (+time.format("mm") >= 56) {
        setColor("#b00000");
      } else {
        setColor("black");
      }

      return () => {
        clearInterval(timer);
      };
    }, [time.format("mm")]);
    

    return (
      <div>
        <ClockCounter lightOn={props.lightOn} color={color}>
          {time.format("hh:mm")}
          {time.format("A MM/DD")}
        </ClockCounter>
      </div>
    );
}

export default Clock;
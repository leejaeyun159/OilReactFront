import styled from'styled-components'

const Wrap = styled.div`
  width: 180px;
  height: 180px;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    180deg,
    rgb(234, 234, 234) 27%, 
    rgb(${(props) => props.color["R"]}, ${(props) => props.color["G"]},${(props) => props.color["B"]}) 81%
  );
  box-shadow: 0px 13px 11px #bbbbbb;
  transform: translate3d(0, 0, 0);
  margin: 20px auto;

`;
const WaveCompo = styled.div`
  width: 430px;
  height: 430px;
  position: absolute;
  top: 60%;
  left: -100px;
  border-radius: 43%;
  animation: drift 4s infinite linear;
  background: rgba(255, 255, 255, 0.4);

  @keyframes drift {
    100% {
        transform: rotate(-360deg);
    }
`;

const WaveCompo2 = styled.div`
  width: 430px;
  height: 430px;
  position: absolute;
  top: 60%;
  left: -100px;
  border-radius: 43%;
  animation: drift 8s infinite linear;
  background: rgba(255, 255, 255, 0.2);

    @keyframes drift {
    100% {
        transform: rotate(-360deg);
    }
`;


const Wave =(props)=>{
    return (
        <Wrap color={props.color}>
          <WaveCompo></WaveCompo>
          <WaveCompo2></WaveCompo2>
        </Wrap>
    );
}
export default Wave;
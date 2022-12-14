import styled from'styled-components'
import Swal from "sweetalert2";

const ColorTag = styled.div`
  color: transparent;
  position: absolute;
  border-radius: 15px;
  top: 50%;
  box-sizing: content-box;
  left: 50%;
  font-weight: 500;
  font-size: 20px;
  padding:100px;
  transform: translate(-50%, -50%);
  z-index:300;
  &:hover {
    color: white;
    cursor: pointer;
  }
`;

const Wrap = styled.div`
  width: 180px;
  height: 180px;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    180deg,
    rgb(249, 249, 249) 10%,
    rgb(
        ${(props) => (props.color["R"] / 100) * 255},
        ${(props) => (props.color["G"] / 100) * 255},
        ${(props) => (props.color["B"] / 100) * 255}
      )
      50%
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

    const valueToHex = (value)=>{
      let hex = Number(value).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }
    const rgbToHex =(props)=>{
      return (
        valueToHex(props.color.R.toFixed(0)) +
        valueToHex(props.color.G.toFixed(0)) +
        valueToHex(props.color.B.toFixed(0))
      );
    }
    const copy =() =>{
      navigator.clipboard.writeText(`#${rgbToHex(props)}`)
    }
    return (
        <Wrap color={props.color}>
          <ColorTag id="color" onClick={()=>{
            Swal.fire({
              title: "???????????? ??????",
              text: "????????? ????????? ??????????????? ?????????????????????.",
              icon: "success",
              confirmButtonColor: "#002560",
              confirmButtonText: "??????",
            });
            copy();
            }}>{`#${rgbToHex(props)}`}</ColorTag>
          <WaveCompo></WaveCompo>
          <WaveCompo2></WaveCompo2>
        </Wrap>
    );
}
export default Wave;
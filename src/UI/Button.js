import styled from "styled-components";

const ButtonInner = styled.button`
  padding: 13px ${(props) => props.padding_}px;
  border:none;
  background-color: ${(props) => props.bgcolor ? props.bgcolor : `var(--maincolor)`};
  color:white;
  margin: 10px 0;
  border-radius:5px;
  cursor:pointer;
`;

const Button =(props)=>{
    return props.disabled ? (
      <ButtonInner
        className={props.className}
        type={props.type}
        padding_={props.padding}
        bgcolor={props.bgcolor}
        onClick={props.onClick}
        disabled
      >
        {props.child}
      </ButtonInner>
    ) : (
      <ButtonInner
        className={props.className}
        type={props.type}
        padding_={props.padding}
        bgcolor={props.bgcolor}
        onClick={props.onClick}
      >
        {props.child}
      </ButtonInner>
    );
}

export default Button;
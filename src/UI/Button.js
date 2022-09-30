import styled from "styled-components";

const ButtonInner = styled.button`
  padding: ${(props) => props.padding_}px 120px;
  border:none;
  background-color: var(--maincolor);
  color:white;
  margin: 10px 0;
  border-radius:5px;
  cursor:pointer;
`;

const Button =(props)=>{
    return (
        <ButtonInner 
        type={props.type}
        padding_={props.padding}
        >
            {props.child}
        </ButtonInner>
    )
}

export default Button;
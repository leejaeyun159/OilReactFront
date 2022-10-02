import styled from "styled-components";

const Field = styled.input`
  padding: 15px;
  border: none;
  outline: none;
  border-bottom: 2px solid var(--maincolor);
  background-color: transparent;
  margin: 5px 0;

  &:focus {
    animation: focusBlue 0.2s forwards;
  }

  @keyframes focusBlue {
    0% {
    }
    100% {
      background-color: var(--backBlue);
      border-bottom: 2px solid transparent;
    }
  }
`;

const TextField =(props)=>{
    return(
    <Field 
    placeholder={props.place}
    type={props.type}>
    </Field>
    )
}
export default TextField; 
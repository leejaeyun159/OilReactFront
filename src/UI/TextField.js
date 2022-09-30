import styled from "styled-components";

const Field = styled.input`
  padding: 13px;
  width: 30%;
  min-width:250px;
  max-width: 400px;
  border: none;
  outline: none;
  border-bottom: 2px solid var(--maincolor);

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
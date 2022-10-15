import styled from "styled-components";

const Field = styled.input`
  padding: 15px;
  border: none;
  outline: none;
  border-bottom: 2px solid var(--maincolor);
  background-color: transparent;
  margin: 5px 0;
  font-size: ${(props)=>props.fsize}px;
  font-weight:700;
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
    return (
      <Field
        onBlur={props.onBlur}
        onChange={props.onChange}
        fsize={props.fsize}
        placeholder={props.place}
        type={props.type}
        required={props.required}
        ref={props.inputRef}
      />
    );
}
export default TextField; 
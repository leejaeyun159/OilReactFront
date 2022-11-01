import styled from "styled-components";

const Field = styled.textarea`
  padding: 15px;
  border: none;
  outline: none;
  border-bottom: 2px solid var(--maincolor);
  background-color: transparent;
  margin: 5px;
  font-size: 15px;
  font-weight: 500;

  height: 50vh;
  border: none;
  resize: none;

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

const DiaryTextField = (props) => {
  return (
    <Field
      placeholder={props.place}
      type={props.type}
      onBlur={props.onBlur}
      onChange={props.onChange}
      ref={props.inputRef}
      defaultValue={props.defaultValue}
    ></Field>
  );
};
export default DiaryTextField;

import styled from "styled-components";

const Wrapper = styled.form`
  background-color: white;
  width: 150px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  margin: 0 auto;
  @media screen and (max-width: 374px) {
    width: 120px;
  }
  @media screen and (min-width: 700px) {
    width: 200px;
  }
`;

const Input = styled.input`
  width: 80px;
  height: 35px;
  border-radius: 50px;
  border: none;
  outline: none;
  padding: 0 15px;
  @media screen and (max-width: 374px) {
    width: 50px;
  }
  @media screen and (min-width: 700px) {
    width: 130px;
  }
`;

const Button = styled.button`
  width: 30px;
  height: 30px;
  border: none;
  background-color: white;
  border: solid 8px var(--maincolor);
  border-radius: 50%;
`;

const Search = (props) => (
  <Wrapper>
    <Input placeholder={"키워드 검색"} ref={props.inputRef} />
    <Button onClick={props.onClick} />
  </Wrapper>
);
export default Search;

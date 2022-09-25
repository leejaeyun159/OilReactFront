import styled from "styled-components";

const OilNav = styled.div`
  padding: 20px 0;
  display: flex;
  background: var(--maincolor);
  box-shadow: 0 0 7px 0 #000000;
`;
const LeftChild = styled.div`
    justify-content:start;
    margin:auto;
}
`;

const HeadText = styled.div`
    font-size: 15px;
    font-weight:900;
    color:white;
    margin: auto;
`;

const RightChild = styled.div`
  justify-content: end;
  margin: auto;
`;

const Button = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  cursor: pointer;
  background: url("${(props) => props.logo}") no-repeat;
  background-position: center;
  background-size: ${(props) => props.size};
  top: 50%;
`;

const Nav = (props) => {
  return (
    <OilNav>
      <LeftChild>
        <Button logo="/asset/oil-logo.png" size="40px 30px" />
      </LeftChild>
      <HeadText>{props.pageTitle}</HeadText>
      <RightChild>
        <Button logo="/asset/category.png" size="22px 22px" />
      </RightChild>
    </OilNav>
  );
};

export default Nav;

import styled from "styled-components";
import { Link } from "react-router-dom";
import { TemporaryDrawer } from "../MUI";
import OilContext from '../store/oil-context';
import { useContext } from  'react';

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

const Img = styled.img`
  width: "${(props) => props.width}";
  height: "${(props) => props.height}";
  src: "${(props) => props.logo}";
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
  const authCtx = useContext(OilContext);
  const isLoggedIn = authCtx.isLoggedIn;
  return (
    <OilNav>
      <LeftChild>
        {!isLoggedIn ? (
          <Link to="/mainFeed">
            <Img src="/asset/oilLogo.png" width="40px" height="30px" />
          </Link>
        ) : (
          <Link to="/">
            <Img src="/asset/oilLogo.png" width="40px" height="30px" />
          </Link>
        )}
      </LeftChild>
      <HeadText>{props.pageTitle}</HeadText>
      <RightChild>
        {!isLoggedIn ? (
          <Button>
            <TemporaryDrawer>
              <Img src="/asset/category.png" width="22px" height="22px" />
            </TemporaryDrawer>
          </Button> /*카테고리 모달창 */
        ) : (
          <Link to="/login">
            <Img src="/asset/login.png" width="22px" height="22px" />
          </Link>
        )}
      </RightChild>
    </OilNav>
  );
};

export default Nav;

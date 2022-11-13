import { Link, useNavigate } from "react-router-dom";
import { useContext, useRef } from "react";
import { TemporaryDrawer } from "../MUI";
import OilContext from "../store/oil-context";
import styled from "styled-components";
import Search from "./Search";
import Swal from "sweetalert2";

const OilNav = styled.div`
  padding: 20px 0;
  display: flex;
  align-contents: center;
  background: var(--maincolor);
  box-shadow: 0 0 7px 0 #000000;
  position: relative;
`;
const LeftChild = styled.div`
  padding:5px 0;
  margin:auto;
}
`;
const HeadText = styled.div`
  margin: auto;
`;
const SearchSpace = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  @media screen and (max-width: 374px) {
    transform: translate(-40%, -50%);
  }
`;
const RightChild = styled.div`
  padding: 9px 0;
  margin: 0 auto;
`;

const Img = styled.img`
  width: "${(props) => props.width}";
  height: "${(props) => props.height}";
  src: "${(props) => props.logo}";
`;

const Nav = (props) => {
  const authCtx = useContext(OilContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const navigate = useNavigate();
  const contentSearch = useRef();
  const searchHandler = (e) => {
    e.preventDefault();
    const enteredContent = contentSearch.current.value;
    if (enteredContent.toString().length < 2) {
      Swal.fire({
        title: "검색 에러",
        text: "2자 이상 입력해주세요",
        icon: "warning",
        confirmButtonColor: "#002560",
        confirmButtonText: "확인",
      });
    } else navigate("/search?contents=" + enteredContent, { replace: true });
    contentSearch.current.value = "";
  };

  return (
    <OilNav>
      <LeftChild>
        {isLoggedIn ? (
          <Link to="/mainFeed">
            <Img src="/asset/oilLogo.png" width="40px" height="30px" />
          </Link>
        ) : (
          <Link to="/login">
            <Img src="/asset/oilLogo.png" width="40px" height="30px" />
          </Link>
        )}
      </LeftChild>
      <HeadText></HeadText>
      <SearchSpace>
        {isLoggedIn && (
          <Search onClick={searchHandler} inputRef={contentSearch} />
        )}
      </SearchSpace>
      <RightChild>
        {isLoggedIn ? (
          <TemporaryDrawer>
            <Img src="/asset/category.png" width="22px" height="22px" />
          </TemporaryDrawer>
        ) : (
          /*카테고리 모달창 */
          <Link to="/login">
            <Img src="/asset/login.png" width="22px" height="22px" />
          </Link>
        )}
      </RightChild>
    </OilNav>
  );
};

export default Nav;

import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import LockResetIcon from "@mui/icons-material/LockReset";
import LastPageIcon from "@mui/icons-material/LastPage";
import {Link} from 'react-router-dom'

export default function TemporaryDrawer(props) {
  const [state, setState] = React.useState({ right: false });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const iconList = [
    <CalendarMonthIcon />,
    <EqualizerIcon />,
    <QuestionAnswerIcon/>,
    <LockResetIcon/>,

  ];
  const linkText = ["", "", "/faq", "/findPW"];
  const linkUserText = ["", "/delAccount"];
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Box
        sx={{
          bgcolor: "#002560",
          textAlign: "left",
          p: 2,
          color: "white",
        }}
      >
        <LastPageIcon fontSize="large" />
      </Box>
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <h4>반갑습니다 신용재님</h4>
      </Box>
      <Divider />
      <List>
        {["캘린더", "통계", "FAQ", "비밀번호 변경"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton component={Link} to={linkText[index]}>
              <ListItemIcon>
                {iconList[index] ? iconList[index] : ""}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["로그아웃", "회원탈퇴"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton component={Link} to={linkUserText[index]}>
              <ListItemText primary={text} sx={{ color: "red" }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{props.children}</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import * as React from "react";

export default function FloatingActionButtons(props) {
  return (
    <Box sx={{ "& > :not(style)": { m: 1 } }} onClick={props.onClick}>
      <Fab color="primary" aria-label="add" sx={{ border: "white 3px solid" }}>
        <AddIcon />
      </Fab>
    </Box>
  );
}

import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

export default function FloatingActionButtons(props) {
  return (
        <Box sx={{ "& > :not(style)": { m: 1 } }} onClick={props.onClick}>
          <Fab color="primary" aria-label="add">
            <AddIcon/>
          </Fab>
        </Box>
  );
}

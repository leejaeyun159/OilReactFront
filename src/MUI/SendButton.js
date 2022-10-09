import * as React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";

export default function LoadingButtonsTransition(props) {
  return (
    <Box>
      <Box
        sx={{
          "& > button": {
            maxHeight: 43,
            maxWidth: 60,
            whiteSpace: "nowrap",
            fontSize: 12,
          },
        }}
      >
        <LoadingButton
          size="large"
          onClick={props.loadingHandler}
          endIcon={<EditIcon />}
          loading={props.loading}
          loadingPosition="end"
          variant="contained"
          color="primary"
        >
          {props.child}
        </LoadingButton>
      </Box>
    </Box>
  );
}

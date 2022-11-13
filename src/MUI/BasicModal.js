import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import * as React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "100%",
  maxWidth: 700,
  transform: "translate(-50%, -50%)",
};

export default function BasicModal(props) {
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropProps={{
          timeout: 700,
        }}
      >
        <Box sx={style}>{props.children}</Box>
      </Modal>
    </div>
  );
}

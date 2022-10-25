import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function SimpleAccordion(props) {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{ margin: 1 }}
        >
          <Typography color="primary" sx={{ fontSize: 15, fontWeight: 300 }}>
            {props.children}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
            {props.context}
          </Typography>
        </AccordionDetails>
        {props.btn}
      </Accordion>
    </div>
  );
}

import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function SimpleAccordion(props) {
  return (
    <div>
      <Accordion defaultExpanded={props.open}>
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
          <Typography
            sx={{
              fontSize: 15,
              fontWeight: 600,
              p: 2,
              lineHeight: 2,
              textAlign: "left",
            }}
          >
            {props.context}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

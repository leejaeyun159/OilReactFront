import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectVariants(props) {
  const [pick, setPick] = React.useState("");

  const handleChange = (event) => {
    setPick(event.target.value);
  };
    const selectList = props.list;
    const Option =
      selectList && selectList.map((element) => (
        <MenuItem key={element.value} value={element.value}>
          {element.name}
        </MenuItem>
      ));

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, 
        minWidth: 60,
        }}>
        <InputLabel id="demo-simple-select-standard-label">{props.label}</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={pick}
          onChange={handleChange}
          label={props.label}
        >
          {Option}
        </Select>
      </FormControl>
    </div>
  );
}

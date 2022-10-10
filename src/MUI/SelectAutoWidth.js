import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectVariants(props) {

  const selectList = props.list;
  const Option = selectList && selectList.map((element) => (
    <MenuItem key={element.value} value={element.value}>
      {element.name}
    </MenuItem>
  ));

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 2, minWidth: 70 }}>
        <InputLabel
          id="demo-simple-select-standard-label"
          sx={{ fontSize: 14 }}
        >
          {props.label}
        </InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={props.pick}
          onBlur={props.onBlur}
          onChange={props.onChange}
          label={props.label}
          sx={{ fontSize: 14 }}
        >
          {Option}
        </Select>
      </FormControl>
    </div>
  );
}

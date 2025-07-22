import * as React from "react";
import Box from "@mui/material/Box";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import useEnhancedEffect from '@mui/utils/useEnhancedEffect';
import {useGridApiContext,
} from "@mui/x-data-grid";
function CategorySelectBoxEditCell(props) {
  const {id, value, field, hasFocus} = props
  const apiRef = useGridApiContext()
  const ref = React.useRef(null)

  const handleChange = (event, newValue) => {
    console.log("newValue:")
    console.log(newValue)
    apiRef.current.setEditCellValue({ id, field, value: newValue.props.value });
  };

  useEnhancedEffect(() => {
    if (hasFocus && ref.current) {
      const input = ref.current.querySelector(`input[value="${value}"]`);
      input?.focus();
    }
  }, [hasFocus, value]);

  return(
    <Box>
    <Select value={value} ref={ref}  onChange={handleChange}>
        <MenuItem value={"早餐"}>早餐</MenuItem>
        <MenuItem value={"午餐"}>午餐</MenuItem>
        <MenuItem value={"晚餐"}>晚餐</MenuItem>
        <MenuItem value={"點心"}>點心</MenuItem>
        <MenuItem value={"飲料"}>飲料</MenuItem>
        <MenuItem value={"酒類"}>酒類</MenuItem>
        <MenuItem value={"水果"}>水果</MenuItem>
      
    </Select></Box>)
}

export default function renderSubCategorySelectBoxEditInputCell  (params)  {
  return <CategorySelectBoxEditCell {...params} />;
};
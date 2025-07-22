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
      <MenuItem value={"現金"}>現金</MenuItem>
        <MenuItem value={"銀行"}>銀行</MenuItem>
        <MenuItem value={"行動支付"}>行動支付</MenuItem>
        <MenuItem value={"Visa"}>Visa</MenuItem>
    </Select></Box>)
}

export default function renderExpenseAccountSelectBoxEditInputCell  (params)  {
  return <CategorySelectBoxEditCell {...params} />;
};
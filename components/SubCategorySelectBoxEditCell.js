import * as React from "react";
import Box from "@mui/material/Box";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import useEnhancedEffect from '@mui/utils/useEnhancedEffect';
import {useGridApiContext,
} from "@mui/x-data-grid";

export default function SubCategorySelectBoxEditCell(props) {
  const {id, value, field, hasFocus, categories, row, subCategories, setSubCategories} = props
  
  const [category] = categories.filter(c => c.id == row.categoryId)
  
  
  React.useEffect(()=>{

    setSubCategories(category.subCategories)
  },[])
  
  const apiRef = useGridApiContext()
  const ref = React.useRef(null)

  
  const handleChange = (event, newValue) => {
   
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
      {subCategories.map(s => <MenuItem value={s.id}>{s.name}</MenuItem>)}
        
      
    </Select></Box>)
}



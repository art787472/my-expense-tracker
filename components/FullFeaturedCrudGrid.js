import * as React from "react";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import axios from "../utils/axios"
import useEnhancedEffect from '@mui/utils/useEnhancedEffect';
import SubCategorySelectBoxEditCell from "./SubCategorySelectBoxEditCell";
import renderExpenseAccountSelectBoxEditInputCell from "./ExpenseAccountSelectBoxEditCell";

import {
  GridRowModes,
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
  Toolbar,
  ToolbarButton,
  useGridApiContext,
  renderEditSingleSelectCell,
} from "@mui/x-data-grid";
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from "@mui/x-data-grid-generator";
import { renderDateViewCalendar } from "@mui/x-date-pickers/dateViewRenderers";





function CategorySelectBoxEditCell(props) {
  const {id, value, field, hasFocus, categories, setSubcategory} = props
  const apiRef = useGridApiContext()
  const ref = React.useRef(null)

  const handleChange = (event, newValue) => {
    
    apiRef.current.setEditCellValue({ id, field, value: newValue.props.value });
    const category = newValue.props.value
    const subCategories = categories.filter(c => c.id == category)[0].subCategories
    setSubcategory(subCategories)
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
      {categories.map(c => <MenuItem value={c.id}>{c.name}</MenuItem>)}
      
    </Select></Box>)
}



function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [
      ...oldRows,
      { id, dateTime: new Date(), price: '', category: '', reason: '', account: '', isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'dateTime' },
    }));
  };

  return (
    <Toolbar>
      <Tooltip title="Add record">
        <ToolbarButton onClick={handleClick}>
          <AddIcon fontSize="small" />
        </ToolbarButton>
      </Tooltip>
    </Toolbar>
  );
}

export default function FullFeaturedCrudGrid({rows, setRows, userId, categoriesData}) {
  
  const sc = categoriesData.flatMap(c => c.subCategories)

  const [rowModesModel, setRowModesModel] = React.useState({});
  const [subCategories, setSubCategories] = React.useState([])
  const renderCategorySelectBoxEditInputCell = (params) => {
    
  return <CategorySelectBoxEditCell {...params} categories={categoriesData} setSubcategory={setSubCategories}/>;
};


const renderSubCategorySelectBoxEditInputCell =  (params)=>  {
  return <SubCategorySelectBoxEditCell  {...params} categories={categoriesData}subCategories={subCategories} setSubCategories={setSubCategories}/>;
};
  
  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => async () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    
    setRows(rows.filter((row) => row.id !== id));

    const deleteUrl = process.env.NEXT_PUBLIC_BASE_URL + `expense/${id}`
    
    const deleteApi = async () => {
      try {
        const response = await axios.delete(deleteUrl)

      } catch (error) {
        console.error(error)
      }
    }
    deleteApi()
    
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    console.log(updatedRow)
    const newData = {
      accountId: 1,
      categoryId: updatedRow.category,
      subCategoryId: updatedRow.subCategory,
      dateTime: updatedRow.dateTime,
      price: updatedRow.price,
      name: updatedRow.name
    }
    
    const editUrl = process.env.NEXT_PUBLIC_BASE_URL + `expense/${newRow.id}`
    const updateApi = async () => {
      try {
        const response = await axios.put(editUrl, newData)
      } catch(error) {
        console.error(error)
      }
    }
    updateApi()
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: 'dateTime', headerName: '日期', width: 180, editable: true, type: 'dateTime' },
    { field: 'name', headerName: '名稱', width: 180, editable: true },
    { field: 'price', headerName: '金額', width: 120, editable: true, type: 'number' },
    { field: 'category', headerName: '類別', width: 180, editable: true, valueGetter:  (value, row) => {
      
      return categoriesData.filter(x => x.id == value)[0]?.name
    }, renderEditCell: renderCategorySelectBoxEditInputCell },
    { field: 'subCategory', headerName: '消費目的', width: 220, editable: true,valueGetter: (value) => sc.filter(x => x.id == value)[0]?.name, renderEditCell: renderSubCategorySelectBoxEditInputCell },
    { field: 'account', headerName: '帳戶', width: 180, editable: true, renderEditCell: renderExpenseAccountSelectBoxEditInputCell },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              material={{
                sx: {
                  color: 'primary.main',
                },
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={(e) => {console.error(e)}}
        slots={{ toolbar: EditToolbar }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
        showToolbar
      />
    </Box>
  );
}

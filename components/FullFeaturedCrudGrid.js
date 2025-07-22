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
import renderSubCategorySelectBoxEditInputCell from "./SubCategorySelectBoxEditCell";
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

function rederCategorySelectBox(params) {
  return (
    <Select value={params.value} >
      <MenuItem value={"飲食"}>飲食</MenuItem>
        <MenuItem value={"玩樂"}>玩樂</MenuItem>
        <MenuItem value={"教育"}>教育</MenuItem>
    </Select>)
}



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
      <MenuItem value={"飲食"}>飲食</MenuItem>
        <MenuItem value={"玩樂"}>玩樂</MenuItem>
        <MenuItem value={"教育"}>教育</MenuItem>
    </Select></Box>)
}

const renderCategorySelectBoxEditInputCell = (params) => {
  return <CategorySelectBoxEditCell {...params} />;
};

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

export default function FullFeaturedCrudGrid({rows, setRows, userId}) {
  
  const [rowModesModel, setRowModesModel] = React.useState({});
  
  
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
    console.log(userId)
    setRows(rows.filter((row) => row.id !== id));

    const deleteUrl = process.env.NEXT_PUBLIC_BASE_URL + `expense/${id}`
    console.log(deleteUrl)
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
    console.log(rows)
    console.log(newRow)
    const editUrl = process.env.NEXT_PUBLIC_BASE_URL + `expense/${newRow.id}`
    const updateApi = async () => {
      try {
        const response = await axios.put(editUrl, newRow)
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
    { field: 'price', headerName: '金額', width: 120, editable: true, type: 'number' },
    { field: 'category', headerName: '類別', width: 180, editable: true, renderEditCell: renderCategorySelectBoxEditInputCell },
    { field: 'reason', headerName: '消費目的', width: 220, editable: true, renderEditCell: renderSubCategorySelectBoxEditInputCell },
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

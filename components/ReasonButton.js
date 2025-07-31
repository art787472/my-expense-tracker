import IconButton from '@mui/material/IconButton';
import { Children } from 'react';
export default function ReasonButton({icon, text, value, index, onClick, setValue, setReason, subCategoryId}){
    
    const handleClick = (e) => {
        setValue(index)
        setReason(subCategoryId)
    }
    return (
        <>
        <IconButton  aria-label="add an alarm" color={value === index ? "primary" : ""} onClick={handleClick}>
                {icon}
                    
                </IconButton>
                <p onClick={handleClick} style={{cursor: "pointer",margin: 0, color: value === index ? "#1976d2": "rgba(0, 0, 0, 0.54)" }}>{text}</p>
        </>
    )
}
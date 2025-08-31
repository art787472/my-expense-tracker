import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import ReasonButton from "./ReasonButton";
import iconConvert from "../utils/iconConvert";
const Cell = ({ children }) => {
    return (
        <Grid size={3} display="flex" justifyContent="center" alignItems="center" flexDirection="column">{children}</Grid>
    )
}



export default function ReasonPanel({setReason, subCategories}) {
    const [value, setValue] = useState(1)
    

    
    return (
        <Grid container width={'100%'}>

            {subCategories.map((datum, i) =>
                <Cell key={`${datum.id}-${datum.name}`}>
                    <ReasonButton subCategoryId={datum.id} key={datum.id} setReason={setReason} index={i} value={value} setValue={setValue} icon={iconConvert(datum.icon.name)} text={datum.name}  />
                </Cell>
            )}
        </Grid>
    )
}
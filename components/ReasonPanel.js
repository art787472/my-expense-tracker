import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import AlarmIcon from '@mui/icons-material/Alarm';
import Typography from "@mui/material";
import ReasonButton from "./ReasonButton";
import EggAltIcon from '@mui/icons-material/EggAlt';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import IcecreamIcon from '@mui/icons-material/Icecream';
import AppleIcon from '@mui/icons-material/Apple';
import CelebrationIcon from '@mui/icons-material/Celebration';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import FaceIcon from '@mui/icons-material/Face';
import iconConvert from "../utils/iconConvert";
const Cell = ({ children }) => {
    return (
        <Grid size={3} display="flex" justifyContent="center" alignItems="center" flexDirection="column">{children}</Grid>
    )
}

const data = [
    {
        reason: "早餐",
        icon: <EggAltIcon />
    },
    {
        reason: "午餐",
        icon: <LocalPizzaIcon />
    },
    {
        reason: "晚餐",
        icon: <LocalDiningIcon />
    },
    {
        reason: "點心",
        icon: <IcecreamIcon />
    },
    {
        reason: "飲料",
        icon: <LocalCafeIcon />
    },
    {
        reason: "酒類",
        icon: <LocalBarIcon />
    },
    {
        reason: "水果",
        icon: <AppleIcon />
    },
]

export default function ReasonPanel({setReason, subCategories}) {
    const [value, setValue] = useState(0)
    

    useEffect(() => {
        
        setReason(data[value].reason)
    }, [value]);
    return (
        <Grid container width={'100%'}>

            {subCategories.map((datum, i) =>
                <Cell>
                    <ReasonButton key={i} index={i} value={value} setValue={setValue} icon={iconConvert(datum.icon.name)} text={datum.name}  />
                </Cell>
            )}
        </Grid>
    )
}
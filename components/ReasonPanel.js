import { useState } from "react";
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
        icon: <EggAltIcon />
    },
]

export default function ReasonPanel() {
    const [value, setValue] = useState(0)
    const handleClick = (e) => {
        e.preventDefault()

        setValue(e.tartget)
        console.log(e.tartget)
    }
    return (
        <Grid container width={'100%'}>

            {data.map((datum, i) =>
                <Cell>
                    <ReasonButton index={i} value={value} setValue={setValue} icon={datum.icon} text={datum.reason} onClick={handleClick} />
                </Cell>
            )}
        </Grid>
    )
}
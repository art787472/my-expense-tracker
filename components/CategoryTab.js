import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

import ToggleButton, { toggleButtonClasses } from '@mui/material/ToggleButton';
import ToggleButtonGroup, {
  toggleButtonGroupClasses,
} from '@mui/material/ToggleButtonGroup';
import { Tab } from '@mui/material';
import Tabs from '@mui/material/Tabs'; // Change this line
import RestaurantIcon from '@mui/icons-material/Restaurant';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import HouseIcon from '@mui/icons-material/House';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PaidIcon from '@mui/icons-material/Paid';
import Box from '@mui/material/Box'; // Add this import at the top
import ReasonPanel from '../components/ReasonPanel'
import iconConvert from '../utils/iconConvert';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};


export default function CategoryTab({data, setCategory, reason, setReason}) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        
        setValue(newValue);
        setCategory(event.target.name)
    };
    console.log(data)
    const [alignment, setAlignment] = React.useState('left');

    const handleAlignmentChange = (event, newAlignment) => {
        setAlignment(newAlignment);
        
    };
    return (
    <>
        <Tabs value={value} onChange={handleChange} aria-label="disabled tabs example"  variant="scrollable" scrollButtons="auto" fullWidth >
            {data.map((v, idx) => {
                return <Tab name={v.name} label={v.name} icon={iconConvert(v.icon.name)} />
            })}
            {/* <Tab name="食" label="食" icon={<RestaurantIcon />} />
            <Tab name="衣" label="衣" icon={<CheckroomIcon />} />
            <Tab name="住" label="住" icon={<HouseIcon />} />
            <Tab name="行" label="行" icon={<DirectionsCarIcon />} />
            <Tab name="樂" label="樂" icon={<DirectionsCarIcon />} />
            <Tab name="其他" label="其他" icon={<PaidIcon />} /> */}
        </Tabs>
        {data.map((v, idk) => {
            return (
                <TabPanel value={value} index={idk} >
                    <ReasonPanel setReason={setReason} subCategories={v.subCategories}/>
                </TabPanel>
            )
        })}
        
    </>)
}
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
import Typography from '@mui/material/Typography'; // Add this import at the top
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
                    <Typography>{children}</Typography>
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

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    gap: '2rem',
    [`& .${toggleButtonGroupClasses.firstButton}, & .${toggleButtonGroupClasses.middleButton}`]:
    {
        borderTopRightRadius: (theme.vars || theme).shape.borderRadius,
        borderBottomRightRadius: (theme.vars || theme).shape.borderRadius,
    },
    [`& .${toggleButtonGroupClasses.lastButton}, & .${toggleButtonGroupClasses.middleButton}`]:
    {
        borderTopLeftRadius: (theme.vars || theme).shape.borderRadius,
        borderBottomLeftRadius: (theme.vars || theme).shape.borderRadius,
        borderLeft: `1px solid ${(theme.vars || theme).palette.divider}`,
    },
    [`& .${toggleButtonGroupClasses.lastButton}.${toggleButtonClasses.disabled}, & .${toggleButtonGroupClasses.middleButton}.${toggleButtonClasses.disabled}`]:
    {
        borderLeft: `1px solid ${(theme.vars || theme).palette.action.disabledBackground}`,
    },
}));

export default function CategoryTab() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [alignment, setAlignment] = React.useState('left');

    const handleAlignmentChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };
    return (
    <>
        <Tabs value={value} onChange={handleChange} aria-label="disabled tabs example" centered variant="scrollable" scrollButtons="auto" fullWidth >
            <Tab label="食" icon={<RestaurantIcon />} />
            <Tab label="衣" icon={<CheckroomIcon />} />
            <Tab label="住" icon={<HouseIcon />} />
            <Tab label="行" icon={<DirectionsCarIcon />} />
            <Tab label="樂" icon={<DirectionsCarIcon />} />
            <Tab label="其他" icon={<PaidIcon />} />
        </Tabs>
        <TabPanel value={value} index={0} >
            <StyledToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleAlignmentChange}
                aria-label="Platform"
            >
                <ToggleButton value="web">便當</ToggleButton>
                <ToggleButton value="android">速食</ToggleButton>
                <ToggleButton value="ios">麵</ToggleButton>
            </StyledToggleButtonGroup>
        </TabPanel>
        <TabPanel value={value} index={1} >
            Item Two
        </TabPanel>
        <TabPanel value={value} index={2} >
            Item Three
        </TabPanel>
    </>)
}
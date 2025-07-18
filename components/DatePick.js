import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, LocalizationProviderProps } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function DatePick({time, setTime}) {

    const handleChange = (newValue) => {
        setTime(newValue)
    }
    return (
        <LocalizationProvider dateAdapter= { AdapterDayjs } >
            <DatePicker label="日期" defaultValue = { dayjs() } sx = {{ width: '100%' }} value={time} onChange={handleChange} />
        </LocalizationProvider>
    )
}
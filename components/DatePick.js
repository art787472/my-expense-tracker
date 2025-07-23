import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, LocalizationProviderProps } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useState } from 'react';
import dayjs from 'dayjs';
import { zhTW } from '@mui/x-date-pickers/locales';

export default function DatePick({time, setTime}) {
    const [timeValue, setTimeValue] = useState(time)

    const handleChange = (newValue) => {
        
        const month = newValue.month()
        const date = newValue.date()
        const year = newValue.year()
        const newTimeValue = dayjs(time).set('month', month).set('date', date).set('year', year)
        setTime(newTimeValue)
        console.log(newTimeValue)
        
    }
    const handleTimeChange = (newValue) => {
        console.log(newValue)
        console.log(newValue.hour())
        const hour = newValue.hour()
        const min = newValue.minute()
        const newTimeValue = dayjs(time).set('hour', hour).set('minute', min)
        setTime(newTimeValue)
        console.log(newTimeValue)
    }
    return (
        <LocalizationProvider dateAdapter= { AdapterDayjs } adapterLocale={zhTW} >
            <TimePicker label="時間" defaultValue = { dayjs()}sx = {{ width: '100%',  marginBottom: 1}} onChange={handleTimeChange}/>
            <DatePicker label="日期" defaultValue = { dayjs() } sx = {{ width: '100%' }} value={time} onChange={handleChange} />
        </LocalizationProvider>
    )
}
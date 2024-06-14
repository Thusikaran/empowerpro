import React, { useState } from 'react'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { DateRangePicker } from 'react-date-range'

const DataSlider = ({onDateChange ,onFilterChange}) => {
    const [dateRange,setDateRange] =useState({
        startDate:undefined,
        endDate:undefined,
        key:'selection'
    })

    const handleSelect = (ranges) =>{
        setDateRange(ranges.selection)
        onDateChange(ranges.selection.startDate,ranges.selection.endDate)
        onFilterChange(ranges.selection.startDate,ranges.selection.endDate)
    }

    const handleClearFilter = () =>{
        setDateRange({
            startDate: undefined ,
            endDate: undefined ,
            key: "selection"
        })
    }
  return (
    <div>DataSlider</div>
  )
}

export default DataSlider
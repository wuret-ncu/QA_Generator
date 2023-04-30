import React,{useState} from 'react'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function SelectBar() {

    const [startDate, setStartDate] = useState(new Date());
  
  return (
    <div className='container flex flex-row py-5'>
        <div className='basis-1/6'>
            <p className="text-2xl">Analysis</p>
        </div>
        <div className='basis-1/6'>
            <select className="select select-bordered w-full max-w-xs">
                <option defaultValue='all'>All </option>
                <option>Read</option>
                <option>Write</option>
            </select>
        </div>
        <div className='basis-1/2 flex justify-end content-center'>
            <p>Date</p>
            <DatePicker  selected={startDate} onChange={(date) => setStartDate(date)} />
            <p className='px-5'>~</p>
            <DatePicker  selected={startDate} onChange={(date) => setStartDate(date)} />
            
        </div>
  </div>
  )
}

export default SelectBar
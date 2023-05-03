import React,{useState} from 'react'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

function SelectBar() {

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    
    const handleSearch = () => {
       console.log('search')
      };
  return (
    <div className='container flex flex-row py-3 items-center'>
        <div className='basis-1/6 '>
            <p className="text-2xl ps-5">Analysis</p>
        </div>

        <select className="select select-bordered mr-5 h-1">
            <option defaultValue='all'>All </option>
            <option>Read</option>
            <option>Write</option>
        </select>
        
    <div className="flex justify-between  p-3">
      <div className="flex items-center">
        <div className="mr-2">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="  Start Date"
          />
        </div>
        <div className='px-3'>~</div>
        <div>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            placeholderText="  End Date"
          />
        </div>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold mx-5 px-4 py-1 rounded-full"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  </div>
  )
}

export default SelectBar
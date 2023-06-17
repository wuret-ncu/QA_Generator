import React from 'react'
import Write from '../Component/Analysis/Write'
import Read from '../Component/Analysis/Read'
import SelectBar from '../Component/Analysis/SelectBar'

function Analysis() {
  return (
    <div className='containers'>
     <SelectBar />
     <Read />
     {/* <Write /> */}
    </div>
  )
}

export default Analysis
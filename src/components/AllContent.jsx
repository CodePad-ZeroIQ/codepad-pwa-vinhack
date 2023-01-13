import React,{useState} from 'react'
import Folder from './Folder'

function AllContent({folders}) {

  return (
    <div>
        <div className="grid place-items-center grid-cols-3 gap-6 sm:grid-cols-2 xl:grid-cols-4 overflow-hidden px-4">
      {folders?.map((item) => (
            <Folder name={item.name} id={item.id} key={item.id}/>
          ))}
      </div>
    </div>
  )
}

export default AllContent
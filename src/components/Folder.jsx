import React from 'react'
import { Link } from "react-router-dom";
import { useEffect,useState } from 'react';

function Folder({name,id}) {
    var textArray = [
        'bg-red-600',
        'bg-orange-600',
        'bg-yellow-600',
        'bg-green-600',
        'bg-cyan-800',
        'bg-indigo-800',
        'bg-violet-600',
        'bg-rose-600',
        'bg-indigo-600',
        'bg-teal-600',
        'bg-emerald-600',
        'bg-yellow-600',
        'bg-amber-700'
      ];
    //   const [color, setcolor] = useState("")
      const randomColor = textArray[Math.floor(Math.random()*textArray.length)];
      console.log("color",textArray[randomColor])
      
    useEffect(() => {
        window.localStorage.clear()
        
    }, [])
    
    const handleToFolder = (name,id) => {
        window.localStorage.setItem("file",id);
        console.log("files",id)
        console.log("yoyo")
    }
  return (
    <Link to="/Folders/Notebook" onClick={() => handleToFolder(name,id)} class="antialiased  text-slate-700 cursor-pointer">
    <div className={` text-center p-4 w-24 h-32 rounded-tr-xl rounded-br-xl  ${randomColor} max-w-xl mx-auto px-6 py-2rounded-lg shadow flex flex-col justify-between`}>
        <h1 class="text-xl text-white font-bold  mb-2">{name}</h1>
    
        <div class="flex justify-center items-center rounded-md shadow-sm">
            <button class="text-white text-sm  hover:text-red-500 font-medium px-4 py-2 inline-flex space-x-1 items-center">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                  </span>
            </button>
        </div>
        
    </div>
</Link>
  )
}

export default Folder
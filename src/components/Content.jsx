import {React,useState,useRef} from 'react'
import { HiMenuAlt3 } from "react-icons/hi";
import Home from './Home';
import AllContent from './AllContent';


function Content({folders}) {
    const [open, setOpen] = useState(false);
    const [show,setShow] = useState(false);
    const folderName = useRef("");
  const handleClick = () => {
    setOpen(prev => !prev);
    console.log("render")
  }

  const handleCreateFolder = () => {
    fetch("https://codepad-backend-production.up.railway.app/folder", {
        method: "POST", // or 'PUT'
        body: JSON.stringify({
          folderName: folderName.current.value.trim(),
        }),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    console.log( folderName.current.value.trim())
  }
  const handleCreateFolderShow = () => {
    setShow((prev) => !prev)
  }
  return (
    <div className='bg-zinc-900 h-screen'>
       <section className="flex ">
      <Home open={open}/>
      
      <div className="grow">
      <div className="text-2xl font-bold">
      <div className="py-3 flex justify-between">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer text-white "
            onClick={handleClick}
          />
           <div className='text-white ml-12'>All NoteBooks</div> 
           <button className='mr-8 text-white' onClick={()=>handleCreateFolderShow()}>+</button>
        </div>
       {
        show && <div>
         <div className='flex h-8 mb-2 justify-center mx-2'>
            <input ref={folderName} className='text-sm w-full p-2' placeholder='type here'/>
            <button onClick={()=>handleCreateFolder()} className='text-sm bg-red-700 w-12 rounded-tr-md rounded-br-md'>ADD</button>
          </div> 
        </div>
       }
      </div>
      <AllContent folders={folders}/>
      </div>
      
    </section>
    </div>
  )
}

export default Content
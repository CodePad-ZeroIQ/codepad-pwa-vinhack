import {React,useState} from 'react'
import { HiMenuAlt3 } from "react-icons/hi";
import Home from './Home';
import AllContent from './AllContent';


function Content({folders}) {
    const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(prev => !prev);
    console.log("render")
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
           <div className='text-white mr-24'>All NoteBooks</div>
        </div>
       
      </div>
      {/* <div className="grid place-items-center grid-cols-1  sm:grid-cols-2 xl:grid-cols-4 ">
      {folders?.map((item) => (
            <Folder name={item.name}/>
          ))}
      </div> */}
      <AllContent folders={folders}/>
      </div>
      
    </section>
    </div>
  )
}

export default Content
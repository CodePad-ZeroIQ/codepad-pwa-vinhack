import React,{useState} from "react";
import Camera from "../components/Camera";
import { HiMenuAlt3 } from "react-icons/hi";
import Home from "../components/Home"

function Scan() {
  const [open, setOpen] = useState(false);
    const handleClick = () => {
      setOpen(prev => !prev);
      console.log("render")
    }
  return (
    <div>
       <section className="flex bg-zinc-900 h-screen">
      <Home open={open}/>
      
      <div className="grow">
      <div className="text-2xl font-bold">
      <div className="py-3 flex justify-between">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer text-white "
            onClick={handleClick}
          />
           <div className='text-white mr-36'>Scanner</div>
        </div>
      </div>
      <div className="flex flex-col flex-grow">
      <Camera/>
      </div>

      </div>
      
    </section>
    </div>
  );
}

export default Scan;

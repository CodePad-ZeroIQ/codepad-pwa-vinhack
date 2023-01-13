import {React,useState,useEffect} from 'react'
import { HiMenuAlt3 } from "react-icons/hi";
import Home from "../components/Home"
import File from "../components/File"
// import Folder from '../components/Folder';

function NoteBook() {
    const [open, setOpen] = useState(false);
    const handleClick = () => {
      setOpen(prev => !prev);
      console.log("render")
    }
    useEffect(() => {
      const length = window.localStorage.length;
      console.log("length",length)
      console.log(window.localStorage.getItem('file'))
    }, [])
    
    const folders = [
        { id:1, name: "DSA",files:[
            { id:101,name:"abc.py", lang:"py", source:"print('asdf') \n print('yoyo')"},
            { id:102,name:"abc.py", lang:"py", source:"print('asdf')"},
            { id:103,name:"abc.py", lang:"py", source:"print('asdf')"},
        ]
        },
        {  id:2,name: "DAA"},
        {  id:4,name: "DSA"},
        {  id:5,name: "DAA"},
        {  id:6,name: "OOPS"},
        {  id:7,name: "DSA"},
        {  id:8,name: "DAA"},
        {  id:9,name: "OOPS"},
        {  id:10,name: "DSA"},
        {  id:11,name: "DAA"},
        {  id:12,name: "OOPS"},
        {  id:13,name: "DSA"},
        {  id:14,name: "DAA"},
        {  id:15,name: "OOPS"},
      ];
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
           <div className='text-white mr-24'>All NoteBooks</div>
        </div>
      </div>
      <div className="flex flex-col flex-grow">
      {folders?.map((item) => (
        (item.id === parseInt(window.localStorage.getItem('file')) && (
            item?.files?.map((x) => (
                <File name={x.name} code={x.source}/>
            ))
        )
          )))}
      </div>
      {/* <AllContent folders={folders}/> */}
      </div>
      
    </section>
    </div>
  )
}

export default NoteBook
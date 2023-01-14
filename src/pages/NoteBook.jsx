import {React,useState,useEffect,useRef} from 'react'
import { HiMenuAlt3 } from "react-icons/hi";
import Home from "../components/Home"
import File from "../components/File"
// import Folder from '../components/Folder';

function NoteBook() {
    const [open, setOpen] = useState(false);
    const [show,setShow] = useState(false);
    const fileName = useRef("");
    const handleClick = () => {
      setOpen(prev => !prev);
      console.log("render")
    }
    useEffect(() => {
      const length = window.localStorage.length;
      console.log("length",length)
      console.log(window.localStorage.getItem('file'))
    }, [])
    
    const handleCreateFile = () => {
      fetch("https://codepad-backend-production.up.railway.app/file", {
          method: "POST", // or 'PUT'
          body: JSON.stringify({
            fid:"63c1b6041d9d2bbb8bcb1303", 
            fName: fileName.current.value.trim(),
            scode:"clg", 
            lang:"pypi"
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
      console.log( fileName.current.value.trim())
    }
    const handleCreateFolderShow = () => {
      setShow((prev) => !prev)
    }
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
           <button className='mr-8 text-white' onClick={()=>handleCreateFolderShow()}>+</button>
        </div>
        {
        show && <div>
          <div className='flex h-8 mb-2 justify-center mx-2'>
            <input ref={fileName} className='text-sm w-full p-2' placeholder='type here'/>
            <button onClick={()=>handleCreateFile()} className='text-sm bg-red-700 w-12 rounded-tr-md rounded-br-md'>ADD</button>
          </div>
        </div>
       }
      </div>
      <div className="flex flex-col flex-grow mx-2">
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
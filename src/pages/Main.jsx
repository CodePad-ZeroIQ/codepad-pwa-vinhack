import {React} from "react";
// import Folder from "../components/Folder";
import Content from "../components/Content";

function Main() {
  const folders = [
    { id:1, name: "DSA"},
    {  id:2,name: "DAA"},
    {  id:3,name: "OOPS"},
    {  id:4,name: "DSA",},
    {  id:5,name: "DAA",},
    {  id:6,name: "OOPS",},
    {  id:7,name: "DSA",},
    {  id:8,name: "DAA",},
    {  id:9,name: "OOPS",},
    {  id:10,name: "DSA",},
    {  id:11,name: "DAA",},
    {  id:12,name: "OOPS",},
    {  id:13,name: "DSA",},
    {  id:14,name: "DAA",},
    {  id:15,name: "OOPS",},
  ];
  // const [open, setOpen] = useState(true);
  // const handleClick = () => {
  //   setOpen(prev => !prev);
  //   console.log("render")
  // }



  return (
    <Content folders={folders}/>
  );
}

export default Main;

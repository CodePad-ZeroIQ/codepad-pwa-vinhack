import React,{useEffect,useState} from "react";
import Edit from "../components/Edit";

function Editor() {
  const [code, setcode] = useState();
  useEffect(() => {
    const length = window.localStorage.length;
    console.log("length",length)
    setcode(window.localStorage.getItem('code'))
    console.log(window.localStorage.getItem('code'))
  }, [])
  
  return <Edit sourceCode={code}/>;
}

export default Editor;

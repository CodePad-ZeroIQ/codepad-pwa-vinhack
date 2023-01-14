import React, { useEffect, useState } from "react";
import CodeEditor, { SelectionText } from "@uiw/react-textarea-code-editor";
import compilersList from "./myarray";
import Loading from "./Loading";
import { HiMenuAlt3 } from "react-icons/hi";
import Home from "./Home";
function Edit() {
  const EDITOR_URL = "https://codepad-backend-production.up.railway.app"
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  var submitid = -1;
  // var endpoint = "localhost:4000";
  // const url = "http://" + endpoint;

  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen((prev) => !prev);
    console.log("render");
  };
  const textRef = React.useRef();
  const [code, setCode] = React.useState(`${window.localStorage?.getItem('code') || ""}`);
  const [input, setInput] = React.useState(``);
  const [lang, setLang] = React.useState(`Python (Pypy)`);
  const [cid, setCid] = useState(99);
  const [compilerVisible, setCompilerVisible] = useState(true);
  const [highlighters, setHighlighters] = useState("python");
  const [isloading, setLoading] = useState(false);
  const [out, setoutput] = useState(
    `Please run the program first to see output`
  );
  const [memory, setMemory] = useState(0);
  const [timeTaken, setTimetaken] = useState(0);
  const [hasError, setError] = useState();
  const [signaldesc, setSignaldesc] = useState();
  const [elementVisible, setElementVisible] = useState(false);
  const fetchOutput = async (submitid, uri) => {
    try {
      const response = await fetch(`${EDITOR_URL}/${uri}/${submitid}`);
      const responsedata = await response.text();
      setoutput(responsedata);
    } catch (error) {
      console.log("Error", error);
    }
  };
  const fetchData = async (submitid) => {
    try {
      await delay(10000);
      const response = await fetch(`${EDITOR_URL}/compile/${submitid}`);
      const jsonResponse = await response.json();
      if (jsonResponse.executing) {
        await delay(10000);
        fetchData(submitid);
      }

      console.log(jsonResponse.result);
      setLoading(false);
      // var statusCode = jsonResponse.result.status.code;
      setTimetaken(jsonResponse.result.time);
      setMemory(jsonResponse.result.memory);
      setSignaldesc(jsonResponse.result.signal_desc);
      setError(jsonResponse.result.status.name);

      if (jsonResponse.result.streams.error) {
        fetchOutput(submitid, "error");
      } else if (jsonResponse.result.streams.output) {
        fetchOutput(submitid, "output");
      } else if (jsonResponse.result.streams.cmpinfo) {
        fetchOutput(submitid, "cmpinfo");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (textRef.current) {
      const obj = new SelectionText(textRef.current);
      console.log("obj:", obj);
    }
  }, []);

  function handleLanguage(e, languag, cid, highlight) {
    e.preventDefault();
    setCid(cid);
    setLang(languag);
    setHighlighters(highlight);
    setElementVisible(false);
  }

  //function to list available compilers from backend
  // function onTestClick(e) {
  //   e.preventDefault();
  //   // console.log("btn clicked");
  //   setElementVisible(false);
  //   var requestOptions = {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Access-Control-Allow-Origin": "*",
  //     },
  //     redirect: "follow",
  //   };

  //   fetch(url + "/compilers", requestOptions)
  //     .then((response) => response.json())
  //     .then((result) => {
  //       compilersList = result;
  //     })

  //     .catch((error) => console.log("error", error));
  // }
  function handleRun(e) {
    e.preventDefault();
    setLoading(true);
    setoutput("Compiling please wait....");
    setMemory("Calculating....");
    setTimetaken("Calculating....");
    setCompilerVisible(true);
    console.log("run clicked");

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      compilerId: cid,
      source: code,
      input: input,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };


    fetch(`${EDITOR_URL}/compile`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        submitid = result.id;
        console.log(submitid);
        fetchData(submitid);
      })
      .catch((error) => console.log("error", error));
  }
  function handleDropdown(e) {
    e.preventDefault();
    if (elementVisible) {
      setElementVisible(false);
      return;
    }
    setElementVisible(true);
  }

  function handleSave(){
    console.log("save clicked")
  }

  return (
    <>
      <div>
        <section className="flex text-white bg-black">
          <Home open={open} />
          {isloading ? (
            <Loading></Loading>
          ) : (
            <>
              <div className="w-full h-full grow mb-4  rounded-lg bg-[#0E0E0E]">
                <div className="px-4 py-2 bg-[#0E0E0E] rounded-t-lg  min-h-[80vh] ">
                  <div className="flex items-center justify-around px-3 py-2  ">
                    <div className="py-3 flex  ">
                      <HiMenuAlt3
                        size={26}
                        className="cursor-pointer"
                        onClick={handleClick}
                      />
                    </div>

                    <h3 className="text-center m-2 text-[#fff] w-[60%] px-3">
                      CodePad
                    </h3>
                    <button
                      type="button"
                      class=" text-white rounded cursor-pointer  focus:text-blue-300  pr-3"
                      onClick={()=>handleSave()}
                    >
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 "
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <span class="sr-only">Download</span>
                    </button>
                    <div>
                      {" "}
                      <button
                        id="dropdownDefaultButton"
                        data-dropdown-toggle="dropdown"
                        onClick={(e) => handleDropdown(e)}
                        className="inline-flex items-center text-xs font-medium text-center text-white  rounded-lg focus:ring-4   sm:ml-5"
                        type="button"
                      >
                        {lang}{" "}
                        <svg
                          className="w-4 h-4 ml-2"
                          aria-hidden="true"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  {isloading ? (
                    <Loading></Loading>
                  ) : (
                    <>
                      <div className="relative ">
                        <div
                          style={
                            elementVisible
                              ? { display: "block" }
                              : { display: "none" }
                          }
                          className="h-48 py-1 overflow-y-auto text-gray-700 dark:text-gray-200 z-20 items-end text-right absolute  top-0 right-0 bg-black"
                        >
                          <ul
                            onBlur={(e) => setElementVisible(false)}
                            className="py-1 text-sm text-gray-700 dark:text-gray-200 "
                            aria-labelledby="dropdownDefaultButton"
                          >
                            {compilersList.map((language) => (
                              <li
                                key={language.id}
                                onClick={(e) =>
                                  handleLanguage(
                                    e,
                                    language.name,
                                    language.id,
                                    language.highlighters.monaco
                                  )
                                }
                              >
                                <button
                                  href="#"
                                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  {language.name}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div onClick={(e) => setElementVisible(false)}>
                          <CodeEditor
                            value={code}
                            ref={textRef}
                            language={highlighters}
                            placeholder="Please enter code here"
                            onChange={(evn) => setCode(evn.target.value)}
                            padding={15}
                            minHeight={"70vh"}
                            style={{
                              fontFamily:
                                "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                              fontSize: 12,
                              minHeight: "60vh",
                              zIndex: 1,
                            }}
                          ></CodeEditor>
                        </div>
                      </div>
                    </>
                  )}

                  <hr></hr>
                  <div className="flex items-center justify-center px-3 py-3 mt-2  dark:border-gray-600 w-[80vw] overflow-x-scroll pl-[85px]">
                    <span class="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                      Default
                    </span>
                    <span class="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300">
                      Dark
                    </span>
                    <span class="bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                      Red
                    </span>
                    <span class="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                      Green
                    </span>
                    <span class="bg-yellow-100 text-yellow-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
                      Yellow
                    </span>
                    <span class="bg-indigo-100 text-indigo-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300">
                      Indigo
                    </span>
                    <span class="bg-purple-100 text-purple-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-300">
                      Purple
                    </span>
                    <span class="bg-pink-100 text-pink-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
                      Pink
                    </span>
                    <span class="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                      Default
                    </span>
                    <span class="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300">
                      Dark
                    </span>
                    <span class="bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                      Red
                    </span>
                    <span class="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                      Green
                    </span>
                    <span class="bg-yellow-100 text-yellow-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
                      Yellow
                    </span>
                    <span class="bg-indigo-100 text-indigo-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300">
                      Indigo
                    </span>
                    <span class="bg-purple-100 text-purple-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-300">
                      Purple
                    </span>
                    <span class="bg-pink-100 text-pink-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
                      Pink
                    </span>
                  </div>
                  <div className="flex items-center justify-center px-3 py-3 mt-2  dark:border-gray-600">
                    <textarea
                      onChange={(evn) => setInput(evn.target.value)}
                      id="chat"
                      rows="1"
                      className="block mx-4 p-2.5 text-sm text-gray-900 bg-white w-5/6  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                      placeholder="Enter Your Input Here"
                    ></textarea>
                    <div>
                      <button
                        type="button"
                        onClick={(e) => handleRun(e)}
                        class="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
                      >
                        <svg
                          aria-hidden="true"
                          class="w-6 h-6 rotate-90"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                        </svg>
                        <span class="sr-only">Run</span>
                      </button>
                    </div>
                  </div>
                  {compilerVisible ? (
                    <>
                      <h3 className="text-center m-2 text-[]">Output</h3>

                      <div className="bg-black min-h-[20vh] text-start">
                        <p
                          readonly
                          className="text-sky-400/100 min-h-[40vh] px-5"
                        >
                          output: {out}
                          <br></br>
                          <br></br>
                          Memory : {memory}
                          <br></br>
                          Time : {timeTaken}
                          <br></br>
                          {signaldesc}
                          <br></br>
                          {hasError}
                          <br></br>
                        </p>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </>
          )}
        </section>
      </div>
    </>
  );
}
export default Edit;

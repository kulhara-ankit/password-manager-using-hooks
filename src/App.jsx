import { useState, useCallback, useRef, useEffect} from "react";

import "./App.css";

export default function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(6);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false)

  // hook useRef is used for reference, where to pass the refernce

  const passwordRef = useRef(null)

  // use hook useCallback(function, dependencies). In this hook we pass two argument 

    const passwordGeneratorCallbackFunction = () => {
    let pswd = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) {
      str += "0123456789"
    }
    if (charAllowed) {
      str += "!@#$%^&*-_~"
    }

    for (let i=1; i < length; i++){
      let char = Math.floor(Math.random()*str.length + 1)
      pswd += str.charAt(char)
    }
    setPassword(pswd)
  }

  const passwordGenerator = useCallback(passwordGeneratorCallbackFunction,[charAllowed, numberAllowed, length, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,100)
    window.navigator.clipboard.writeText(password)
  }, [password])

  // use hook useEffect(function, dependencies). In this hook we pass two argument. It is used to where you want to 
  // see the effect
  
  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <>
      <div className="w-full mx-auto shadow-lg rounded-lg px-r py-3 bg-gray-800 text-orange-500">
        <h1 className="text-color-grey-600 hover:underline text-4xl font-weight-900 text-start pl-16 pt-10 my-3">
          Password Generator
        </h1>

        {/* password Input */}

        <div className="flex shadow rounded-lg overflow-hidden pl-16 mb-4 p-10">
          <input
            className="outline-none font-sans font-weight-500 rounded-md w-full py-4 px-4"
            type="text"
            placeholder="password"
            readOnly
            value={password}
            ref={passwordRef}
          />
          <button 
            onClick={copyPasswordToClipboard}
            className="outline-none bg-blue-700 rounded text-white px-3 py-0.5 shrink-0 w-28 text-xl font-semibold"
          >copy</button>
        </div>

        {/* Bottom Input Container */}

        <div className="flex text-sm gap-x-2 pl-16 pb-12">
          
          {/* Range Input */}
          
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label className="text-xl font-medium">Length : {length}</label>
          </div>

          {/* Show Number Check Box */}

          <div className="flex items-center gap-x-1 ml-20">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label className="font-medium text-xl ml-2" htmlFor="numberInput">
              Numbers
            </label>
          </div>

              {/* Show special character */}

          <div className="flex items-center gap-x-1 ml-20">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label className="font-medium text-xl ml-2" htmlFor="charInput">
              Special Characters
            </label>
          </div>

        </div>
      </div>
    </>
  );
}

import { useState } from "react"
import Dashboard from "./components/Dashboard"
import Header from "./components/Header"

function App() {
  const [username, setusername] = useState<string | null>("");
  const [text, settext] = useState("");
  const handleSubmit = () => {
    setusername(text);
  }
  return (
    <div className="flex flex-col">
      <div className="w-full">
        <Header />
      </div>
      
      <div className="bg-lightGrey w-screen h-screen flex justify-center items-center">
        {
          username
          ? <Dashboard username={username}/>
          : <div className="bg-darkGrey size-full p-[1em] flex justify-center">
              <input 
                value={text}
                onChange={(e) => settext(e.target.value)}
                onKeyDown={(e) => {if(e.code === "Enter") handleSubmit()}} 
                type="text" 
                className="bg-lightGrey p-2 h-[3em] w-[15em] md:w-[20em] mt-[5em]" 
                placeholder="Username"/>
            </div>
        }
        
      </div>
    </div>
    
  )
}

export default App

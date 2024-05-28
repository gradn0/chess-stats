import { useState } from "react"
import Dashboard from "./components/Dashboard"
import Header from "./components/Header"

function App() {
  const [username, setusername] = useState<string | null>(null);
  const [text, settext] = useState("");
  const handleSubmit = () => {
    setusername(text);
  }
  return (
    <div>
      <div>
        <Header />
      </div>
      
      <div className="bg-lightGrey w-screen flex justify-center items-center">
        {
          username
          ? <Dashboard username={username} newUser={() => setusername(null)}/>
          : <div className="bg-darkGrey size-full p-[1em] flex justify-center pt-[5em] items-center gap-2">
              <input 
                value={text}
                onChange={(e) => settext(e.target.value)}
                onKeyDown={(e) => {if(e.code === "Enter") handleSubmit()}} 
                type="text" 
                className="bg-lightGrey p-2 h-[3em] w-[15em] md:w-[20em]" 
                placeholder="Username"/>
                <button className="" onClick={handleSubmit}>Go</button>
            </div>
        }
        
      </div>
    </div>
    
  )
}

export default App

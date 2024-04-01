import { Route , Routes  } from "react-router-dom"
import { Header, Navbar} from "./Components"
import { Home, Settings } from "./Pages"
import { Suspense } from "react"
import { Loading } from "./Components/Loading"

function App() {
  return (
    
      <div className=" lg:h-screen lg:overflow-y-hidden Container">
        <Header/>
        <Suspense fallback = {<Loading/>}>
        <div className=" h-[85vh] my-2 lg:flex">
          <Navbar/>
          <Routes>
            <Route path={'/'} element={<Home/>}/>
            <Route path={'/settings'} element={<Settings/>}/>
          </Routes>
        </div>
        </Suspense>
        
      </div>
    
  )
}

export default App

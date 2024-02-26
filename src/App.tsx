import { Route , Routes  } from "react-router-dom"
import { Header, Navbar} from "./Components"
import { Home, Settings } from "./Pages"

function App() {
  return (
      <div className=" lg:h-screen lg:overflow-hidden  Container">
        <Header/>
        <div className="lg:h-[85vh] my-2 lg:flex">
          <Navbar/>
          <Routes>
            <Route path={'/'} element={<Home/>}/>
            <Route path={'/settings'} element={<Settings/>}/>
          </Routes>
        </div>
        
      </div>
  )
}

export default App

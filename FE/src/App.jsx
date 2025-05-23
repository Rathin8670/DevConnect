import { BrowserRouter, Routes,Route } from "react-router-dom"
import  Body from "./compoments/Body"
import { Login } from "./pages/Login"
import appStore from "./utils/appStore.js"
import {Provider} from"react-redux"
import { Profile } from "./pages/Profile"
import { Feed } from "./compoments/Feed"
import { Connections } from "./pages/Connections.jsx"
import { Request } from "./pages/Request.jsx"
import { Signup } from "./pages/Signup.jsx"

function App() {
  return (
    <>
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path='/' element={<Body/>}>
            <Route path="/" element={<Feed/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/profile" element={<Profile/>}></Route>
            <Route path="/connections" element={<Connections/>}></Route>
            <Route path="/requests" element={<Request/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>  
    </Provider>
    </>
  )
}

export default App

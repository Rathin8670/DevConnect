import { BrowserRouter, Routes,Route } from "react-router-dom"
import  Body from "./compoments/Body"
import { Login } from "./pages/Login"
import appStore from "./utils/appStore.js"
import {Provider} from"react-redux"
import { Profile } from "./pages/Profile"
import { Feed } from "./compoments/Feed"

function App() {
  

  return (
    <>
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path='/' element={<Body/>}>
            <Route path="/" element={<Feed/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/profile" element={<Profile/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>  
    </Provider>
    </>
  )
}

export default App

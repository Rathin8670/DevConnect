import { BrowserRouter, Routes,Route } from "react-router-dom"
import  Body from "./compoments/Body"
import { Login } from "./pages/Login"
import appStore from "./utils/appStore"
import {Provider} from"react-redux"

function App() {
  

  return (
    <>
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path='/' element={<Body/>}>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/profile" element={<div>Profile page</div>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>  
    </Provider>
    </>
  )
}

export default App

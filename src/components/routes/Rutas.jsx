import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "../../Pages/Home/Home"
import {Layout} from "../Layout/Layout"
import { Registro } from "../../Pages/Registro/Registro"
import { Login } from "../../Pages/Login/Login"
import { UserProvider } from "../../Context/UserContex"



export const Rutas =()=>{


    return (
        <>
         <UserProvider>
            {/**MANEJO DE RUTAS */}
        <BrowserRouter>
        <Routes>
        <Route path="/" element={<Layout><Home/></Layout>} />
        {/* Rutas públicas */}
        <Route path='/login' element={<Login />} />
        <Route path="/registro" element={<Registro/>} />
        </Routes>
        </BrowserRouter>
         </UserProvider>
        </>
    )
}
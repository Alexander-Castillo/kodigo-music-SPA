import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "../../Pages/Home/Home"
import Layout from "../Layout/Layout"
import { Registro } from "../../Pages/Registro/Registro"
import { Login } from "../../Pages/Login/Login"



export const Rutas =()=>{


    return (
        <>
        <BrowserRouter>
        <Routes>
        <Route path="/" element={<Layout><Home/></Layout>} />
        {/* Rutas públicas */}
        <Route path='/login' element={<Login />} />
        <Route path="/registro" element={<Registro/>} />
        </Routes>
        </BrowserRouter>
        </>
    )
}
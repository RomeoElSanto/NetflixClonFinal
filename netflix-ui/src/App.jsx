import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./paginas/Login";
import Peliculas from "./paginas/Peliculas";
import Netflix from "./paginas/Netflix";
import Reproductor from "./paginas/Reproductor";
import Registro from "./paginas/Registro";
import Series from "./paginas/Series";
import ListaUsuario from "./paginas/ListaUsuario";

//Creamos dentro de la función App las rutas de nuestra aplicación usando router-dom
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/registro" element={<Registro />} />
        <Route exact path="/reproductor" element={<Reproductor />} />
        <Route exact path="/series" element={<Series />} />
        <Route exact path="/peliculas" element={<Peliculas />} />
        <Route exact path="/nuevo" element={<Reproductor />} />
        <Route exact path="/milista" element={<ListaUsuario />} />
        <Route exact path="/" element={<Netflix />} />
      </Routes>
    </BrowserRouter>
  );
}
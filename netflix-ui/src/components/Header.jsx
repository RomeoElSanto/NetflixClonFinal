import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";

//Función básica de header de la web donde añadimos el logo de Netflix y los botones para cambiar 
//entre registro y login de la página
export default function Header(props) {
  //props es usando en React como las funciones en Javascript, le pasamos argumentos.
  const navigate = useNavigate();
  return (
    <StyledHeader className="flex a-center j-between">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      {/*botón usado para cambiar entre login y registro,
      si props devuelve login, nos llevara a el y si no a registro con la 
      ayuda de la constante navigate*/ }
      <button onClick={() => navigate(props.login ? "/login" : "/registro")}>
        {props.login ? "Iniciar sesión" : "Registrarse"}
      </button>
    </StyledHeader>
  );
}

//css básico para formar la apariencia de la web original
const StyledHeader = styled.header`
  padding: 0 4rem;
  .logo {
    img {
      height: 5rem;
    }
  }
  button {
    padding: 0.5rem 1rem;
    background-color: #e50914;
    border: none;
    cursor: pointer;
    color: white;
    border-radius: 0.2rem;
    font-weight: bolder;
    font-size: 1.05rem;
  }
`;
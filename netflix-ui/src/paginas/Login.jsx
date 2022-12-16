import React, { useState } from "react";
import styled from "styled-components";
import logo from "../assets/logo.png";
import background from "../assets/login.jpg";
import { useNavigate } from "react-router-dom";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";

//Función Login con las variables de email y contraseña y el navegador para movernos a las páginas
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //Constante para implementar login con Firebase 
  const manejarLogin = async () => {
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      console.log(error.code);
    }
  };

  //Si nuestro usuario ya esta registrado y no cerramos sesión lleva a página Home
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/");
  });

  return (
    //Container para el menú de Login
    <Container>
      <BackgroundImage />
      <div className="content">
        <Header />
        <div className="form-container flex column a-center j-center">
          <div className="form flex column a-center j-center">
            <div className="title">
              <h3>Inicio de sesión</h3>
            </div>
            <div className="container flex column">
              <input
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <input
                type="password"
                placeholder="Contraseña"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
                {/*Al hacer click llama al inicio de sesión con Firebase */}
              <button onClick={manejarLogin}>Iniciar sesión en tu cuenta</button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
//Uso básico de css para darle la apariencia Netflix a la página
const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.5);
    grid-template-rows: 15vh 85vh;
    .form-container {
      gap: 2rem;
      height: 85vh;
      .form {
        padding: 2rem;
        background-color: #000000b0;
        width: 25vw;
        gap: 2rem;
        color: white;
        .container {
          gap: 2rem;
          input {
            padding: 0.5rem 1rem;
            width: 15rem;
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
        }
      }
    }
  }
`;

export default Login;
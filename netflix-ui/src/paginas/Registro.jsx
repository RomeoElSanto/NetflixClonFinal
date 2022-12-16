import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import { firebaseAuth } from "../utils/firebase-config";
function Registro() {
  //constante inicial para no mostrar el campo contraseña hasta que le digamos lo contrario
  const [showPassword, setShowPassword] = useState(false);
  //Constante estado para mantener los valores de sesión(solución más fácil)
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  //usamos la constante de manejar el registro para introducir a los usuarios que creamos en nuestra
  //BBDD en Firebase recogemos los valores con nuestro formValues y se introducen con la función que nos
  //brinda Firebase
  const manejarRegistro = async () => {
    try {
      const { email, password } = formValues;
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  //usamos esta función para comprobar si el usuario actual esta logeado y si es asi mandarlo a la página principal de la app
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/");
  });

  return (
    //Container que contendra los inputs para el registro con Email y Contraseña(no mostramos 
    //el campo contraseña hasta que nosotros lo requiramos)
    <Container showPassword={showPassword}>
      <BackgroundImage />
      <div className="content">
        <Header login />
        <div className="body flex column a-center j-center">
          <div className="text flex column">
            <h1>Películas ilimitadas, series y mucho más.</h1>
            <h4>Reproduce donde quieras, cancela cuando quieras.</h4>
            <h6>
              ¿Listo para ver películas? Registra tu email para comenzar a ver todo el contenido.
            </h6>
          </div>
          <div className="form">
            <input
              type="email"
              placeholder="Email"
              //Usamos formValues para almacenar el nuevo valor que se pueda introducir 
              //y pisar el antiguo pasando el name del input en este caso email y el value del input
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  [e.target.name]: e.target.value,
                })
              }
              name="email"
              value={formValues.email}
            />
            {showPassword && (
              <input
                type="password"
                placeholder="Contraseña"
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
                name="password"
                value={formValues.password}
              />
            )}
            {/*Si no muestra el campo contraseña aparece el boton de registro, de lo contrario
            aparece el boton de iniciar sesión */}
            {!showPassword && (
              <button onClick={() => setShowPassword(true)}>Registrate</button>
            )}
          </div>
          {showPassword && <button onClick={manejarRegistro}>Iniciar Sesión</button>}
        </div>
      </div>
    </Container>
  );
}
//Composición básica de css para centrar elementos y añadir la estética "Netflix"
const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 15vh 85vh;
    .body {
      gap: 1rem;
      .text {
        gap: 1rem;
        text-align: center;
        font-size: 2rem;
        h1 {
          padding: 0 25rem;
        }
      }
      .form {
        display: grid;
        grid-template-columns: ${({ showPassword }) =>
          showPassword ? "1fr 1fr" : "2fr 1fr"};
        width: 60%;
        input {
          color: black;
          border: none;
          padding: 1.5rem;
          font-size: 1.2rem;
          border: 1px solid black;
          &:focus {
            outline: none;
          }
        }
        button {
          padding: 0.5rem 1rem;
          background-color: #e50914;
          border: none;
          cursor: pointer;
          color: white;
          font-weight: bolder;
          font-size: 1.05rem;
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
    }
  }
`;

export default Registro;
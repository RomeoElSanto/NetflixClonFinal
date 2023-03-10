import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import backgroundImage from "../assets/home.jpg";
import MovieLogo from "../assets/homeTitle.webp";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { buscarPeliculas, getGeneros } from "../netflix";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Slider from "../components/Slider";
function Netflix() {
  const [isScrolled, setIsScrolled] = useState(false);
  const peliculas = useSelector((state) => state.netflix.movies);
  const generos = useSelector((state) => state.netflix.genres);
  const generosCargados = useSelector((state) => state.netflix.genresLoaded);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGeneros());
  }, []);

  //Llamamos a los géneros que pasamos desde el index.js donde cargamos la bbdd de películas
  useEffect(() => {
    if (generosCargados) {
      dispatch(buscarPeliculas({ genres: generos, type: "all" }));
    }
  }, [generosCargados]);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser) navigate("/login");
  });
  //Función en scroll para que al bajar en la pantalla principal tengamos siempre a la vista todo el menú de navegación, como pasa con Netflix
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    //Cuando el valor de Scroll sea diferente al de cero la barra de navegación tambien cambiara de color con ayuda del css.
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="hero">
        <img
          src={backgroundImage}
          alt="background"
          className="background-image"
        />
        <div className="container">
          <div className="logo">
            <img src={MovieLogo} alt="Movie Logo" />
          </div>
          <div className="buttons flex">
            <button
              onClick={() => navigate("/reproductor")}
              className="flex j-center a-center"
            >
              <FaPlay />
              Reproducir
            </button>
            <button className="flex j-center a-center">
              <AiOutlineInfoCircle />
              Más Información
            </button>
          </div>
        </div>
      </div>
      <Slider movies={peliculas} />
    </Container>
  );
}

const Container = styled.div`
  background-color: black;
  .hero {
    position: relative;
    .background-image {
      filter: brightness(60%);
    }
    img {
      height: 100vh;
      width: 100vw;
    }
    .container {
      position: absolute;
      bottom: 5rem;
      .logo {
        img {
          width: 100%;
          height: 100%;
          margin-left: 5rem;
        }
      }
      .buttons {
        margin: 5rem;
        gap: 2rem;
        button {
          font-size: 1.4rem;
          gap: 1rem;
          border-radius: 0.2rem;
          padding: 0.5rem;
          padding-left: 2rem;
          padding-right: 2.4rem;
          border: none;
          cursor: pointer;
          transition: 0.2s ease-in-out;
          &:hover {
            opacity: 0.8;
          }
          &:nth-of-type(2) {
            background-color: rgba(109, 109, 110, 0.7);
            color: white;
            svg {
              font-size: 1.8rem;
            }
          }
        }
      }
    }
  }
`;
export default Netflix;
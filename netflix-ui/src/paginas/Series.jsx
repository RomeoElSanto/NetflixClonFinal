import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import CardSlider from "../components/CardSlider";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { buscarPeliculas, getGeneros } from "../netflix";
import SelectGenre from "../components/SeleccionarGenero";
import Slider from "../components/Slider";

function TVShows() {
  const [isScrolled, setIsScrolled] = useState(false);
  const peliculas = useSelector((state) => state.netflix.movies);
  const generos = useSelector((state) => state.netflix.genres);
  const generosCargados = useSelector((state) => state.netflix.genresLoaded);
  const datosCargados = useSelector((state) => state.netflix.dataLoading);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!generos.length) dispatch(getGeneros());
  }, []);

  useEffect(() => {
    if (generosCargados) {
      dispatch(buscarPeliculas({ genres: generos, type: "tv" }));
    }
  }, [generosCargados]);

  const [user, setUser] = useState(undefined);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) setUser(currentUser.uid);
    else navigate("/login");
  });

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="data">
        <SelectGenre genres={generos} type="tv" />
        {peliculas.length ? (
          <>
            <Slider movies={peliculas} />
          </>
        ) : (
          <h1 className="not-available">
            No hay series disponibles para este género, por favor selecciona otro.
          </h1>
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  .data {
    margin-top: 8rem;
    .not-available {
      text-align: center;
      margin-top: 4rem;
    }
  }
`;
export default TVShows;
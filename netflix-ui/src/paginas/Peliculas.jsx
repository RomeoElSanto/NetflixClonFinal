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
import NotAvailable from "../components/NoDisponible";

function Peliculas() {
  const [isScrolled, setIsScrolled] = useState(false);
  const peliculas = useSelector((state) => state.netflix.movies);
  const generos = useSelector((state) => state.netflix.genres);
  const generosCargados = useSelector((state) => state.netflix.genresLoaded);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGeneros());
  }, []);

  useEffect(() => {
    if (generosCargados) {
      dispatch(buscarPeliculas({ genres: generos, type: "movie" }));
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
      <div className="navbar">
        <Navbar isScrolled={isScrolled} />
      </div>
      <div className="data">
        <SelectGenre genres={generos} type="movie" />
        {peliculas.length ? <Slider movies={peliculas} /> : <NotAvailable />}
      </div>
    </Container>
  );
}

const Container = styled.div`
  .data {
    margin-top: 8rem;
    .not-available {
      text-align: center;
      color: white;
      margin-top: 4rem;
    }
  }
`;
export default Peliculas;
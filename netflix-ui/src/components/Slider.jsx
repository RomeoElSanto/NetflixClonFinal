import React from "react";
import styled from "styled-components";
import CardSlider from "./CardSlider";
export default function Slider({ movies: peliculas }) {
  const getPeliculasPorRango = (from, to) => {
    return peliculas.slice(from, to);
  };
  return (
    <Container>
      <CardSlider data={getPeliculasPorRango(0, 10)} title="En tendencia" />
      <CardSlider data={getPeliculasPorRango(10, 20)} title="Nuevo en Netflix" />
      <CardSlider
        data={getPeliculasPorRango(20, 30)}
        title="Películas más taquilleras"
      />
      <CardSlider
        data={getPeliculasPorRango(30, 40)}
        title="Popular en Netflix"
      />
      <CardSlider data={getPeliculasPorRango(40, 50)} title="Películas de acción" />
      <CardSlider data={getPeliculasPorRango(50, 60)} title="Épico" />
    </Container>
  );
}

const Container = styled.div``;
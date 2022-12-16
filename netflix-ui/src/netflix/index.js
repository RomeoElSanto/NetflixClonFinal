import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY, TMDB_BASE_URL } from "../utils/constants";

const estadoInicial = {
  movies: [],
  genresLoaded: false,
  genres: [],
};

//Introducimos dentro de la constante getGeneros los generos proporcionados por el proveedor de la BBDD
export const getGeneros = createAsyncThunk("netflix/genres", async () => {
  const {
    data: { genres },
  } = await axios.get(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=3d39d6bfe362592e6aa293f01fbcf9b9"
  );
  return genres;
});

//Función donde introducimos los datos recogidos de la función anterior y le introducimos los datos a cada película
const createArrayFromRawData = (array, moviesArray, genres) => {
  array.forEach((movie) => {
    const generosPeliculas = [];
    movie.genre_ids.forEach((genre) => {
      const name = genres.find(({ id }) => id === genre);
      if (name) generosPeliculas.push(name.name);
    });
    if (movie.backdrop_path)
      moviesArray.push({
        id: movie.id,
        name: movie?.original_name ? movie.original_name : movie.original_title,
        image: movie.backdrop_path,
        genres: generosPeliculas.slice(0, 3),
      });
  });
};

//Funcion importante para recorrer los datos que nos devuelve la bbdd de películas
const getRawData = async (api, genres, paging = false) => {
  const arrayPeliculas = [];
  for (let i = 1; arrayPeliculas.length < 60 && i < 10; i++) {
    const {
      data: { results },
    } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
    createArrayFromRawData(results, arrayPeliculas, genres);
  }
  return arrayPeliculas;
};

export const buscarDatosPorGenero = createAsyncThunk(
  "netflix/genre",
  async ({ genre, type }, thunkAPI) => {
    const {
      netflix: { genres },
    } = thunkAPI.getState();
    return getRawData(
      `https://api.themoviedb.org/3/discover/${type}?api_key=3d39d6bfe362592e6aa293f01fbcf9b9&with_genres=${genre}`,
      genres
    );
  }
);

//Función para añadir las peliculas más vistas de la bbdd, en este caso limitado a semanal
export const buscarPeliculas = createAsyncThunk(
  "netflix/trending",
  async ({ type }, thunkAPI) => {
    const {
      netflix: { genres },
    } = thunkAPI.getState();
    return getRawData(
      `${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,
      genres,
      true
    );
  }
);

export const getPeliculasDeUsuarios = createAsyncThunk(
  "netflix/getLiked",
  async (email) => {
    const {
      data: { movies },
    } = await axios.get(`http://localhost:5000/api/user/liked/${email}`);
    return movies;
  }
);

export const borrarPeliculasDeLista = createAsyncThunk(
  "netflix/deleteLiked",
  async ({ movieId, email }) => {
    const {
      data: { movies },
    } = await axios.put("http://localhost:5000/api/user/remove", {
      email,
      movieId,
    });
    return movies;
  }
);

const NetflixSlice = createSlice({
  name: "Netflix",
  initialState: estadoInicial,
  extraReducers: (builder) => {
    builder.addCase(getGeneros.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.genresLoaded = true;
    });
    builder.addCase(buscarPeliculas.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(buscarDatosPorGenero.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(getPeliculasDeUsuarios.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(borrarPeliculasDeLista.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
  },
});

export const netflix = configureStore({
  reducer: {
    netflix: NetflixSlice.reducer,
  },
});

export const { setGeneros, setPeliculas } = NetflixSlice.actions;
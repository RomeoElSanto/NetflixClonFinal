const User = require("../models/UserModel");

module.exports.getLikedMovies = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await await User.findOne({ email });
    if (user) {
      return res.json({ msg: "correcto", movies: user.likedMovies });
    } else return res.json({ msg: "Email de usuario no encontrado." });
  } catch (error) {
    return res.json({ msg: "Error añadiendo películas." });
  }
};

module.exports.addToLikedMovies = async (req, res) => {
  try {
    const { email, data } = req.body;
    const user = await await User.findOne({ email });
    if (user) {
      const { likedMovies } = user;
      const movieAlreadyLiked = likedMovies.find(({ id }) => id === data.id);
      if (!movieAlreadyLiked) {
        await User.findByIdAndUpdate(
          user._id,
          {
            likedMovies: [...user.likedMovies, data],
          },
          { new: true }
        );
      } else return res.json({ msg: "Ya has añadido esta película." });
    } else await User.create({ email, likedMovies: [data] });
    return res.json({ msg: "Película añadida correctamente." });
  } catch (error) {
    return res.json({ msg: "Error añadiendo la película a la lista." });
  }
};

module.exports.removeFromLikedMovies = async (req, res) => {
  try {
    const { email, movieId } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const movies = user.likedMovies;
      const movieIndex = movies.findIndex(({ id }) => id === movieId);
      if (!movieIndex) {
        res.status(400).send({ msg: "Película no encontrada." });
      }
      movies.splice(movieIndex, 1);
      await User.findByIdAndUpdate(
        user._id,
        {
          likedMovies: movies,
        },
        { new: true }
      );
      return res.json({ msg: "Película borrada correctamente.", movies });
    } else return res.json({ msg: "Email de usuario no encontrado." });
  } catch (error) {
    return res.json({ msg: "Error borrando película de la lista." });
  }
};
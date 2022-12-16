const mongoose = require("mongoose");
//Parámetros de la tabla usuarios para guardar las películas del usuario.
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  likedMovies: Array,
});

module.exports = mongoose.model("users", userSchema);
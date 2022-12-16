//Importación predeterminada para conexión con Firebase
import { initializeApp } from "firebase/app";
//Añadido por nosotros para su uso con los correos de registro en la aplicación
import { getAuth }  from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDXCNNZvNy9ZFsBnhBpCr47J0pmoM7MbII",
  authDomain: "react-netflix-clone-92ab0.firebaseapp.com",
  projectId: "react-netflix-clone-92ab0",
  storageBucket: "react-netflix-clone-92ab0.appspot.com",
  messagingSenderId: "292468551393",
  appId: "1:292468551393:web:fbf1d1a6209b83e46651a0",
  measurementId: "G-2CR0JKFZMJ"
};


const app = initializeApp(firebaseConfig);

export const firebaseAuth   =   getAuth(app);
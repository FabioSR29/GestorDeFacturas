import { useState } from "react";
import React from "react";
import Home from './Componentes/Home';
import Login from './Componentes/Login';

import appFirebase from "./Credenciales";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth(appFirebase);


function App() {
    const [usuario, setUsuario] = useState(true);

        onAuthStateChanged(auth, (usuarioFirebase) => {
            if (usuarioFirebase) {
                setUsuario(usuarioFirebase)
                console.log(usuarioFirebase)
            } else {
                setUsuario(null)
                console.log(usuarioFirebase)
            }
        })


    return (
        <div>
            {usuario ?  <Home correoUsuario= {usuario.email}/>:<Login/>  }
        </div>
    )
}

export default App;
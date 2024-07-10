import { useState } from "react";
import React from "react";
import Login from './Componentes/Home';
import Home from './Componentes/Login';

import appFirebase from "./Credenciales";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth(appFirebase);


function App() {
    const [usuario, setUsuario] = useState(null);

    onAuthStateChanged(auth, (usuarioFirebase) => {
        if (usuarioFirebase) {
            setUsuario(usuarioFirebase)
        } else {
            setUsuario(null)
        }
    })


    return (
        <div>
            {usuario ?  <Home correoUsuario= {usuario.email}/>:<Login/>  }
        </div>
    )
}

export default App;
import { useState } from "react";
import React from "react";
import Facturas from "./Ingreso Facturas";

import appFirebase from "../Credenciales";
import { getAuth, signOut } from "firebase/auth";
const auth = getAuth(appFirebase);

function Home({ correoUsuario }) {

    const [EstadoFacturas, setEstadoFacturas] = useState(false);

    return (

        <div className=" container">
            <div>
                <p className="mr-1">Bienvenido <strong>{correoUsuario}</strong></p>
                <button className="btn btn-primary" onClick={() => { signOut(auth) }}>Cerrar sesión</button>

            </div>

            <ul className="nav nav-tabs mt-2 mb-2">
                <li className="nav-item">
                    <button className="nav-link active" aria-current="page" onClick={() => { setEstadoFacturas(!EstadoFacturas) }}>Imprimir Facturas</button>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Registrar productos</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Registrar servicios</a>
                </li>

            </ul>

            {EstadoFacturas &&
                <Facturas></Facturas>
            }

        </div>




    )
}

export default Home;
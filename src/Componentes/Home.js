import { useState } from "react";
import React from "react";
import Facturas from "./Ingreso Facturas";
import Productos from "./Ingreso Productos";
import Servicios from "./Ingreso Servicios";

import appFirebase from "../Credenciales";
import { getAuth, signOut } from "firebase/auth";
const auth = getAuth(appFirebase);

function Home({ correoUsuario }) {

    const [EstadoFacturas, setEstadoFacturas] = useState(true);
    const [EstadoProductos, setEstadoProductos] = useState(false);
    const [EstadoServicios, setEstadoServicios] = useState(false);
    const [activeTab, setActiveTab] = useState('Imprimir Facturas');

    function cambiarEstado(action) {
        switch (action) {
            case 'imprimir':
                setActiveTab('Imprimir Facturas');
                setEstadoFacturas(true)
                setEstadoProductos(false)
                setEstadoServicios(false)
                break;
            case 'productos':
                setActiveTab('Registrar productos');
                setEstadoProductos(true)
                setEstadoFacturas(false)
                setEstadoServicios(false)
                break;
            case 'servicios':
                setActiveTab('Registrar servicios');
                setEstadoServicios(true)
                setEstadoProductos(false)
                setEstadoFacturas(false)
                break;
            default:
                console.log('Acción no reconocida');
        }
    }
    return (

        <div className=" container">
            <div>
                <p className="mr-1">Bienvenido <strong>{correoUsuario}</strong></p>
                <button className="btn btn-primary" onClick={() => { signOut(auth) }}>Cerrar sesión</button>

            </div>

            <ul className="nav nav-tabs mt-2 mb-2">
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'Imprimir Facturas' ? 'active' : ''}`}
                        aria-current={activeTab === 'Imprimir Facturas' ? 'page' : undefined}
                        onClick={() => { cambiarEstado('imprimir') }}
                    >
                        Imprimir Facturas
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'Registrar productos' ? 'active' : ''}`}
                        href="#"
                        aria-current={activeTab === 'Registrar productos' ? 'page' : undefined}
                        onClick={() => { cambiarEstado('productos') }}
                    >
                        Registrar productos
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'Registrar servicios' ? 'active' : ''}`}
                        href="#"
                        aria-current={activeTab === 'Registrar servicios' ? 'page' : undefined}
                        onClick={() => { cambiarEstado('servicios') }}
                    >
                        Registrar servicios
                    </button>
                </li>
            </ul>

            {EstadoFacturas &&
                <Facturas></Facturas>
            }

            {EstadoProductos &&
                <Productos></Productos>
            }
            {EstadoServicios &&
                <Servicios></Servicios>
            }

        </div>




    )
}

export default Home;
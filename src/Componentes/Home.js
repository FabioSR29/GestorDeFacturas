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
            case 'Inventarios':
                setActiveTab('Inventarios');
                break;
            case 'Factura Electronica':
                setActiveTab('Factura Electronica');
                break;

            default:
                console.log('Acción no reconocida');
        }
    }
    return (

        <div className="">
            <div className="row">
                <div className="col-md-auto">
                    <div className="d-flex flex-row p-2">
     
                        <button className="Btn m-2"  onClick={() => { signOut(auth) }}>

                            <div className="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>

                            <div className="text">Salir</div>
                        </button>
                        <p className="mr-1">Bienvenido <strong>{correoUsuario}</strong></p>
                    </div>
                </div>


                <div className="col-md-auto">
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
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === 'Inventarios' ? 'active' : ''}`}
                                href="#"
                                aria-current={activeTab === 'Inventarios' ? 'page' : undefined}
                                onClick={() => { cambiarEstado('Inventarios') }}
                            >
                                Control de inventarios
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === 'Factura Electronica' ? 'active' : ''}`}
                                href="#"
                                aria-current={activeTab === 'Factura Electronica' ? 'page' : undefined}
                                onClick={() => { cambiarEstado('Factura Electronica') }}
                            >
                                Facturacion electronica
                            </button>
                        </li>
                    </ul>

                </div>

            </div>

            <div className="row">
                <div className="col-1">

                </div>
                <div className="col-11">
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

            </div>


        </div>




    )
}

export default Home;
import MostrarFactura from './Mostrar factura';
import React from "react";
import { useState } from 'react';
import appFirebase from '../Credenciales';
import { getFirestore, collection, doc, getDocs } from "firebase/firestore";

const db = getFirestore(appFirebase)

function Facturas() {

    const [ListaFacturas, setListaFacturas] = useState([]);

    const getListaFacturas = async () => {
        try {


            const querySnapshot = await getDocs(collection(db, 'Facturas'))
            const docs = []
            querySnapshot.forEach((doc) => {
                docs.push({ ...doc.data(), id: doc.id })
            })
            setListaFacturas(docs);


        } catch (error) {
            console.log(error)
        }
        console.log(ListaFacturas)
    }

    return (

        <div>
            <h1 className="text-center">Lista de Facturas</h1>

            {ListaFacturas.length !== 0 ? (
                <div className='contenedorFacturas'>
                    {ListaFacturas.map((list) => (
                        <div key={list.id}>
                           <MostrarFactura  FacturaFinal={list} Lugar={"Facturas"}></MostrarFactura>
                           
                        </div>
                    ))}

                </div>
            ) :
                <button onClick={getListaFacturas} className="btn btn-primary m-5" >Cargar lista</button>

            }

        </div>
    )
}
export default Facturas;
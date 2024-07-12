import { useState } from "react";
import React from "react";
import appFirebase from '../Credenciales'
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, getDoc, doc, deleteDoc, getDocs, setDoc } from "firebase/firestore";


const auth = getAuth(appFirebase)
const db = getFirestore(appFirebase)

function Productos() {


    const valorInicial = {
        Nombre: '',
        descripcion: '',
        codigo: '',
        precio: '',
        cantidad: '',
        fecha: ''
    }

    const [User, setUser] = useState(valorInicial)

    const capturarInputs = (e) => {
        const { name, value } = e.target;
        setUser({ ...User, [name]: value })
    }

    const guardarDatos = async (e) => {
        e.preventDefault();
        try {
            
            await addDoc(collection(db, 'Productos'),{ ...User })

        } catch (error) {
                console.log(error)
        }
        setUser(valorInicial)
    }


    return (


        <div className="row">
            <div className="col-md-4">
                <h1>Ingrese los datos del producto</h1>
                <form onSubmit={guardarDatos}>
                    <div className="card card-body">
                        <div className="form-group">
                            <input type="text" name="Nombre" className="form-control mb-3" placeholder="Ingrese el nombre del producto" onChange={capturarInputs} value={User.Nombre}></input>
                            <input type="text" name="descripcion" className="form-control mb-3" placeholder="Ingrese una descripción" onChange={capturarInputs} value={User.descripcion}></input>
                            <input type="text" name="codigo" className="form-control mb-3" placeholder="Ingrese el codigo" onChange={capturarInputs} value={User.codigo}></input>
                            <input type="number" name="precio" className="form-control mb-3" placeholder="Ingrese el precio" onChange={capturarInputs} value={User.precio}></input>
                            <input type="number" name="cantidad" className="form-control mb-3" placeholder="Ingrese la cantidad" onChange={capturarInputs} value={User.cantidad}></input>
                            <input type="date" name="fecha" className="form-control mb-3" placeholder="Ingrese la fecha de la compra" onChange={capturarInputs} value={User.fecha}></input>
                        </div>
                        <button className="btn btn-primary">Guardar</button>
                    </div>
                </form>
            </div>

            <div className="col-md-8">
                <h1 className="text-center">Lista de productos</h1>

            </div>


        </div>


    )
}

export default Productos;
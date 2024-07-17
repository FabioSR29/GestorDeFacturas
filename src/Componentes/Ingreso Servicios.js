import { useEffect, useState } from "react";
import React from "react";
import appFirebase from '../Credenciales'
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, getDoc, doc, deleteDoc, getDocs, setDoc } from "firebase/firestore";


const auth = getAuth(appFirebase)
const db = getFirestore(appFirebase)

function Servicios() {


    const valorInicial = {
        Nombre: '',
        descripcion: '',
        codigo: '',
        precio: '',
        fecha: ''
    }

    const [Servicios, setServicios] = useState(valorInicial)
    const [Lista, setLista] = useState([]);
    const [IdGuia, setIdGuia] = useState("");

    const capturarInputs = (e) => {
        const { name, value } = e.target;
        setServicios({ ...Servicios, [name]: value })
    }

    const guardarDatos = async (e) => {
        e.preventDefault();
        if (IdGuia === '') {
            try {

                await addDoc(collection(db, 'Servicios'), { ...Servicios })

            } catch (error) {
                console.log(error)
            }
        } else {
            await setDoc(doc(db,"Servicios",IdGuia),{
                ...Servicios
            })
        }

        setServicios(valorInicial)
        setIdGuia('')
    }


    useEffect(() => {
        const getLista = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'Servicios'))
                const docs = []
                querySnapshot.forEach((doc) => {
                    docs.push({ ...doc.data(), id: doc.id })
                })
                setLista(docs);
            } catch (error) {
                console.log(error)
            }
        }
        getLista()
    }, [Lista])

    const DeleteService = async (id) => {
        await deleteDoc(doc(db, "Servicios", id))
    }

    const ObtengaElservicio = async (id) => {
        const docRef = doc(db, "Servicios", id)
        const docsnap = await getDoc(docRef)
        setServicios(docsnap.data())
    }

    useEffect(() => {
        if (IdGuia !== '') {
            ObtengaElservicio(IdGuia);
        }

    }, [IdGuia])

    return (


        <div className="row">
            <div className="col-md-4">
                <h1>Ingrese los servicios que ofrecerá</h1>
                <form onSubmit={guardarDatos}>
                    <div className="card card-body">
                        <div className="form-group">
                            <input type="text" name="Nombre" className="form-control mb-3" placeholder="Ingrese el nombre del producto" onChange={capturarInputs} value={Servicios.Nombre}></input>
                            <input type="text" name="descripcion" className="form-control mb-3" placeholder="Ingrese una descripción" onChange={capturarInputs} value={Servicios.descripcion}></input>
                            <input type="text" name="codigo" className="form-control mb-3" placeholder="Ingrese el codigo" onChange={capturarInputs} value={Servicios.codigo}></input>
                            <input type="number" name="precio" className="form-control mb-3" placeholder="Ingrese el precio" onChange={capturarInputs} value={Servicios.precio}></input>
                            <input type="date" name="fecha" className="form-control mb-3" placeholder="Ingrese la fecha de la compra" onChange={capturarInputs} value={Servicios.fecha}></input>
                        </div>
                        <button className="btn btn-primary">{IdGuia==='' ? 'Guardar':'Actualizar'}</button>
                    </div>
                </form>
            </div>

            <div className="col-md-8">
                <h1 className="text-center">Lista de servicios</h1>


                <div className="container card">
                    <div className="card-body">
                        {Lista.map((list) => (
                            <div key={list.id}>
                                <p>Nombre: {list.Nombre}</p>
                                <p>Descripcion: {list.descripcion}</p>
                                <p>Codigo: {list.codigo}</p>
                                <p>Precio: {list.precio}</p>
                                <p>Fecha de ingreso: {list.fecha}</p>

                                <button className="btn btn-danger" onClick={() => DeleteService(list.id)}>Eliminar</button>
                                <button className="btn btn-success m-2" onClick={() => setIdGuia(list.id)}>Actualizar</button>
                                <hr></hr>
                            </div>
                        ))}
                    </div>
                </div>

            </div>


        </div>


    )
}

export default Servicios;
import { useEffect, useState } from "react";
import React from "react";
import appFirebase from '../Credenciales'
import { getFirestore, collection, addDoc, getDoc, doc, deleteDoc, getDocs, setDoc } from "firebase/firestore";



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

    const [Producto, setProducto] = useState(valorInicial)
    const [Lista, setLista] = useState([]);
    const [IdGuia, setIdGuia] = useState("");

    const capturarInputs = (e) => {
        const { name, value } = e.target;
        setProducto({ ...Producto, [name]: value })
    }

    const guardarDatos = async (e) => {
        e.preventDefault();
        if (IdGuia === '') {
            try {

                await addDoc(collection(db, 'Productos'), { ...Producto })
                getLista()
            } catch (error) {
                console.log(error)
            }
        } else {
            await setDoc(doc(db, "Productos", IdGuia), {
                ...Producto
            })
            getLista()
        }

        setProducto(valorInicial)
        setIdGuia('')
    }


    const getLista = async () => {
        try {


            const querySnapshot = await getDocs(collection(db, 'Productos'))
            const docs = []
            querySnapshot.forEach((doc) => {
                docs.push({ ...doc.data(), id: doc.id })
            })
            setLista(docs);


        } catch (error) {
            console.log(error)
        }
    }

    const DeleteProduct = async (id) => {
        console.log(id)
        await deleteDoc(doc(db, "Productos", id))
    }
    const ObtengaElproducto = async (id) => {
        const docRef = doc(db, "Productos", id)
        const docsnap = await getDoc(docRef)
        setProducto(docsnap.data())
    }

    useEffect(() => {
        if (IdGuia !== '') {
            ObtengaElproducto(IdGuia);
        }
    }, [IdGuia])

    return (


        <div className="row">
            <div className="col-md-4">
                <h1>Ingrese los datos del producto</h1>
                <form onSubmit={guardarDatos}>
                    <div className="card card-body">
                        <div className="form-group">
                            <input type="text" name="Nombre" className="form-control mb-3" placeholder="Ingrese el nombre del producto" onChange={capturarInputs} value={Producto.Nombre}></input>
                            <input type="text" name="descripcion" className="form-control mb-3" placeholder="Ingrese una descripción" onChange={capturarInputs} value={Producto.descripcion}></input>
                            <input type="text" name="codigo" className="form-control mb-3" placeholder="Ingrese el codigo" onChange={capturarInputs} value={Producto.codigo}></input>
                            <input type="number" name="precio" className="form-control mb-3" placeholder="Ingrese el precio" onChange={capturarInputs} value={Producto.precio}></input>
                            <input type="number" name="cantidad" className="form-control mb-3" placeholder="Ingrese la cantidad" onChange={capturarInputs} value={Producto.cantidad}></input>
                            <input type="date" name="fecha" className="form-control mb-3" placeholder="Ingrese la fecha de la compra" onChange={capturarInputs} value={Producto.fecha}></input>
                        </div>
                        <button className="btn btn-primary">{IdGuia === '' ? 'Guardar' : 'Actualizar'}</button>
                    </div>
                </form>
            </div>

            <div className="col-md-8">
                <h1 className="text-center">Lista de productos</h1>

                {Lista.length !== 0 ? (
                    <div>    </div>
                ) :
                    <button onClick={getLista} className="btn btn-primary m-5" >Cargar lista</button>

                }
                <div className="container card">
                    <div className="card-body">
                        {Lista.map((list) => (
                            <div key={list.id}>
                                <p>Nombre: {list.Nombre}</p>
                                <p>Descripcion: {list.descripcion}</p>
                                <p>Codigo: {list.codigo}</p>
                                <p>Precio: {list.precio}</p>
                                <p>Cantidad: {list.cantidad}</p>
                                <p>Fecha de ingreso: {list.fecha}</p>

                                <button className="btn btn-danger" onClick={() => DeleteProduct(list.id)}>Eliminar</button>
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

export default Productos;

import '../App.css';
import { useEffect, useState } from 'react';
import appFirebase from '../Credenciales'
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, getDoc, doc, deleteDoc, getDocs, setDoc } from "firebase/firestore";


const auth = getAuth(appFirebase)
const db = getFirestore(appFirebase)

function IngresoDeFacturas() {

  const [Productos, setProductos] = useState([]);
  const [Servicios, setServicios] = useState([]);
  const [seleccion, setSeleccion] = useState('')
  useEffect(() => {
    const getLista = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Productos'))
        const docs = []
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id })
        })
        setProductos(docs);
      } catch (error) {
        console.log(error)
      }
    }
    getLista()
  }, [Productos])
  useEffect(() => {
    const getLista = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Servicios'))
        const docs = []
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id })
        })
        setServicios(docs);
      } catch (error) {
        console.log(error)
      }
    }
    getLista()
  }, [Servicios])

  const TipoSeleccionado = (event) => {
    setSeleccion(event.target.value)
  };

  const [formulario, setformulario] = useState(true);
  const [factura, setfactura] = useState(false);
  const [productoID, setProductoID] = useState(0);
  const [Producto, setProducto] = useState("");
  const [nombreCliente, setnombreCliente] = useState("");
  const [descripcion, setdescripcion] = useState("");
  const [cantidad, setcantidad] = useState(0);
  const [Precio, setPrecio] = useState(0);
  const [FechaEntrada, setfechaEntrada] = useState("");
  const [FechaSalida, setfechaSalida] = useState(new Date().toISOString().split('T')[0]);
  const [Descuento, setDescuento] = useState(0);
  const [Descuentos, setDescuentos] = useState(0);
  const [Subtotal, setSubtotal] = useState(0);
  const [Total, setTotal] = useState(0);
  const Swal = require('sweetalert2')
  const [ListaProductos, setListaProductos] = useState([]);

  function CargarLosNuevosValoresDeProducto(event) {
    setProducto(event.target.value);
  }
  function CargarLosNuevosValoresDeDescripción(event) {
    setdescripcion(event.target.value);
  }
  function CargarLosNuevosValoresDeCantidad(event) {
    setcantidad(parseFloat(event.target.value) || 0);
  }
  function CargarLosNuevosValoresDeNombre(event) {
    setnombreCliente(event.target.value);
  }
  function CargarLosNuevosValoresDePrecio(event) {
    setPrecio(parseFloat(event.target.value) || 0);
  }
  function CargarLosNuevosValoresDeFechaEntrada(event) {
    setfechaEntrada(event.target.value);
  }
  function CargarLosNuevosValoresDeFechaSalida(event) {
    setfechaSalida(event.target.value);
  }
  function CargarLosNuevosValoresDelDescuento(event) {
    setDescuento(parseFloat(event.target.value) || 0);
  }




  function AgregarProducto() {


    var producto = {
      productoID: productoID,
      nombre: Producto,
      descripcion: descripcion,
      cantidad: cantidad,
      precio: Precio,
      Descuento: Descuento,
      Total: (Precio * cantidad) - Descuento
    }

    ListaProductos.push(producto)

    setPrecio(0);
    setcantidad(0);
    setdescripcion("");
    setProducto("");
    setDescuento(0);
    setProductoID(ListaProductos.length)

    console.log(ListaProductos)

  }

  function Limpiar() {
    setfechaEntrada("");
    setfechaSalida("");
    setPrecio(0);
    setnombreCliente("");
    setcantidad(0);
    setdescripcion("");
    setProducto("");

    setListaProductos([])
  }

  function Imprimir() {
    if (ListaProductos.length == 0) {
      Swal.fire({
        icon: "warning",
        title: "Revisa los datos",
        text: "Debe agregar al menos un producto a la lista"
      });
    } else {
      var Descuentos = 0;
      var Subtotall = 0;
      var ttotal = 0;

      ListaProductos.forEach(element => {
        Descuentos += element.Descuento;
        ttotal += element.Total;
        Subtotall += element.precio;
      });

      setTotal(ttotal);
      setSubtotal(Subtotall);
      setDescuentos(Descuentos)
      setfactura(true)
      setformulario(false)
    }

  }

  return (
    <div className="App">

      {formulario &&
        <div className='contenedor'>
          <div className="formulario">
            <h1>Ingrese los datos del Producto</h1>

            <div className="Ingresos">

              <h2>Datos del cliente</h2>
              <span><strong>Nombre del cliente:</strong></span>
              <input type='text' onChange={CargarLosNuevosValoresDeNombre} value={nombreCliente} required></input>
              <span><strong>Fecha Entrada:</strong></span>
              <input type='date' onChange={CargarLosNuevosValoresDeFechaEntrada} value={FechaEntrada} required></input>
              <span><strong>Fecha Salida:</strong></span>
              <input type='date' onChange={CargarLosNuevosValoresDeFechaSalida} value={FechaSalida}></input>

              <h2>Datos del producto</h2>

              <span><strong>¿Producto o servicio?</strong></span>
              <div>
                <input className="m-3" type="radio" id="producto" name="tipo" value="producto" checked={seleccion === 'producto'} onChange={TipoSeleccionado} />
                <label htmlFor="producto">Producto</label>
                <input className="m-3" type="radio" id="servicio" name="tipo" value="servicio" checked={seleccion === 'servicio'} onChange={TipoSeleccionado} />
                <label htmlFor="servicio">Servicio</label>
              </div>


              <span><strong>Nombre producto o servicio:</strong></span>
              {seleccion === 'producto' ?
                <select>
                  {Productos.map((list) => (
                    <option key={list.id}>{list.Nombre}</option>
                  ))}

                </select>
                :
                <select>
                  {Servicios.map((list) => (
                    <option key={list.id}>{list.Nombre}</option>
                  ))}

                </select>
              }



              <span><strong>Descripcion:</strong></span>
              <input type='text' onChange={CargarLosNuevosValoresDeDescripción} value={descripcion} required></input>
              {seleccion === 'producto' ?
              <div >
                   <span ><strong>Cantidad:</strong></span>
                   <input type='number' onChange={CargarLosNuevosValoresDeCantidad} value={cantidad.toString()} required></input>
              </div>
           
              :
             <div></div>
              }


              <span><strong>Precio:</strong></span>
              <input type='number' onChange={CargarLosNuevosValoresDePrecio} value={Precio.toString()} required></input>
              <span><strong>Descuento:</strong></span>
              <input type='number' onChange={CargarLosNuevosValoresDelDescuento} value={Descuento.toString()} ></input>
              <button onClick={AgregarProducto} className='btnAgregar'>+ Nuevo</button>
              <div className="Botones">

                <button className="btn1" onClick={Imprimir}>Imprimir</button>
                <button className="btn2" onClick={Limpiar}>Limpiar</button>
              </div>

            </div>

          </div>
          <ul className='formulario'>
            {ListaProductos.map(product => (

              <li className='' key={product.productoID}>{product.nombre}

                <button className='btnB' onClick={() => {
                  setListaProductos(
                    ListaProductos.filter(p =>
                      p.productoID !== product.productoID
                    )
                  );
                }} >Eliminar
                </button>

              </li>
            ))}
          </ul>
        </div >
      }





    </div >
  );
}

export default IngresoDeFacturas;

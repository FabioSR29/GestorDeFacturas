
import '../App.css';
import { useEffect, useState } from 'react';
import appFirebase from '../Credenciales'
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, getDoc, doc, deleteDoc, getDocs, setDoc } from "firebase/firestore";


const auth = getAuth(appFirebase)
const db = getFirestore(appFirebase)

function IngresoDeFacturas() {

  const valorInicial = {
    id: '',
    Nombre: '',
    descripcion: '',
    cantidad: '',
    precio: '',
    Descuento: ''
  }
  const Swal = require('sweetalert2')
  const [Productos, setProductos] = useState([]);
  const [Servicios, setServicios] = useState([]);
  const [seleccion, setSeleccion] = useState('');
  const [ElementoSeleccionado, setElementoSelecionado] = useState(valorInicial);
  const [ListaArticulos, setListaArticulos] = useState([]);
  const [cantidad, setcantidad] = useState(0);
  const [Descuento, setDescuento] = useState(0);

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


  const AutoCompletarSeleccion = (event) => {
    const nombre = event.target.value;
    let seleccionado;
    if (nombre === 'selecciona una opción') {
      setElementoSelecionado(valorInicial)
    } else {
      if (seleccion === 'producto') {
        seleccionado = Productos.find((p) => p.Nombre === nombre);
        setElementoSelecionado({
          ...valorInicial,
          ...seleccionadoFiltrado(seleccionado)
        });
        console.log(ElementoSeleccionado)
      } else {
        seleccionado = Servicios.find((s) => s.Nombre === nombre);
        setElementoSelecionado({
          ...valorInicial,
          ...seleccionadoFiltrado(seleccionado)
        });
      }

    }
  }

  const seleccionadoFiltrado =(seleccionado)=> Object.keys(valorInicial).reduce((obj, key) => {
    if (seleccionado.hasOwnProperty(key)) {
      obj[key] = seleccionado[key];
    }
    return obj;
  }, {});

  const AgregarArticulos = () => {
    Swal.fire({
      title: "¿Agregar?",
      showDenyButton: true,
      confirmButtonText: "Agregar",
      denyButtonText: `cancelar`
    }).then((result) => {
     
      if (result.isConfirmed) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Se agregó a la lista",
          showConfirmButton: false,
          timer: 1000
        });
        ElementoSeleccionado.cantidad = cantidad;
        ElementoSeleccionado.Descuento=Descuento;
        ListaArticulos.push(ElementoSeleccionado)
        setElementoSelecionado(valorInicial)
        Limpiar()
      } else if (result.isDenied) {
        Swal.fire("Revisa los datos", "", "info");
      }
    });
   
  
  }
  function EliminarDeLista(product){
    Swal.fire({
      title: "¿Seguro?",
      showDenyButton: true,
      confirmButtonText: "Eliminar",
      denyButtonText: `cancelar`
    }).then((result) => {
     
      if (result.isConfirmed) {
        ListaArticulos.filter(p =>
          p.id !== product.id
        )
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Eliminado",
          showConfirmButton: false,
          timer: 1000
        });
      } else if (result.isDenied) {
        Swal.fire({
          position: "top-end",
          icon: "info",
          title: "Operacion cancelada",
          showConfirmButton: false,
          timer: 500
        });
      }
    });
  }

  function CargarLosNuevosValoresDelDescuento(event) {
    setDescuento(parseFloat(event.target.value) || 0);
  }

  function CargarLosNuevosValoresDeCantidad(event) {
    setcantidad(event.target.value);
  }

  const [formulario, setformulario] = useState(true);
  const [nombreCliente, setnombreCliente] = useState("");
  const [Precio, setPrecio] = useState(0);
  const [FechaEntrada, setfechaEntrada] = useState("");
  const [FechaSalida, setfechaSalida] = useState(new Date().toISOString().split('T')[0]);

  const [Descuentos, setDescuentos] = useState(0);
  const [Subtotal, setSubtotal] = useState(0);
  const [Total, setTotal] = useState(0);
  
  const [ListaProductos, setListaProductos] = useState([]);


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

  function Limpiar() {
    setfechaEntrada("");
    setfechaSalida("");
    setnombreCliente("");
    setcantidad('')
    setElementoSelecionado(valorInicial)
    setSeleccion('')
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
              {seleccion === 'producto' ? (
                <select onChange={AutoCompletarSeleccion}>
                  <option>selecciona una opción</option>
                  {Productos.map((list) => (
                    <option key={list.id}>{list.Nombre}</option>
                  ))}
                </select>
              ) : seleccion === 'servicio' ? (
                <select onChange={AutoCompletarSeleccion}>
                  <option>selecciona una opción</option>
                  {Servicios.map((list) => (
                    <option key={list.id}>{list.Nombre}</option>
                  ))}
                </select>
              ) : (
                <select >
                  <option>selecciona una opción</option>
                </select>
              )}




              <span><strong>Descripcion:</strong></span>
              <input type='text' onChange={AutoCompletarSeleccion} value={ElementoSeleccionado.descripcion} required></input>
              <span><strong>Precio:</strong></span>
              <input type='number' onChange={CargarLosNuevosValoresDePrecio} value={ElementoSeleccionado.precio} required></input>

              {seleccion === 'producto' ?
                <div >
                  <span ><strong>Cantidad:</strong></span>
                  <input type='number' onChange={CargarLosNuevosValoresDeCantidad} value={cantidad.toString()} required></input>
                </div>

                :
                <div></div>
              }



              <span><strong>Descuento:</strong></span>
              <input type='number' onChange={CargarLosNuevosValoresDelDescuento} value={Descuento.toString()} ></input>
              <button onClick={AgregarArticulos} className='btnAgregar'>+ Nuevo</button>
              <div className="Botones">

                <button className="btn1" onClick={Imprimir}>Imprimir</button>
                <button className="btn2" onClick={Limpiar}>Limpiar</button>

              </div>

            </div>

          </div>
          <ul className='formulario'>
            {ListaArticulos.map(product => (

              <li className='' key={product.id}>{product.Nombre}

                <button className='btnB' onClick={() => {
                  EliminarDeLista(product)
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

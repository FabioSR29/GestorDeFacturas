
import '../App.css';
import { useState } from 'react';
import appFirebase from '../Credenciales';
import MostrarFactura from './Mostrar factura';
import { getFirestore, addDoc, collection, getDocs } from "firebase/firestore";



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
  const FacturaEstructura = {
    NombreDeCliente: '',
    FechaEntrada: '',
    FechaSalida: '',
    ListaArticulos: '',
    Descuentos: '',
    Subtotal: '',
    Total: '',
    IVA: ''
  }
  const Swal = require('sweetalert2')
  const [formulario, setformulario] = useState(true);
  const [mostrarFactura, setMostrarFactura] = useState(false);
  const [nombreCliente, setnombreCliente] = useState("");
  const [FechaEntrada, setfechaEntrada] = useState("");
  const [FechaSalida, setfechaSalida] = useState(new Date().toISOString().split('T')[0]);
  const [Productos, setProductos] = useState([]);
  const [Servicios, setServicios] = useState([]);
  const [seleccion, setSeleccion] = useState('');
  const [ElementoSeleccionado, setElementoSelecionado] = useState(valorInicial);
  const [FacturaFinal, setFacturaFinal] = useState(FacturaEstructura)
  const [ListaArticulos, setListaArticulos] = useState([]);
  const [cantidad, setcantidad] = useState(1);
  const [Descuento, setDescuento] = useState(0);


  const getListaProductos = async () => {
    if (Productos.length === 0) {
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

  }


  const getListaServicios = async () => {
    if (Servicios.length === 0) {
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
  }
  const guardarFactura = async () => {
    try {

      await addDoc(collection(db, 'Facturas'), { ...FacturaFinal })
   
    } catch (error) {
      console.log(error)
    }
  }


  const TipoSeleccionado = (event) => {
    setSeleccion(event.target.value)

    if (event.target.value === "servicio") {
      getListaServicios()
    }
    if (event.target.value === "producto") {
      getListaProductos()
    }

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

      } else {
        seleccionado = Servicios.find((s) => s.Nombre === nombre);
        setElementoSelecionado({
          ...valorInicial,
          ...seleccionadoFiltrado(seleccionado)
        });
      }

    }
  }

  const seleccionadoFiltrado = (seleccionado) => Object.keys(valorInicial).reduce((obj, key) => {
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
        ElementoSeleccionado.Descuento = Descuento;
        ElementoSeleccionado.precio = ElementoSeleccionado.precio * cantidad;
        ListaArticulos.push(ElementoSeleccionado)
console.log(ElementoSeleccionado)
        var Descuentos = 0;
        var Subtotall = 0;

        ListaArticulos.forEach(element => {
          Descuentos += element.Descuento;
          Subtotall += parseFloat(element.precio);
        });

        FacturaEstructura.NombreDeCliente = nombreCliente
        FacturaEstructura.FechaEntrada = FechaEntrada
        FacturaEstructura.FechaSalida = FechaSalida
        FacturaEstructura.ListaArticulos = ListaArticulos
        FacturaEstructura.Descuentos = Descuentos
        FacturaEstructura.Subtotal = Subtotall
        FacturaEstructura.Total = Subtotall - Descuentos
        FacturaEstructura.IVA = FacturaEstructura.Total * 0.13;
        setFacturaFinal(FacturaEstructura)
        setElementoSelecionado(valorInicial)
        Limpiar()
      } else if (result.isDenied) {
        Swal.fire("Revisa los datos", "", "info");
      }
    });


  }
  function EliminarDeLista(product) {
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


  function CargarLosNuevosValoresDeNombre(event) {
    setnombreCliente(event.target.value);
  }

  function CargarLosNuevosValoresDeFechaEntrada(event) {
    setfechaEntrada(event.target.value);
  }
  function CargarLosNuevosValoresDeFechaSalida(event) {
    setfechaSalida(event.target.value);
  }

  function Limpiar() {
    setcantidad(1)
    setDescuento('')
    setElementoSelecionado(valorInicial)
    setSeleccion('')
  }

  function Imprimir() {

    if (ListaArticulos.length == 0 || nombreCliente === "" || FechaEntrada === "") {
      Swal.fire({
        icon: "warning",
        title: "Revisa los datos que has ingresado",
        text: "Debe agregar al menos un producto a la lista. Revisa que la facutura tenga nombre y fechas!"
      });
    } else {
      Swal.fire({
        title: "¿Seguro? Estas a punto de emitir una factura",
        showDenyButton: true,
        confirmButtonText: "Imprimir",
        denyButtonText: `cancelar`
      }).then((result) => {

        if (result.isConfirmed) {
          setformulario(false)
          setMostrarFactura(true)
          guardarFactura();
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
              <input type='text' onChange={AutoCompletarSeleccion} disabled value={ElementoSeleccionado.descripcion} required></input>
              <span><strong>Precio:</strong></span>
              <input type='number' onChange={AutoCompletarSeleccion} disabled value={ElementoSeleccionado.precio} required></input>

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
              <button onClick={AgregarArticulos} className='btnAgregar'>+ Agregar</button>
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

      {mostrarFactura &&
        <MostrarFactura FacturaFinal={FacturaFinal} Lugar={"Imprimir"}></MostrarFactura>
      }



    </div >
  );
}

export default IngresoDeFacturas;

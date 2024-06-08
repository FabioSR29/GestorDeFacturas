
import './App.css';
import React, { useState } from 'react';

function App() {
  const [formulario, setformulario] = useState(true);
  const [factura, setfactura] = useState(false);
  const [producto, setproducto] = useState("");
  const [nombre, setnombre] = useState("");
  const [codigo, setcodigo] = useState("");
  const [descripcion, setdescripcion] = useState("");
  const [cantidad, setcantidad] = useState("");
  const [Precio, setPrecio] = useState("");
  const [Fecha, setfecha] = useState("");
  const [Total, setTotal] = useState();

  function CargarLosNuevosValoresDeProducto(event) {
    setproducto(event.target.value);
  }
  function CargarLosNuevosValoresDeCodigo(event) {
    setcodigo(event.target.value);
  }
  function CargarLosNuevosValoresDeDescripción(event) {
    setdescripcion(event.target.value);
  }
  function CargarLosNuevosValoresDeCantidad(event) {
    setcantidad(event.target.value);
  }
  function CargarLosNuevosValoresDeNombre(event) {
    setnombre(event.target.value);
  }
  function CargarLosNuevosValoresDePrecio(event) {
    setPrecio(event.target.value);
  }
  function CargarLosNuevosValoresDeFecha(event) {
    setfecha(event.target.value);
  }

  function Limpiar() {
    setfecha("");
    setPrecio("");
    setnombre("");
    setcantidad("");
    setdescripcion("");
    setcodigo("");
    setproducto("");
  }

  function Imprimir() {
    var resultado = cantidad*Precio;
    setTotal(resultado);
  setfactura(true)
  setformulario(false)
  }

  return (
    <div className="App">

      {formulario &&
        <div className="formulario">
          <h1>Ingrese los datos del Producto</h1>
          <div className="Ingresos">

            <span><strong>Nombre producto o servicio:</strong></span>
            <input type='text' onChange={CargarLosNuevosValoresDeProducto} value={producto} required></input>
            <span><strong>Codigo:</strong></span>
            <input type='text' onChange={CargarLosNuevosValoresDeCodigo} value={codigo} required></input>
            <span><strong>Descripcion:</strong></span>
            <input type='text' onChange={CargarLosNuevosValoresDeDescripción}  value={descripcion} required></input>
            <span ><strong>Cantidad/horas:</strong></span>
            <input type='text' onChange={CargarLosNuevosValoresDeCantidad} value={cantidad}  required></input>
            <span><strong>Precio:</strong></span>
            <input type='text' onChange={CargarLosNuevosValoresDePrecio} value={Precio}  required></input>
            <span><strong>Nombre del cliente:</strong></span>
            <input type='text' onChange={CargarLosNuevosValoresDeNombre}value={nombre} required></input>
            <span><strong>Fecha:</strong></span>
            <input type='date' onChange={CargarLosNuevosValoresDeFecha} value={Fecha} required></input>

            <div className="Botones">
              <button className="btn1" onClick={Imprimir}>Imprimir</button>
              <button className="btn2" onClick={Limpiar}>Limpiar</button>
            </div>
          </div>
        </div>
      }

      {factura &&

        <div className='factura'>
          <h1>EL TAMARINDO 2</h1>
          <div className='IngresosFT'>
            <span><strong>Producto o servicio: </strong>{producto}</span>
            <span><strong>Codigo:</strong>{codigo}</span>
            <span><strong>Descripcion: </strong>{descripcion}</span>
            <span><strong>Cantidad/horas: </strong>{cantidad}</span>
            <span><strong>Precio: </strong>{Precio}</span>
            <span><strong>Cliente: </strong>{nombre}</span>
            <span><strong>Fecha: </strong>{Fecha}</span>
            <span><strong>Total de venta:   </strong>{Total} colones</span>
            <span> </span>
            <span>Gracias por hacer uso de nuestros servicios</span>
            <span>Telefono: 25285404</span>
          </div>

        </div>

      }



    </div>
  );
}

export default App;

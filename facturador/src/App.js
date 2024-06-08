
import './App.css';
import React, { useState } from 'react';

function App() {
  const [formulario, setformulario] = useState(false);
  const [factura, setfactura] = useState(true);

  return (
    <div className="App">

      {formulario &&
        <div className="formulario">
          <h1>Ingrese los datos del Producto</h1>
          <div className="Ingresos">

            <span><strong>Nombre producto o servicio:</strong></span>
            <input></input>
            <span><strong>Codigo:</strong></span>
            <input></input>
            <span><strong>Descripcion:</strong></span>
            <input></input>
            <span><strong>Cantidad/horas:</strong></span>
            <input></input>
            <span><strong>Precio:</strong></span>
            <input></input>
            <span><strong>Nombre del cliente:</strong></span>
            <input></input>
            <span><strong>Fecha:</strong></span>
            <input type="date"></input>

            <div className="Botones">
              <button className="btn1">Imprimir</button>
              <button className="btn2">Limpiar</button>
            </div>
          </div>
        </div>
      }

      {factura &&

        <div>
          <h1>EL TAMARINDO 2</h1>
          <div className='Ingresos'>
            <span><strong>Nombre producto o servicio:</strong></span>
            <span><strong>Codigo:</strong></span>
            <span><strong>Descripcion:</strong></span>
            <span><strong>Cantidad/horas:</strong></span>
            <span><strong>Precio:</strong></span>
            <span><strong>Nombre del cliente:</strong></span>
            <span><strong>Fecha:</strong></span>
            <input type="date"></input>
          </div>

        </div>

      }



    </div>
  );
}

export default App;

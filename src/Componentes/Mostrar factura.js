
import { useState } from 'react';
import Logo from "../Assets/Logo.jpeg";
import '../App.css';


function MostrarFactura() {

    return (
        <div className='factura'>
            <span className='parche'></span>
            <img src={Logo}></img>
            <h1>Multiservicios</h1>
            <h1>El tamarindo #2</h1>

            <div className='IngresosFT'>
                <span><strong>Cliente: </strong>{nombreCliente}</span>
                <span><strong>Producto/servicio:</strong></span>
                <div className='Lista'>
                    {ListaProductos.map(product => (

                        <div className='ListaContenido' key={product.productoID}>
                            <div >
                                <div> -{product.nombre}  </div>

                                <span>Cantidad:{product.cantidad}</span>


                            </div>
                            <div>{product.precio} </div>

                        </div>
                    ))}
                </div>
                <span>Descuentos:{Descuentos}</span>
                <span>Subtotal:{Subtotal}</span>
                <span>Total:{Total}</span>
                <span> </span>
                <span><strong>Fecha de Entrada: </strong>{FechaEntrada}</span>
                <span><strong>Fecha de Salida: </strong>{FechaSalida}</span>
                <span>Gracias por hacer uso de nuestros servicios</span>
                <span>Telefono: 2470 23-23</span>
                <span>multiserviciostamarindo02@gmail.com</span>
            </div>



        </div>
    )
}
export default MostrarFactura;
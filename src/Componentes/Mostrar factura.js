import Logo from "../Assets/Logo.jpeg";
import '../App.css';


function MostrarFactura({FacturaFinal}) {
    return (
        <div className='factura'>
            <span className='parche'></span>
            <img src={Logo}></img>
            <h1>Multiservicios</h1>
            <h1>El tamarindo #2</h1>

            <div className='IngresosFT'>
                <span><strong>Cliente: </strong>{FacturaFinal.NombreDeCliente}</span>
                <span><strong>Producto/servicio:</strong></span>
                <div className='Lista'>
                    {FacturaFinal.ListaArticulos.map(product => (

                        <div className='ListaContenido' key={product.id}>
                            <div >
                                <div> -{product.Nombre}  </div>

                                <span>Cantidad:{product.cantidad}</span>


                            </div>
                            <div>{product.precio} </div>

                        </div>
                    ))}
                </div>
                <span>Descuentos:{FacturaFinal.Descuentos}</span>
                <span>Subtotal:{FacturaFinal.Subtotal}</span>
                <span>Total:{FacturaFinal.Total}</span>
                <span> </span>
                <span><strong>Fecha de Entrada: </strong>{FacturaFinal.FechaEntrada}</span>
                <span><strong>Fecha de Salida: </strong>{FacturaFinal.FechaSalida}</span>
                <span>Gracias por hacer uso de nuestros servicios</span>
                <span>Telefono: 2470 23-23</span>
                <span>multiserviciostamarindo02@gmail.com</span>
            </div>



        </div>
    )
}
export default MostrarFactura;
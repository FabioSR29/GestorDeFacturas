import Logo from "../Assets/Logo.jpeg";
import '../Styles/FacturasLista.css';


function MostrarFactura({ FacturaFinal, Lugar }) {
    return (
        <span className={`${Lugar === 'Imprimir' ? 'parche' : 'sinparche'}`}>
            <div className={`${Lugar === 'Imprimir' ? 'factura' : 'facturaLista'}`}>

                <img src={Logo} alt="Logo de la empresa Tamarindo 2"></img>
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
                    <span>IVA:{FacturaFinal.IVA}</span>
                    <span>Subtotal:{FacturaFinal.Subtotal}</span>
                    <span>Total sin IVA:{FacturaFinal.Total}</span>
                    <span>Total:{FacturaFinal.Total + FacturaFinal.IVA}</span>
                    <span> </span>
                    <span><strong>Fecha de Entrada: </strong>{FacturaFinal.FechaEntrada}</span>
                    <span><strong>Fecha de Salida: </strong>{FacturaFinal.FechaSalida}</span>
                    <span>Gracias por hacer uso de nuestros servicios</span>
                    <span>Telefono: 2470 23-23</span>
                    <span>multiserviciostamarindo02@gmail.com</span>
                </div>

            </div>

        </span>

    )
}
export default MostrarFactura;
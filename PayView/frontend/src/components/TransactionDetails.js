
const TransactionDetails = ({ data }) => {
    // !!add: company
    return ( 
        <div>
            {data.status ? <h1>Transacción Fallida</h1> : <h1>Transacción Exitosa!</h1> }
            <div className="mt-5">
                    <p className>Nombre: {data.name}</p>
                    <p>Documento: {data.idType}</p>
                    <p>Numero: {data.idNumber}</p>
                    <p>Descripción: {data.description}</p>
                    <p>Sede: {data.location}</p>
          
                    <p>Monto: {data.amount}</p>
                    <p>Cuotas: {data.installments}</p>
                    <p>Estado: {data.status ? <p>No aprobado</p> : <p>Aprobado</p>}</p>
                    <p>{data.status}</p>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <a className="btn btn-warning mr-5" href="/transaction">Realizar nueva transacción</a>
                </div>
                <div className="col-md-6">
                    <a className="btn btn-warning" href="/view">Pagina de consultas</a>
                </div>
            </div>
        </div>
     );
}
 
export default TransactionDetails
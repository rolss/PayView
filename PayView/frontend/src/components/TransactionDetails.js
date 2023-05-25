
const TransactionDetails = ({ data }) => {
    // !!add: company
    return ( 
        <div>
            {data.status ? <h1>Transacción Fallida</h1> : <h1>Transacción Exitosa!</h1> }
            <div className="mt-5 transactiondetails">
                <p className="mb-2"><strong>Nombre:</strong> {data.name}</p>
                <p className="mb-2"><strong>Documento:</strong> {data.idType}</p>
                <p className="mb-2"><strong>Numero:</strong> {data.idNumber}</p>
                <p className="mb-2"><strong>Descripción:</strong> {data.description}</p>
                <p className="mb-2"><strong>Sede:</strong> {data.location}</p>
                <p className="mb-2"><strong>Monto:</strong> {data.amount}</p>
                <p className="mb-2"><strong>Cuotas:</strong> {data.installments}</p>
                <p className="mb-2"><strong>Estado:</strong> {data.status ? 'No aprobado' : 'Aprobado'}</p>
            </div>
            <a className="btn btn-warning m-3" href="/transaction">Realizar nueva transacción</a>
            <a className="btn btn-warning m-2" href="/view">Pagina de consultas</a>
        </div>
     );
}
 
export default TransactionDetails
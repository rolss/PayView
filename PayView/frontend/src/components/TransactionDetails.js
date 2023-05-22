
const TransactionDetails = ({ data }) => {
    // !!add: company
    return ( 
        <div>
            <h3>{data.status}</h3>
            <div className="transactioninfo">
                <p>Nombre: {data.name}</p>
                <p>Documento: {data.idType}</p>
                <p>Numero: {data.idNumber}</p>
                <p>Descripción: {data.description}</p>
                <p>Sede: {data.location}</p>
                <p>Monto: {data.amount} {data.cardNumber}</p>
                <p>Cuotas: {data.installments}</p>
                <a href="/transaction">Realizar nueva transacción</a>
                <a href="/view">Pagina de consultas</a>
            </div>
        </div>
     );
}
 
export default TransactionDetails
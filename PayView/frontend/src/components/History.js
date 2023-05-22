const History = ({history}) => {
    
    return ( 
        <div>
            <h5>Historial: </h5>
            <table className="history">
                <thead>
                    <tr>
                        <th>Monto</th>
                        <th>Descripcion</th>
                        <th>Tarjeta</th>
                    </tr>
                </thead>
                <tbody>
                    {history && history.map((item) => (
                        <tr key={item._id}>
                        <td>{item.amount}</td>
                        <td>{item.description}</td>
                        <td>{item.cardNumber}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
     );
}
 
export default History;
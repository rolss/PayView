import format from 'date-fns/format'

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
                        <th>Fecha</th>
                        <th>Hora</th>
                    </tr>
                </thead>
                <tbody>
                    {history && history.slice(-3).map((item) => (
                        <tr key={item._id}>
                        <td>{item.amount}</td>
                        <td>{item.description}</td>
                        <td>{item.cardNumber}</td>
                        <td>{format(new Date(item.createdAt), 'dd/MM/yy')}</td>
                        <td>{format(new Date(item.createdAt), 'HH:mm')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <a href="/fullhistory">Ver mas</a>
        </div>
     );
}
 
export default History;
const Cards = ({cards}) => {

    return ( 
        <div>
            <h5>Tarjetas: </h5>
            <table className="cards">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tarjeta</th>
                        <th>Empresa</th>
                        <th>Saldo</th>
                    </tr>
                </thead>
                <tbody>
                    {cards && cards.map((item) => (
                        <tr key={item._id}>
                        <td>{item.cardNumber}</td>
                        <td>{item.company}</td>
                        <td>{item.balance}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
     );
}
 
export default Cards;
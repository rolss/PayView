import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate("/")
    }
    
    return ( 
        <div className="error">
            <h2>Oops! Esta pagina no existe</h2>
            <button className="btn btn-danger" onClick={handleClick}>Volver al Menu Principal</button>
        </div>
     );
}
 
export default NotFound;
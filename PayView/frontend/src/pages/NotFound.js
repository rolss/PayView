import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate()
    
    return ( 
        <div className="alert alert-danger service-unavailable">
            <h3 className="alert-heading">Not found</h3>
            <hr />
            <p>We could not find the page you were looking for!</p>
        </div>
     );
}
 
export default NotFound;
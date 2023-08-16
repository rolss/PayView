import { useNavigate } from "react-router-dom";
import History from "../components/History";
import { useAuthContext } from "../hooks/useAuthContext";

// Reuses History component to show all data, triggered by "initial" variable
const FullHistory = () => {
    const navigate = useNavigate()
    const { user } = useAuthContext()

    const handleClick = () => {
        navigate(-1)
    }

    return ( 
        <div className="container mt-5">
            <History user={user} initial={false} />
            <button className="btn btn-warning" onClick={handleClick}>Back</button>
        </div>
     );
}
 
export default FullHistory;
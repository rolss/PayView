import { useNavigate } from "react-router-dom";
import History from "../components/History";
import { useAuthContext } from "../hooks/useAuthContext";

const FullHistory = () => {
    const navigate = useNavigate()
    const { user } = useAuthContext()

    const handleClick = () => {
        navigate(-1)
    }

    return ( 
        <div>
            <History user={user} initial={false} />
            <button className="btn btn-warning" onClick={handleClick}>Back</button>
        </div>
     );
}
 
export default FullHistory;
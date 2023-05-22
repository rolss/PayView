import { useNavigate } from "react-router-dom";
import History from "../components/History";

const FullHistory = () => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(-1)
    }

    return ( 
        <div>
            <History initial={false} />
            <button onClick={handleClick}>Atrás</button>
        </div>
     );
}
 
export default FullHistory;
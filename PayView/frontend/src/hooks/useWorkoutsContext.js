import { WorkoutsContext } from "../context/WorkoutsContext";
import { useContext } from "react"; // we will use this hook

// invoke this useWorkoutsContext hook every time we want to use our workouts data
// use this to c onsume workoutscontext
export const useWorkoutsContext = () => {
    const context = useContext(WorkoutsContext) // hook returns the value of the WorkoutsContext (workouts object with state and dispatch)

    if (!context) {
        throw Error('useWorkoutsContext must be used inside a WorkoutsContextProvider')
    }

    return context
}
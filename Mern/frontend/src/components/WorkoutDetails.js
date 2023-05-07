import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout }) => { 
    const { dispatch } = useWorkoutsContext()
    // workout viene del parametro
    const handleClick = async () => {
        const response = await fetch('/api/workouts/' + workout._id, {
            method: 'DELETE'
        })
        const json = await response.json() // the document that we just deleted

        if (response.ok) {
            // now we need to update our workouts context state, to delete one.
            dispatch({type: 'DELETE_WORKOUT', payload: json}) // we pass the document that we want to delete from workouts
        }
    }


    // sufix "ago"
    // we give it the date from the workout object
    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            {/* <p>{workout.createdAt}</p> */}
            <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
}

export default WorkoutDetails 
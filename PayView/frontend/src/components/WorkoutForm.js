import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"


const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext()

    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault() // We dont want the page to refresh, which is the default action

        const workout = {title, load, reps}

        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout), // changes workout into a json string and sends that as the body!!!
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json() // porque es lo que devuelve el post request desde el backend

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }

        if (response.ok) {
            // Reload and reset all
            setEmptyFields([]) // OJO hay que resetearla mucho cuidado esto te puede cagar todo
            setTitle('')
            setLoad('')
            setReps('')
            setError(null) // in case there was one previously
            console.log('new workout added', json)
            
            // Añadir el nuevo workout a la variable global del frontend 'workouts'
            // Se le pasa el nuevo workout, y en el reducer pone eso que le estoy pasando + lo que ya tenía
            // GLOBAL APPLICATION STATE
            // UPDATES THE CONTEXT STATE
            dispatch({type: 'CREATE_WORKOUT', payload: json})
        }
    }

    // mira como se usan variables y funciones aqui adentro. Todo entre {}
    // if empty fields has title, set classname to error, otherwise set it to ''
    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

            <label>Exercise Title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)} // se updatea la variable que se va a enviar en el body del post
                value={title} // change is also reflected if the value changes outside of the form
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Load (in kg):</label>
            <input
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
                className={emptyFields.includes('load') ? 'error' : ''}
            />

            <label>Reps:</label>
            <input
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                className={emptyFields.includes('reps') ? 'error' : ''}
            />

            <button>Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

// that last bit of code means:
// error -> if there is an error
// <div className="error">{error}</div> -> output the state with carries the message

export default WorkoutForm
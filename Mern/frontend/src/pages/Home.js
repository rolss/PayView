import { useEffect } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

// components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'


const Home = () => {
    // const [workouts, setWorkouts] = useState(null)
    const {workouts, dispatch} = useWorkoutsContext() // workouts (state) y dispatch (me permite hacer cambios sobre ese state)

    useEffect(() => {
        const fetchWorkouts = async () => {

            const response = await fetch('/api/workouts') // it will proxy the address to localhost:4000 in package.json
            const json = await response.json() // le timbramos al API en esa ruta y obtenemos el JSON que devuleve

            if (response.ok) {
                // setWorkouts(json)
                // updateamos el state de workouts en el frontend para que tenga lo mismo que en el backend
                // es como si workouts fuera una variable global. SET_WORKOUTS lo updatea poniendole el payload que devuelve el API del backend.
                dispatch({type:"SET_WORKOUTS", payload: json})
            }
        }

        fetchWorkouts() // se corre la función que acabamos de definir
    }, [dispatch]) // se coloca porque cuando usamos external functions o dependencies dentro de un useffect, tenemos que ponerlo ahi.



    // if workouts is not null
    // por cada workout en workouts (context), agregar un workoutdetails con su id y su información
    // ojo con el workout=workout. ESO ES UN PROP QUE SE LE ESTA PASANDO A WORKOUTDETAILS. Es como un parametro que se le pasa a la función. Abre workoutdetails para que lo puedas ver bien
    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout}/>
                ))}
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home
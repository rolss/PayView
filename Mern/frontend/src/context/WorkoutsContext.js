import { createContext, useReducer } from 'react'

export const WorkoutsContext = createContext()

// state: previous state before we make changes to it
// action: object passed to the dispatch function
// why did we do this? So we dont use local state, but we use global context
// So that we are doing the same thing as the dbb and the things reaload in the webpage 
export const workoutsReducer = (state, action) => {
    // this is how we update the state of our object (workouts)
    // return a new state object which will update workouts
    switch (action.type) {
        case 'SET_WORKOUTS': // get workouts
            return {
                workouts: action.payload // array of all workouts (en Home.js le estamos pasando un json con todos los workouts. Ese json es action.payload)
            }
        case 'CREATE_WORKOUT':
            return {
                workouts: [action.payload, ...state.workouts] // new workout, all old workouts spread out (lo que le pasamos + lo que tenía)
            }
        case 'DELETE_WORKOUT':
            // filter through the array of workouts of the state
            // fire a functino for each workout. Return true if we want the workout to remain in the new array, false if we want to take it out of the new array
            // Function returns true if id is not the same as payload id, so the filter function adds it to the new array
            // Function returns false if id is the same as payload id (not different), so the filter function doesnt add it to the new array
            return {
                workouts: state.workouts.filter((w) => w._id !== action.payload._id)
            }
        default:
            return state // state unchanged
    }
}

// We need to allow our components to access this context
export const WorkoutsContextProvider = ({ children }) => {
                                // reducer function name, initial value (carries the current value, after changes)
    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts:null
    })
    
    // use dispatch to update the state object. The reducer function gets invoked (workoutsReducer) and passes the action into it so it can update the state
    // type: describes the state change (all caps)
    // payload: any data we need to make the change
    
    // We will give this a children property, which represents whatever the component (WorkoutsContextProvider) is wrapping.
    // In this case, it will wrap the App in index.js. So children will be App
    // Since the provider is wrapping the root component of the application, all components will have access to the WorkoutsContext context
    return (
        <WorkoutsContext.Provider value={{...state, dispatch}}>
            { children }
        </WorkoutsContext.Provider>
    )
}
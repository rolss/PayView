const mongoose = require('mongoose')

const Schema = mongoose.Schema

const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    }
}, {timestamps: true}) // document timestamps created automatically

// We create the Workout model to interact with the Workout collection
module.exports = mongoose.model('Workout', workoutSchema)


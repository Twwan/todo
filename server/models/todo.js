const mongoose = require('mongoose')

const ToDoSchema = new mongoose.Schema({
    task: String,
    done: {
        type: Boolean,
        default: false
    }
})

const ToDoModels = mongoose.model("todos", ToDoSchema)
module.exports = ToDoModels
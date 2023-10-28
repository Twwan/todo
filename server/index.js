const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const ToDoModels = require('./models/todo')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/test')


app.get('/get', (req, res) => {
    ToDoModels.find()
    .then(result => {
    if (result.length === 0) {
    return res.status(404).json({ message: 'Ничего не найдено' });
    }
    return res.status(200).json(result);
    })
    .catch(err => res.status(500).json(err))
    })

app.put('/update/:id', (req, res) => {
    const {id} = req.params;
    ToDoModels.findByIdAndUpdate({_id: id}, {done: true})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.delete('/delete/:id', (req, res) => {
    const {id} = req.params;
    ToDoModels.findByIdAndDelete({_id: id})
    .then(result => res.json(result))
    .catch(err => res.json(err))

})

app.post('/add', (req, res) => {
    const task = req.body.task;
    ToDoModels.create({
        task: task
    }).then(result => res.json(result))
    .catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log("Server is running")
})  
import React, { useState } from 'react'
import axios from 'axios'

function CreateTask(){
    const [task, setTask] = useState()
    const handleAdd = () =>{
        axios.post('http://localhost:3001/add', {task: task})
        .then(result => console.log(result))
        .catch(err => console.log(err))
    }
    return(
        <div>
            <input type="text" placeholder='Введите задачу' title='Введите задачу' onChange={(e) => setTask(e.target.value)}/>
            <button onClick={handleAdd}>Добавить</button>
        </div>
    );
}

export default CreateTask
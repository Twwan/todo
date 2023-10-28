import React, { useEffect, useState } from 'react';
import CreateTask from '../../../components/CreateTask';
import axios from 'axios';
import '../../index.css'

function MainPage() {
    const [todos, setTodos] = useState([]);
    const [style, setStyle] = useState('');

    const [task, setTask] = useState()
    const handleAdd = () =>{
        axios.post('http://localhost:3001/add', {text: task})
        .then(() => setTodos([...todos, {text: task, done: false}]))
        .catch(err => console.log(err))
    }

    useEffect(() => {
        axios.get('http://localhost:3001/get')
            .then(result => setTodos(result.data))
            .catch(err => console.log(err));
    }, []);

    const Edit = (id) =>{
        axios.put('http://localhost:3001/update/'+id)
        .then(result => console.log(result))
        .catch(err => console.log(err));

        setStyle('green')

    }

    const Delite = (id) => {
        axios.delete('http://localhost:3001/delete/'+id)
        .then(result => location.reload())
        .catch(err => console.log(err));
    }

    return (
        <div>
            <h1>ToDo от Стасяна</h1>
            <div>
            <div>
                <input type="text" placeholder='Введите задачу' title='Введите задачу' onChange={(e) => setTask(e.target.value)}/>
                <button onClick={handleAdd}>Добавить</button>
            </div>
            <div>
                    {todos.length === 0 ? <span>У вас пока нет задач</span> :
                        todos.map(todo => (
                            <div key={todo._id}>
                                <p className={style}>{todo.text}</p>
                                <button onClick={() => Delite(todo._id)}>удалить</button>
                                <button onClick={() => Edit(todo._id)}>завершить</button>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default MainPage;
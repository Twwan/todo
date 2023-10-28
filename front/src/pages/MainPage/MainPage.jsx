import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MainPage.css';

function MainPage() {
  const [todos, setTodos] = useState([]);
  const [style, setStyle] = useState('');

  const [task, setTask] = useState();

  const handleAdd = () => {
    axios.post('http://localhost:3001/add', { text: task })
      .then(() => setTodos([...todos, { text: task, done: false }]))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    axios.get('http://localhost:3001/get')
      .then(result => setTodos(result.data))
      .catch(err => console.log(err));
  }, []);

  const Edit = (id) => {
    axios.put('http://localhost:3001/update/' + id)
      .then(result => console.log(result))
      .catch(err => console.log(err));

    setStyle('green');
  };

  const Delete = (id) => {
    axios.delete('http://localhost:3001/delete/' + id)
      .then(result => {
        setTodos(todos.filter(todo => todo._id !== id));
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h1 className='h1'>Самый крутой ТуДушник</h1>
      <div>
        <div>
          <input className="input" type="text" placeholder='Введите задачу' title='Введите задачу' onChange={(e) => setTask(e.target.value)} />
          <button onClick={handleAdd}>Добавить</button>
        </div>
        <div>
          {todos.length === 0 ? <span>Добавьте первую задачу</span> :
            todos.map(todo => (
              <div key={todo._id}>
                {todo.done ? (
                  <p className="completed-task">{todo.text}</p>
                ) : (
                  <p className='task'>{todo.text}</p>
                )}
                <button onClick={() => Delete(todo._id)}>Удалить</button>
                {!todo.done && (
                  <button onClick={() => Edit(todo._id)}>Завершить</button>
                )}
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default MainPage;
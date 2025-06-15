import React, { useState, useEffect } from 'react';
//import './App.css';
const App = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState('all'); // all, active, completed

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAdd = () => {
    const trimmedTask = task.trim();
    if (!trimmedTask) return alert('Task cannot be empty!');
    const newTask = {
      id: Date.now(),
      text: trimmedTask,
      completed: false,
    };
    setTasks([newTask, ...tasks]);
    setTask('');
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(t => (
      t.id === id ? { ...t, completed: !t.completed } : t
    )));
  };

  const removeTask = (id) => {
    if (window.confirm('Delete this task?')) {
      setTasks(tasks.filter(t => t.id !== id));
    }
  };

  const filteredTasks = tasks.filter(t =>
    filter === 'all' ? true : filter === 'active' ? !t.completed : t.completed
  );

  return (
    <div className="app" style={styles.container}>
      <h1>To-Do List</h1>
      <div style={styles.inputArea}>
        <input
          type="text"
          value={task}
          onChange={e => setTask(e.target.value)}
          placeholder="Enter a task"
          style={styles.input}
        />
        <button onClick={handleAdd} style={styles.addBtn}>Add</button>
      </div>

      <div style={styles.filterBar}>
        {['all', 'active', 'completed'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              ...styles.filterBtn,
              backgroundColor: filter === f ? '#333' : '#eee',
              color: filter === f ? 'white' : 'black',
            }}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <ul style={styles.list}>
        {filteredTasks.map(t => (
          <li key={t.id} style={styles.listItem}>
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => toggleComplete(t.id)}
            />
            <span
              style={{
                ...styles.taskText,
                textDecoration: t.completed ? 'line-through' : 'none',
                color: t.completed ? 'gray' : 'black',
              }}
            >
              {t.text}
            </span>
            <button onClick={() => removeTask(t.id)} style={styles.delBtn}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Simple inline styles
const styles = {
  container: {
    maxWidth: '500px',
    margin: '40px auto',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    fontFamily: 'Arial',
  },
  inputArea: {
    display: 'flex',
    marginBottom: '20px',
    gap: '10px',
  },
  input: {
    flex: 1,
    padding: '10px',
    fontSize: '16px',
  },
  addBtn: {
    padding: '10px 16px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
  filterBar: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '15px',
  },
  filterBtn: {
    padding: '6px 12px',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 0',
    borderBottom: '1px solid #ddd',
  },
  taskText: {
    flex: 1,
    marginLeft: '10px',
  },
  delBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
  },
};

export default App;
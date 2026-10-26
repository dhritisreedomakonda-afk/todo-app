import { useState } from "react";
import "./App.css";

function TodoForm({ onAdd }) {
  const [text, setText] = useState("");
  const submit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text);
    setText("");
  };
  return (
    <form onSubmit={submit}>
      <input value={text} onChange={(e) => setText(e.target.value)}
        placeholder="Enter task" />
      <button>Add</button>
    </form>
  );
}

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li>
      <input type="checkbox" checked={todo.done}
        onChange={() => onToggle(todo.id)} />
      <span className={todo.done ? "done" : ""}>{todo.text}</span>
      <button onClick={() => onDelete(todo.id)}>X</button>
    </li>
  );
}

function App() {
  const [todos, setTodos] = useState([]);

  const add = (text) =>
    setTodos([...todos, { id: Date.now(), text, done: false }]);
  const toggle = (id) =>
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  const del = (id) => setTodos(todos.filter((t) => t.id !== id));

  return (
    <div className="app">
      <h1>My Tasks</h1>
      <TodoForm onAdd={add} />
      <ul>
        {todos.map((t) => (
          <TodoItem key={t.id} todo={t} onToggle={toggle} onDelete={del} />
        ))}
      </ul>
    </div>
  );
}

export default App;

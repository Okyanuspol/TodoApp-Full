export default function TodoList({ todos, onDelete, onToggle }) {
 
    return (
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            {todo.title}
            <div>
              <button onClick={() => onToggle(todo.id)}>
                {todo.completed ?  <i class="fa-solid fa-rotate-left">Completed</i> : <i class="fa-solid fa-check">Complete</i>}
              </button>
              <button className="delete" onClick={() => onDelete(todo.id)}>
              <i class="fa-solid fa-trash">Delete</i>
              </button>
            </div>
          </li>
        ))}
      </ul>
    );
  }
  
  
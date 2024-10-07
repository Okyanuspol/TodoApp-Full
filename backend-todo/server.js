import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

let todos = [];

app.get('/todos', (req, res) => {
  res.json(todos);
});

app.post('/todos', (req, res) => {
  const newTodo = { id: Date.now(), title: req.body.title, completed: false };
  todos.push(newTodo);
  res.json(newTodo);
});

app.delete('/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id);
  todos = todos.filter((todo) => todo.id !== todoId);
  res.status(200).send("Todo gelöcht");
});

app.patch('/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id);
  const todo = todos.find((todo) => todo.id === todoId);
  if (todo) {
    todo.completed = !todo.completed;
    res.json(todo);
  } else {
    res.status(404).json({ error: 'Todo nicht gefunden' });
  }
});

app.use((err, req, res, next) => {
    console.error("error")
    res.status(500).json({message: 'Da ist etwas schiefgelaufen'})
})

app.use ((req, res) => {
    res.status(404).send("Die Seite, die du suchst, existiert nicht ");
})

app.listen(3000, () => {
  console.log(`Server is running on port 3000}`);
});

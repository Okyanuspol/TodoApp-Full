import { Router} from "express"

const router = Router();

const todos = [
    {
      id: 1,
      todo : "Putzen",
      completed : false,
    },
    {
      id: 2,
      todo : "Spazieren",
      completed : false,
    }
  ]
  
  router.get("/", (req, res) => {
        res.json(todos);
   })
  
  router.post("/", (req, res) => {
        const newTodo = req.body;
        todos.push(newTodo);
        res.status(201).send(todos);
  });
  
  router.delete("/:id", (req, res) => {
        const id = parseInt(req.params.id);
  
        const todosIndex = todos.findIndex(todo => todo.id === id);
        if (todosIndex === -1) {
          res.status(404).send("Todo nicht gefunden")
          
        } else {
          todos.splice(todosIndex, 1);
        }
       
        res.json(todos);
  })

      export default router;
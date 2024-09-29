import express from 'express'
import cors from 'cors'
let app = express();

app.use(express.json());
app.use(cors());
let users = [
  {id : 1,name : 'ali',email : 'ali@gmail.com',},
  {id : 2,name : 'khan',email : 'khan@gmail.com',},
]
app.get("/api/data",(req,res) => {
  res.json(users)
})
app.post('/api/data', (req, res) => {
  const body = req.body;

  const newUser = {
      id: users.length + 1,
      ...body
  }

  users.push(newUser)
  res.status(201).json({ message: 'New user created!', data: newUser })
})

app.put('/api/data/:id', (req, res) => {
  const userId = parseInt(req.params.id)
  const userIndex = users.findIndex(user => user.id === userId);

  if (userIndex !== -1) {
      const updatedUser = { ...users[userIndex], ...req.body }
      
      // update user in array
      users[userIndex] = updatedUser
      res.status(200).json({ message: `User with id ${userId} updated 😊`, updatedUser })
  } else {
      res.status(404).json({ message: `User with id ${userId} not found 😢` })
  }
})

app.delete('/api/data/:id', (req, res) => {
  const userId = parseInt(req.params.id)
  const userIndex = users.findIndex(user => user.id === userId);

  if (userIndex !== -1) {
      // remove user from array
      // const deletedUser = users.splice(userIndex, 1)
      users.splice(userIndex, 1);
      res.status(200).json({ message: `User with id ${userId} deleted 😊` })
  } else {
      res.status(404).json({ message: `User with id ${userId} not found 😢` })
  }
})

app.listen(3000,() => {
  console.log('http://localhost:3000')
})
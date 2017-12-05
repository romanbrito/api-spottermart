import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/todos');
// connect to a database so the below will work.
// what's happening is that we're createing a new schema
// and making a todos collection and a Todo model.
// We then create new Todo.
// So in the mongo shell in the terminal,
// connect to your database and query it there
// and see if you see the todo below log in the terminal
// run node db.Tester to execute this file
// MAKE SURE MONGOD is RUNNING



const TodoSchema = new mongoose.Schema({
  name: String,
  completed: Boolean
});

const Todo = mongoose.model('todo', TodoSchema);
Todo.create({
  name: 'clean up your room!!!',
  completed: false
}). then( (err, todo) => {
  console.log(err, todo);
});
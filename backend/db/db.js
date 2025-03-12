const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/todo")

const UserSchema = mongoose.Schema({
    username : String,
    password : String,
    todos : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "todos"
    }]
})
const TodoSchema = mongoose.Schema({
    title : String,
    description : String,
    completed : Boolean
})

const User = mongoose.model("users",UserSchema);
const Todo = mongoose.model("todos",TodoSchema);

module.exports = { User , Todo}
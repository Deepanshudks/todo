const express = require("express");
const { createTodo, updateTodo } = require("./types");
const { Todo, User } = require("./db/db");
const app = express();
const jwt = require("jsonwebtoken")
const cors = require('cors')

const Jwt_secret = "secret101"

app.use(express.json());
app.use(cors())

app.post("/signup",async (req,res)=>{
    const username  = req.body.username
    const password  = req.body.password

    const user = await User.create({username, password})
    user.save();
    if(user){
        res.status(200).json({
            msg : "User created successfully"
        })
        return;
    }
    res.status(404).json({
        error : "Some error occured"
    })
})
app.post("/signin",async (req,res)=>{
    const username  = req.body.username
    const password  = req.body.password;

    const user =await User.findOne({username , password});
    if(user){
        const token = jwt.sign(username,Jwt_secret);
        res.status(200).header({Authentication: token}).json({
            msg : "Successfully logged in"
        })
        return;
    }
    res.status(401).json({
        msg : "User not found"
    })
})

app.post("/todo",async (req,res)=>{
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);

    if(!parsedPayload.success){
        res.status(411).json({
            msg : "You have given the wrong inputs"
        })
        return;
    }
    const newTodo = await Todo.create({
        title : createPayload.title,
        description : createPayload.description,
        completed : false
    });
    newTodo.save();
    res.status(201).json({
        msg : "Todo created successfully",
        todo : newTodo
    })
})
app.get("/todos",async (req,res)=>{
   const {username,password} = req.body;
   const todo = await Todo.find({})
   if(todo){
    res.status(200).json(todo);
    return;
   }
   res.status(401).json({
    msg : "No todo found",
   })
})
app.put("/completed", async (req,res)=>{
    const id = req.headers.id
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload)

    if(!parsedPayload.success){
        res.status(411).json({
            msg : "Wrong inputs"
        })
        return;
    }
    const completedTodo = await Todo.update({
        _id : req.body.id
    },{
        completed : true
    })
    completedTodo.save()
    res.status(200).json({
        msg : "Todo marked as completed",
        todo : completedTodo
    })
})

app.listen(3000,()=>{
    console.log("App is running at port 3000")
})
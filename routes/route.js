const router = require("express").Router();

const Todo = require("../models/todo");

router.post("/api/todo", async (req, res) => {
    try {
        const todo = new Todo({
            task: req.body.task,
            pending: 1,
            creationTime: new Date()
        });
        const savedtodo = await todo.save();
        res.status(200).json(savedtodo);
    }
    catch(err){
        console.log("error posting todo");
        res.json(err);
    }
});

router.get("/api/todo/:pendingtype",async (req, res)=>{
    const {pendingtype} = req.params;
    console.log(pendingtype);
    try{
        let allTodos;
        if (pendingtype==='0'){
            allTodos = await Todo.find({pending:0}).sort({creationTime:-1});
        }
        else if (pendingtype==='1')
        {
            allTodos = await Todo.find({pending:1}).sort({creationTime:-1});
        }
        else{
            allTodos = await Todo.find({}).sort({creationTime:-1});
        }
        res.status(200).json(allTodos);
    }
    catch(err){
        console.log(err);
    }
})

router.put("/api/todo/:id", async(req,res)=>{
    const {id} = req.params;
    const todo = req.body;
    try{
        if (todo.pending){
            await Todo.findByIdAndUpdate(id, {pending: 0});
        }
        if (todo.task!==''){
            await Todo.findByIdAndUpdate(id, {task: todo.task});
        }
        const todos = await Todo.find({}).sort({creationTime:-1});
        res.status(200).json(todos);
    }
    catch(err){
        console.log(err);
    }
})

router.delete("/api/todo/:id", async(req,res)=>{
    const {id} = req.params;
    try{
        await Todo.findByIdAndDelete(id);
        const todos = await Todo.find({}).sort({creationTime:-1});
        res.status(200).json(todos);
    }
    catch(err){
        console.log(err);
    }
})

router.delete("/api/todo", async(req,res)=>{
    try{
        await Todo.deleteMany({});
        res.status(200).json("successfully deleted all todos");
    }
    catch(err){
        console.log(err);
    }
});

module.exports = router;
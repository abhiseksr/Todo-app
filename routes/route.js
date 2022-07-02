const router = require("express").Router();

const Todo = require("../models/todo");

let immutableIds = [
    "62bfe1d13ce29d36594e35ed",
    "62bfe1e03ce29d36594e35ef",
    "62bfe1e43ce29d36594e35f1",
    "62bfe1ef3ce29d36594e35f3",
    "62bfe2053ce29d36594e35f5",
    "62bfe2553ce29d36594e35f7",
    "62bfe2673ce29d36594e35f9",
    "62bfe26c3ce29d36594e35fb",
    "62bfe2763ce29d36594e35fd",
    "62bfe2873ce29d36594e35ff",
    "62bfe2a83ce29d36594e3601",
    "62bfe2b33ce29d36594e3603",
    "62bfe2bd3ce29d36594e3605",
    "62bfe2e93ce29d36594e3607",
    "62bfe3053ce29d36594e3609",
    "62bfe30e3ce29d36594e360b"
]

function ifExists(id){
    for (let idx of immutableIds){
        if (id===idx) return true;
    }
    return false;
}

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
        if (!ifExists(id)){
            if (todo.pending){
                await Todo.findByIdAndUpdate(id, {pending: 0});
            }
            if (todo.task!==''){
                await Todo.findByIdAndUpdate(id, {task: todo.task});
            }
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
        if (!ifExists(id))
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
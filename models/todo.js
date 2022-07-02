const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    pending:{
        type: Number,
        default: 1
    },
    creationTime:{
        type: Date
    }
});

const Todo = new mongoose.model("Todo", todoSchema);

module.exports = Todo;
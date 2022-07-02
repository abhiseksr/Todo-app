import React, {useState, useEffect} from 'react'
import axios from "axios";
import {Link} from "react-router-dom";


const URL = "";

export default function Board() {

    const [todoList, setTodoList] = useState([]);
    const [pendingType, setPendingType] = useState(-1);
    const [editing, setEditing] = useState('0');
    const [prevTask, setPrevTask] = useState("");

    useEffect(()=>{
        console.log(pendingType);
        const fetchData = async()=>{
            try{
                const newTodoList = await axios.get(`${URL}/api/todo/${pendingType}`);
                setTodoList(newTodoList.data);
            }
            catch(err){
                console.log(err);
            }
        }
        fetchData();
    },[pendingType]);

    const addTodo = async (e) =>{
        e.preventDefault();
        try{
            const inputText = document.getElementById("inputText");
            if (inputText.value!==''){
                const newTodo = await axios.post(`${URL}/api/todo`, {task:inputText.value});
                setTodoList((prevTodoList)=>[newTodo.data,...prevTodoList ]);
            }
            inputText.value = "";
        }
        catch(err){
            console.log(err);
        }
    };

    const putTodo = async (e) =>{
        e.preventDefault();
        try{
            const inputText = document.getElementById("inputText");
            if (inputText.value!==''){
                const newTodoList = await axios.put(`${URL}/api/todo/${editing}`, {task:inputText.value,pending:0});
                setTodoList(newTodoList.data);
            }
            inputText.value = "";
            setEditing('0');
        }
        catch(err){
            console.log(err);
        }
    };

    const deleteTodo = async (id)=>{
        try{
            const newTodoList = await axios.delete(`${URL}/api/todo/${id}`);
            setTodoList(newTodoList.data);
        }
        catch(err){
            console.log(err);
        }
    }

    const doneTodo = async (id) =>{
        try{
            const newTodoList = await axios.put(`${URL}/api/todo/${id}`,{pending:1,task:''});
            setTodoList(newTodoList.data);
        }
        catch(err){
            console.log(err);
        }
    }

    const deleteAll = async() =>{
        try{
            await axios.delete(`${URL}/api/todo`);
            setTodoList([]);
        }
        catch(err){
            console.log(err);
        }
    }
   
    const RenderEditTask = () =>{
        return (
            <form action="/todo" method="POST">
                <input type="text" placeholder="Edit task" id="inputText" onChange={(e)=>{setPrevTask(e.target.value)}} value={prevTask}/>
                <button onClick={(e)=>putTodo(e)} className="addtask edittask">Save Task</button>
                <span  className="deleteall" role="button" onClick={()=>{deleteAll()}}>!Delete All</span>
            </form>
        );
    }

    return (
    <section className="board">
        {editing!=='0'?<RenderEditTask/>:(
        <form action="/todo" method="POST">
            <input type="text" placeholder="Enter your task" id="inputText"/>
            <button onClick={(e)=>addTodo(e)} className="addtask">Add Task</button>
            <span  className="deleteall" role="button" onClick={()=>{deleteAll()}}>!Delete All</span>
        </form>)
        }
        <div className="type">
            <span onClick={()=>{setPendingType(-1)}} className={"pending " + (pendingType===-1?'active-category':'')}>All</span><span onClick={()=>{setPendingType(1)}} className={"pending " + (pendingType===1?'active-category':'')}>Pending</span><span onClick={()=>{setPendingType(0)}} className={"completed "+ (pendingType===0?'active-category':'')}>Completed</span>
            {/* <span className="pending <%= ((pendingStatus===-1)?'active-category':'') %>">All</span><span href="/todo/?pending=1" className="pending <%= ((pendingStatus===1)?'active-category':'') %>">Pending</span><span href="/todo/?pending=0" className="completed <%= ((pendingStatus===0)?'active-category':'') %>">Completed</span> */}
        </div>
        <div className="tasks">
            {
                todoList.map((todo, idx)=>{
                    return (
                        <div key={idx+1}>
                            <div className={"edits "+ (todo.pending?'pending-task':'completed-task')}><span className="left"><span className="sno">{idx+1}</span>
                            <span className="taskcontent">{todo.task}</span></span><span className="controls"><span onClick={()=>{doneTodo(todo._id)}} className="done"><i className="fa-solid fa-circle-check icon doneicon"></i>Done</span>
                            <span onClick={()=>{setPrevTask(todo.task); setEditing(todo._id); window.scrollTo(0,0);}} className="edit"><i className="fa-solid fa-pen-to-square icon editicon"></i>Edit</span><span onClick={()=>{deleteTodo(todo._id)}} className="delete"><i className="fa-solid fa-trash-can icon deleteicon"></i>Delete</span></span></div>
                        </div>
                    );
                }) 
            }       
        </div>
    </section>
    )
}

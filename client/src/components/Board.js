import React, {useState, useEffect} from 'react'
import axios from "axios";
import Cards from './Cards';
import LoadingIcon from './LoadingIcon';
import RenderEditTask from "./RenderEditTask";
import {Link} from "react-router-dom";


const URL = "";

export default function Board() {

    const [todoList, setTodoList] = useState([]);
    const [pendingType, setPendingType] = useState(-1);
    const [editing, setEditing] = useState('0');
    const [prevTask, setPrevTask] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=>{
        console.log(pendingType);
        const fetchData = async()=>{
            try{
                setIsLoading(true);
                const newTodoList = await axios.get(`${URL}/api/todo/${pendingType}`);
                setIsLoading(false);
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
                setIsLoading(true);
                const newTodo = await axios.post(`${URL}/api/todo`, {task:inputText.value});
                setIsLoading(false);
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
            if (inputText.value!=''){
                setIsLoading(true);
                const newTodoList = await axios.put(`${URL}/api/todo/${editing}`, {task:inputText.value,pending:0});
                setIsLoading(false);
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
            setIsLoading(true);
            const newTodoList = await axios.delete(`${URL}/api/todo/${id}`);
            setIsLoading(false);
            setTodoList(newTodoList.data);
        }
        catch(err){
            console.log(err);
        }
    }

    const doneTodo = async (id) =>{
        try{
            setIsLoading(true);
            const newTodoList = await axios.put(`${URL}/api/todo/${id}`,{pending:1,task:''});
            setIsLoading(false);
            setTodoList(newTodoList.data);
        }
        catch(err){
            console.log(err);
        }
    }

    const deleteAll = async() =>{
        // try{
        //     await axios.delete(`${URL}/api/todo`);
        //     setTodoList([]);
        // }
        // catch(err){
        //     console.log(err);
        // }
    }

    return (
    <section className="board">
        {editing!=='0'?<RenderEditTask prevTask={prevTask} setPrevTask={setPrevTask} deleteAll={deleteAll} putTodo={putTodo}/>:(
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
        {isLoading?<LoadingIcon />:<Cards todoList={todoList} doneTodo={doneTodo} setPrevTask={setPrevTask} setEditing={setEditing} deleteTodo={deleteTodo}/>}
    </section>
    )
}

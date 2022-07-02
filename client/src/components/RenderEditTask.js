import React, {useState, useEffect} from 'react'

const RenderEditTask = ({prevTask,setPrevTask,putTodo,deleteAll}) =>{
    return (
        <form action="/todo" method="POST">
            <input type="text" placeholder="Edit task" id="inputText" value={prevTask} onChange={(e)=>{setPrevTask(e.target.value)}}/>
            <button onClick={(e)=>putTodo(e)} className="addtask edittask">Save Task</button>
            <span  className="deleteall" role="button" onClick={()=>{deleteAll()}}>!Delete All</span>
        </form>
    );
}

export default RenderEditTask;
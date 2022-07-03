import React from 'react'

export default function Cards({todoList,deleteTodo,setPrevTask,doneTodo,setEditing}) {
  return (
    <div className="tasks">
            {
                todoList.map((todo, idx)=>{
                    return (
                        <div key={idx+1}>
                            <div className={"edits "+ (todo.pending?'pending-task':'completed-task')}><span className="left"><span className="sno">{idx+1}</span>
                            <span className="taskcontent">{todo.task}</span></span><span className="controls"><span style={{display: todo.pending===1?"inline-block":"none"}} onClick={()=>{doneTodo(todo._id)}} className="done"><i className="fa-solid fa-circle-check icon doneicon"></i>Done</span>
                            <span onClick={()=>{setPrevTask(todo.task); setEditing(todo._id); window.scrollTo(0,0);}} className="edit"><i className="fa-solid fa-pen-to-square icon editicon"></i>Edit</span><span onClick={()=>{deleteTodo(todo._id)}} className="delete"><i className="fa-solid fa-trash-can icon deleteicon"></i>Delete</span></span></div>
                        </div>
                    );
                }) 
            }       
     </div>
  )
}

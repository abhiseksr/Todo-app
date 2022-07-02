import React from "react";

function Nav(props){
    return(
        <nav className="top" id="top">
            <span className="title"><span onClick={props.toggler} className="hamburgur"><i className="icon fa-solid fa-bars" id="icon"></i></span> Todo App </span>
            <span className="author"> - Abhishek Kumar</span>
        </nav>
    )
}

export default Nav;
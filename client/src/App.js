import React from "react";
import Locations from "./components/Locations";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Board from "./components/Board";
import Instruction from "./components/Instruction";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import "./App.css";

function App(){
    const toggle = ()=>{

        const icon = document.querySelector("#icon");
        const locations = document.querySelector("#locations");

        if(locations.classList.contains("display")) locations.classList.remove("display");
        else locations.classList.add("display");
        
    }
    return (
        <div>
            <Routes>
                <Route path="/todo" element={<div><Nav toggler = {toggle}/><Locations toggler = {toggle}/><Board /><Footer /></div>}></Route>
                <Route path="/todo/instruction" element={<div><Nav toggler = {toggle}/><Locations toggler = {toggle}/><Instruction /><Footer /></div>}></Route>
            </Routes>
        </div>
    )
}

export default App;
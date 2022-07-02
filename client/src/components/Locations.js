import React from "react";
import {Link} from "react-router-dom";

function Locations(props){
    return(
        <section onClick={props.toggler} className="locations display" id="locations">
            <ul className="links">
                <Link to="/todo"><li>Home</li></Link>
                <Link to="/todo/instruction"><li>Instructions</li></Link>
                <a href="#contact"><li>Contact</li></a>
            </ul>
        </section>
    )
}

export default Locations;
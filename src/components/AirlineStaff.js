import React, { useState } from "react";
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import CheckIn from "./CheckIn/CheckIn";
import InFlight from "./InFlight/InFlight";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Login from "./Login/login";



function AirlineStaff(){

    const [name,setName]= useState("");

    const [email,setEmail]= useState("");

    const [url,setUrl]= useState("");

    const responseGoogle = response => {
        console.log(response.profileObj);
        setName(response.profileObj.name);
        setEmail(response.profileObj.email);
        setUrl(response.profileObj.imageUrl);
    };

    return(
        <div className="toolbar">
       
            <nav className="navbar navbar-expand-sm bg-light">
                
                <Router>
                    <div>

                        <ul className="navbar-nav">
                            <li class="nav-item">
                                <Link to="/CheckIn" className="nav-link">Check-In</Link>
                            </li>
                            <li>
                                <Link to="/InFlight" className="nav-link">IN-FLIGHT</Link>
                            </li>
                            <li>
                                <Link to="/Login" className="nav-link">Login with Google Account</Link>
                            </li>
                        </ul>
                        <Switch>
                            <Route path="/CheckIn"><CheckIn /></Route>
                            <Route path="/InFlight"><InFlight /></Route>
                            <Route path="/login"><Login /></Route>
                        </Switch>
                    </div>
                </Router>
            </nav>


        </div>
    )
}

export default AirlineStaff
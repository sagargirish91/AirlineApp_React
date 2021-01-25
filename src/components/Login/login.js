import React, { useState } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import GoogleLogin from 'react-google-login';




function Login(){

    const [name,setName]= useState("");

    const [email,setEmail]= useState("");

    const [url,setUrl]= useState("");

    const [msg1,setMsg1]= useState("");

    const [msg2,setMsg2]= useState("");

    const [msg3,setMsg3]= useState("");

    const responseGoogle = response => {
        console.log(response.profileObj);
        setName(response.profileObj.name);
        setEmail(response.profileObj.email);
        setUrl(response.profileObj.imageUrl);
        setMsg1("Hi");
        setMsg2("Thanks for for Logging In");
        setMsg3("Your Email ID is");
    };

    return(
        <div className="toolbar">

    <GoogleLogin
    clientId="1089867695746-ortp57iufdjd0n874f5g1n7ko3nc34hi.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    onCl
    cookiePolicy={'single_host_origin'}
  />

        

        <h1></h1>
            <h1>{msg1} {name} {msg2}</h1>
            <h1>{msg3} {email}</h1>
            <img src={url} alt={name}/>
        </div>
    )
}

export default Login
import React, { useState } from 'react'
import axios from 'axios';

function Login() {

    const[username,setUsername] = useState("");
    const[password,setPassword]=useState("");

    function validate(e){
        e.preventDefault();
        const validateUser=({
            username,
            password
        })

        axios.post("http://localhost:3000/user/login",validateUser).then(()=>{

            alert("login success");
            
        }).catch((err)=>{
            alert(err);
        })
    }

    return (
        <div>
            <form onSubmit={validate}>
                <input type="text" placeholder="username" onChange={(e)=>{

                    setUsername(e.target.value);
                }}></input>
                <input type="password" placeholder="password" onChange={(e)=>{
                    setPassword(e.target.value);
                }}></input>
                <button>Login In</button>
            </form>
        </div>
    )
}

export default Login

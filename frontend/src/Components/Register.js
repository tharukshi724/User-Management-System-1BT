import React,{useState} from 'react';
import axios from 'axios';

function Register() {

    const[firstname,setFirstname] = useState("");
    const[lastname,setLastname] = useState("");
    const[username,setUsername] = useState("");
    const[email,setEmail] = useState("");
    const[password,setPassword]=useState("");

    function saveData(e){

        const newUser = ({
            firstname,
            lastname,
            username,
            email,
            password
        })

        axios.post("http://localhost:3000/user/addNewUser",newUser).then(()=>{
            alert("successfully added");
        }).catch((err)=>{
            alert(err);
        })
    }
    return (
        <div>
            <form onSubmit={saveData}>
                <input type="text" placeholder="firstname" onChange={(e)=>{
                    setFirstname(e.target.value);
                }}></input>
                <input type="text" placeholder="lastname" onChange={(e)=>{
                    setLastname(e.target.value);
                }}></input>
                <input type="text" placeholder="username" onChange={(e)=>{
                    setUsername(e.target.value);
                }}></input>
                <input type="email" placeholder="email" onChange={(e)=>{
                    setEmail(e.target.value);
                }}></input>
                <input type="password" placeholder="password" onChange={(e)=>{
                    setPassword(e.target.value);
                }}></input>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default Register

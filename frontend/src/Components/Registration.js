import React,{useState} from 'react'
import axios from 'axios';

function Registration() {

    const [firstname,setFirstname] = useState("");
    const [lastname,setLastname] = useState("");
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    function saveData(){

        const newUser={
            firstname,
            lastname,
            username,
            email,
            password

        }
        axios.post("http://localhost:8070/user/add",newUser).then(()=>{
            alert("new user added");
        }).catch((err)=>{
            alert("cannot add user");
        })
    }


    return (
        <div>
            <form onsubmit={saveData}>
                 <input type="text" placeholder="Enter first name" onChange={function(e){
                     setFirstname(e.target.value)
                 }} ></input>
                 <input type="text" placeholder="Enter last name" onChange={(e)=>{
                     setLastname(e.target.value)
                 }}></input>
                 <input type="text" placeholder="Enter  username" onChange={(e)=>{
                     setUsername(e.target.value)
                 }}></input>
                 <input type="email" placeholder="Enter email" onChnage={(e)=>{
                     setEmail(e.target.value)
                 }}></input>
                 <input type="password" placeholder="Enter password" onChnage={(e)=>{
                     setPassword(e.target.value)
                 }}></input>
                 <button>Submit</button>
            </form>
        </div>
    )
}

export default Registration

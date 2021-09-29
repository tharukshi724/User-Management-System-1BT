import React,{useState} from 'react'
import axios from 'axios';

function UpdatePassword() {

    const[password,setPassword] = useState("");

    function resetPassword(e){
        
        const newPassword=({
             password
        })

        axios.post("http://localhost:3000/user/new-password",newPassword).then(()=>{
            alert("successfully change the password");
        }).catch((err)=>{
            alert(err);
        })
        
    }
    return (
        <div>
           <form onSubmit={resetPassword}>

               <input type="password" placeholder="enter new password" onChange={(e)=>{
                   setPassword(e.target.value)
               }}></input>
               <button>Reset Password</button>
           </form> 
        </div>
    )
}

export default UpdatePassword

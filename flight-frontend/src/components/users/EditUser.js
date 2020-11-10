import { React, useState ,useEffect} from "react";
import {useHistory,useParams} from 'react-router-dom';
import axios from "axios";
const EditUser =()=>{
    let history = useHistory();
    const {id} = useParams();
    const [user,setUser] =useState({
        name:"",
        username:"",
        email:"",
        phone:"",
        website:""

    });
   const {name,username,email,phone,website} =user;
    const onInputChange=(e)=>{
        setUser({...user, [e.target.name]:e.target.value})
    }
    useEffect(()=>{
    loadUser();
    },[])
    const onSubmit=async (e)=>{
        e.preventDefault(); 
        await axios.put(`http://localhost:3003/users/${id}`,user);
        history.push("/")
        

    }
    useEffect(()=>{
        loadUser();
    })
    const loadUser =async()=>{
        const result =await axios.get(`http://localhost:3003/users/${id}`)
       // console.log(result)
      setUser(result.data);
    }
    return(
        
        <div className="container"> 
        <div className="w-75 mx-auto shadow p-5 ">
        <h1 className="text-center mb-4">Edit A User</h1>
        <form onSubmit={e=>onSubmit(e)}>
        <div className="form-group">
         <input
         type="text"
         className="form-control form-control-lg"
         placeholder="Enter Your Name"
         name="name"
         value={name}
         onChange={e=>onInputChange(e)}

         />
     </div>
        <div className="form-group">
         <input
         type="text"
         className="form-control form-control-lg"
         placeholder="Enter Your Username"
         name="username"
         value={username}
         onChange={e=>onInputChange(e)}
         />
     </div>
     <div className="form-group">
         <input
         type="email"
         className="form-control form-control-lg"
         placeholder="Enter Your Email Address"
         name="email"
         value={email}
         onChange={e=>onInputChange(e)}
         />
     </div>
     <div className="form-group">
         <input
         type="text"
         className="form-control form-control-lg"
         placeholder="Enter Your Phone"
         name="phone"
         value={phone}
         onChange={e=>onInputChange(e)}
         />
     </div>


     <div className="form-group">
         <input
         type="text"
         className="form-control form-control-lg"
         placeholder="Enter Your Website Name"
         name="website"
         value={website}
         onChange={e=>onInputChange(e)}
         />
     </div>
  
  <button type="submit" className="btn btn-primary">Update User</button>
</form>
        </div></div>
    )
}


export default EditUser;
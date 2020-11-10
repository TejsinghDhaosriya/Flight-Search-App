import { React,useState,useEffect } from "react";
import { Link,useParams } from "react-router-dom"; 
import axios from 'axios'; 
const User =()=>{
    const [user,setUser] =useState({
        name:"",
        username:"",
        email:"",
        phone:"",
        website:""

    });
    const {id} =useParams();
    useEffect(()=>{
        loadUser();
    },[])
    const loadUser =async()=>{
        const result =await axios.get(`http://localhost:3003/users/${id}`)
       // console.log(result)
      setUser(result.data);
    }
    return(
        <div container="container py-4">
            <Link className="btn btn-primary" to="/">Back to Home </Link>
            <h1 className="display-4">User Id : {id}</h1>
            <hr/>
                 <li className="l ist-group-item">name: {user.name}</li>
                <li className="list-group-item">name: {user.username}</li>
                <li className="list-group-item">name: {user.email}</li>
                <li className="list-group-item">name: {user.phone}</li>
                <li className="list- group-item">name: {user.website}</li>
            </ul>
        </div>

    )
}


export default User;
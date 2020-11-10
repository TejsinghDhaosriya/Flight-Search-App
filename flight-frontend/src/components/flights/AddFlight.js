import { React, useState } from "react";
import {useHistory} from 'react-router-dom';
import axios from "axios";

import { baseURL } from "../.././baseUrl";
import DateTimePicker from 'react-datetime-picker';
const AddUser =()=>{
    const [value, onChange] = useState(new Date());
    const [value2, onChange2] = useState(new Date());
    console.log(value)
    let history = useHistory();
    const [flight,setUser] =useState({
        number:"",
        departure_city:"",
        departure_time:"",
        arrival_city:"",
        arrival_time:""

    });
   const {number,
   departure_city,
   departure_time,
   arrival_city,
   arrival_time} =flight;
    const onInputChange=(e)=>{
        setUser({...flight, [e.target.name]:e.target.value,departure_time:value,arrival_time:value2})
        console.log(flight)
    }
    const onSubmit=async (e)=>{
        e.preventDefault(); 
        
        const dt=new Date(flight.departure_time).getTime();
        flight.departure_time=String(dt).substr(0,10)
        const at=new Date(flight.arrival_time).getTime();
        console.log(flight.arrival_time)
        flight.arrival_time=String(at).substr(0,10)
        
        console.log(flight.arrival_time)
        await axios.post(`${baseURL}flight-create/`,flight);
        history.push("/")
        

    }
    return(
        
        <div className="container"> 
        <div className="w-75 mx-auto shadow p-5 ">
        <h1 className="text-center mb-4">Add A Flight</h1>
        <form onSubmit={e=>onSubmit(e)}>
        <div className="form-group">
         <input
         type="text"
         className="form-control form-control-lg"
         placeholder="Enter Your Name"
         name="number"
         value={number}
         onChange={e=>onInputChange(e)}

         />
     </div>
        <div className="form-group">
         <input
         type="text"
         className="form-control form-control-lg"
         placeholder="Departure City"
         name="departure_city"
         value={departure_city}
         onChange={e=>onInputChange(e)}
         />
     </div>
     <div className="form-group">
         <input
         type="text"
         className="form-control form-control-lg"
         placeholder="Enter Your D"
         name="departure_time"
         value={departure_time}
         onChange={e=>onInputChange(e)}
         />
         <DateTimePicker
        onChange={onChange}
        value={value}
        name="departure_time"
      />
     </div>
     <div className="form-group">
         <input
         type="text"
         className="form-control form-control-lg"
         placeholder="Arrival City"
         name="arrival_city"
         value={arrival_city}
         onChange={e=>onInputChange(e)}
         />
     </div>


     <div className="form-group">
         <input
         type="text"
         className="form-control form-control-lg"
         placeholder="Enter Your Website Name"
         name="arrival_time"
         value={arrival_time}
         onChange={e=>onInputChange(e)}
         />
       <DateTimePicker
        onChange={onChange2}
        value={value2}
        name="arrival_time"
      />
     </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
        </div></div>
    )
}


export default AddUser;
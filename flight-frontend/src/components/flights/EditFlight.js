import { React, useEffect, useState } from "react";
import {useHistory,useParams} from 'react-router-dom';
import axios from "axios";

import { baseURL } from "../.././baseUrl";


const EditUser =()=>{
   const {id} = useParams();
    // const [value] = useState(new Date());
    // const [value2] = useState(new Date());
    let history = useHistory();
    const [flight,setFlight] =useState({
        number:"",
        departure_city:"",
        arrival_city:"",
       departure_time:new Date(),
        arrival_time:new Date()

    });
  //  const {number,
  //  departure_city,
  //  departure_time,
  //  arrival_city,
  //  arrival_time} =flight;
    const onInputChange=(e)=>{
        setFlight({...flight, [e.target.name]:e.target.value})
        console.log(flight)
    }
    // const onChange2 = e => {
    //     setFlight({...flight, departure_time:e})
    //   };

    //   const onChange = e => {
    //     setFlight({...flight, arrival_time:e})
    //   };
      useEffect(()=>{
        loadFlight();
        
    },[]);
   const loadFlight=async ()=>{
       const result = await axios.get(`${baseURL}flight-detail/${id}/`);
       //loading all the existing value in edit page;
       if(typeof result.data.departure_time=="number")
       result.data.departure_time=new Date(result.data.departure_time*1000).toLocaleString()
       if(typeof result.data.arrival_time=="number")
       result.data.arrival_time=new Date(result.data.arrival_time*1000).toLocaleString()
       setFlight(result.data)
   }   
      const onSubmit=async (e)=>{

        console.log(flight)
        // return
        e.preventDefault(); 
        
        const dt=new Date(flight.departure_time).getTime();
        flight.departure_time=String(dt).substr(0,10)
        const at=new Date(flight.arrival_time).getTime();
        console.log(flight.arrival_time)
        flight.arrival_time=String(at).substr(0,10)
        
        // console.log(flight.arrival_time)
        await axios.put(`${baseURL}flight-update/${id}/`,flight);
        history.push("/");
        }
    
  
    return(
        
        <div className="container"> 
        <div className="w-75 mx-auto shadow p-5 ">
        <h1 className="text-center mb-4">Update Flight</h1>
        <form onSubmit={e=>onSubmit(e)}>
        <div className="form-group">
         <input
         type="text"
         className="form-control form-control-lg"
         placeholder="Flight Number"
         name="number"
         value={flight.number}
         onChange={e=>onInputChange(e)}

         />
     </div>
        <div className="form-group">
         <input
         type="text"
         className="form-control form-control-lg"
         placeholder="Departure City"
         name="departure_city"
         value={flight.departure_city}
         onChange={e=>onInputChange(e)}
         />
     </div>
     <div className="form-group">
         <input
         type="text"
         className="form-control form-control-lg"
         placeholder="Enter Your D"
         name="departure_time"
         value={flight.departure_time}
         onChange={e=>onInputChange(e)}
         />
          {/* <DateTimePicker
        onChange={onChange2}
        value={flight.departure_time}
        name="departure_time"
      /> */}
     </div>
     <div className="form-group">
         <input
         type="text"
         className="form-control form-control-lg"
         placeholder="Arrival City"
         name="arrival_city"
         value={flight.arrival_city}
         onChange={e=>onInputChange(e)}
         />
     </div>


     <div className="form-group">
         <input
         type="text"
         className="form-control form-control-lg"
         placeholder="Enter Your Website Name"
         name="arrival_time"
         value={flight.arrival_time}
         onChange={e=>onInputChange(e)}
         />
      {/* <DateTimePicker
        onChange={onChange}
        value={flight.arrival_time}
        name="arrival_time"
      /> */}
     </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
        </div></div>
    )
}


export default EditUser;
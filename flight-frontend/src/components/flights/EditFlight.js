import { React, useState ,useEffect} from "react";
import {useHistory,useParams} from 'react-router-dom';
import axios from "axios";
import { baseURL } from "../.././baseUrl";
import DateTimePicker from 'react-datetime-picker';
const EditFlight =()=>{
    const [value, onChange] = useState(new Date());
    let history = useHistory();
    const {id} = useParams();
    const [flight,setFlight] =useState({
        name:"",
        flightname:"",
        email:"",
        phone:"",
        website:""

    });
   const {name,flightname,email,phone,website} =flight;
    const onInputChange=(e)=>{
        setFlight({...flight, [e.target.name]:e.target.value})
    }
    useEffect(()=>{
    loadFlight();
    },[])
    const onSubmit=async (e)=>{
        e.preventDefault(); 
        await axios.put(`${baseURL}flight-update/${id}`,flight);
        history.push("/")
        

    }
    useEffect(()=>{
        loadFlight();
    })
    const loadFlight =async()=>{
        const result =await axios.get(`${baseURL}flight-list`)
       // console.log(result)
      setFlight(result.data);
    }
    return(
        
        <div className="container"> 
        <div className="w-75 mx-auto shadow p-5 ">
        <h1 className="text-center mb-4">Edit A Flight</h1>
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
         placeholder="Enter Your Flightname"
         name="flightname"
         value={flightname}
         onChange={e=>onInputChange(e)}
         />
         <div>
      <DateTimePicker
        onChange={onChange}
        value={value}
      />
    </div>
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
  
  <button type="submit" className="btn btn-primary">Update Flight</button>
</form>
        </div></div>
    )
}


export default EditFlight;
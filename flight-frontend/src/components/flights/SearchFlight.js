import { React, useState } from "react";
import {useHistory} from 'react-router-dom';
import axios from "axios";

import { baseURL } from "../.././baseUrl";
import DateTimePicker from 'react-datetime-picker';

let data_in =[]
const SearchFlight =()=>{
    let resultw=[]
    // const [value] = useState(new Date());
    // const [value2] = useState(new Date());
    //output loading
  const[output_list,setOutput]=useState([]);

    let history = useHistory();
    const [flight,setUser] =useState({
        number:"",
        departure_city:"",
        arrival_city:"",

        departure_time:new Date(),
        arrival_time:new Date()

    });
    const onInputChange=(e)=>{
        setUser({...flight, [e.target.name]:e.target.value})
        console.log(flight)
    }
    const onChange2 = e => {
        setUser({...flight, departure_time:e})
      };

      const onChange = e => {
        setUser({...flight, arrival_time:e})
      };
    const onSubmit=async (e)=>{

        console.log(flight)
        // return
        e.preventDefault(); 
        
        const dt=new Date(flight.departure_time).getTime();
        flight.departure_time=String(dt).substr(0,10)
        // const at=new Date(flight.departure_time).getTime();
        // console.log(flight.arrival_time)
        flight.arrival_time=String(dt).substr(0,10)
        
        // console.log(flight.arrival_time)
    
        const result =await axios.post(`${baseURL}flight-search/`,flight);
        console.log('Yahi chaiya tha --------',result.data.data)
        console.log(result.data.data)
        // output_data=result.data.data
        // output_len = result.data.data.length
        console.log('Yahi chaiya tha --------',result.data.data.length)
        // history.push("/")
        const st =async()=>{
        for(var i=1;i<=(result.data.data.length);i++)
         {
            result.data.data[i-1].departure_time=await new Date((parseInt(result.data.data[i-1].departure_time))*1000).toLocaleString();
            result.data.data[i-1].arrival_time=await new Date((parseInt(result.data.data[i-1].arrival_time)*1000)).toLocaleString();
           
        }}
          st().then(()=>{
            console.log('################################################')
            console.log(result.data.data)
            resultw.push('mhoan')
            // setOutput(result.data.data);
            var tables=""
            var header ="<tr>"+
           " <th scope='col'>"+"departure_city"+"</th>"+
           "<th scope='col'>"+"departure_time"+"</th>"+
            "<th scope='col'>"+"arrival_city"+"</th>"+
            "<th scope='col'>"+"arrival_time"+"</th>"+
          "</tr>"
            var temp =result.data.data;
            for(var i=1;i<=(result.data.data.length);i++)
          {
            tables += "<tr>" +
            "<td>" + temp[i-1].departure_city + "</td>" +
            "<td>" + temp[i-1].departure_time + "</td>" +
            "<td>" + temp[i-1].arrival_city + "</td>" +
            "<td>" + temp[i-1].arrival_time+ "</td>" +
            "</tr>";
          
          }
          document.getElementById('topper').innerHTML='Flight Information';   
          
          document.getElementById('travel-header').innerHTML='<table>'+header+'</table';   
          document.getElementById('travel').innerHTML='<table>'+tables+'</table';
          

          });
          

        

    }
    console.log('22222222222222------------',resultw)
  
    return(
        
        <div className="container"> 
        <div className="w-75 mx-auto shadow p-5 ">
        <h1 className="text-center mb-4">Search Flight</h1>
        <form onSubmit={e=>onSubmit(e)}>
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
          <DateTimePicker
        onChange={onChange2}
        value={flight.departure_time}
        name="departure_time"
      />
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

    
  <button type="submit" className="btn btn-primary">Search</button>
</form>
        </div>
        
        
        <div className="container">
            <div className="py-4">
                <h1 id="topper"></h1> 
                <table className="table border-shadow">
  <thead className="thead-dark" id="travel-header">
    
  </thead>
  <tbody id="travel" >
 
  </tbody>
</table>
            </div>
        </div>
        
        
        </div>
    )
}


export default SearchFlight;
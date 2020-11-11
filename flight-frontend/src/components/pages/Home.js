import {useEffect,useState}  from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { baseURL } from "../.././baseUrl";


const Home=()=>{
    
        
    const [flights,setFlight] =useState([]);
    //when page loads use useEffect
     useEffect(()=>{
         loadFlights();
     },[]);
    const loadFlights = async function(){
        const result = await axios.get(`${baseURL}flight-list`);
        // console.log(result)
        setFlight(result.data.reverse());
    }
    const deleteFlight=async id=>{
        await axios.delete(`${baseURL}flight-delete/${id}/`);
        loadFlights();
    }
    return(
        <div className="container">
            <div className="py-4">
                <h1>Flight Information  </h1> 
                <table className="table border-shadow">
  <thead className="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">flight_number</th>
      <th scope="col">departure_city</th>
      <th scope="col">departure_time</th>
      <th scope="col">arrival_city</th>
      <th scope="col">arrival_time</th>
      <th scope="col">action</th>
    </tr> 
  </thead>
  <tbody>
  {flights.map((flight,index)=>(
     <tr>
       <th scope ="row" >{index+1}</th>
       <td> {flight.number}</td>
       <td>{flight.departure_city}</td>
       <td>{new Date(flight.departure_time*1000).toLocaleString()}</td>
       <td>{flight.arrival_city}</td>
       <td>{new Date(flight.arrival_time*1000).toLocaleString()}</td>
       

       <td>
           <Link className="btn btn-outline-primary mr-2" to={`/flights/edit/${flight.id}`}>Edit</Link>
           <Link className="btn btn-danger" onClick={()=>deleteFlight(flight.id)}>Delete</Link>

       </td>
       </tr>
  ))}
  
    
  </tbody>
</table>
            </div>
        </div>
    )
}


export default Home; 
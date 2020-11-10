import {useEffect,useState}  from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
const Home=()=>{
    const [flights,setFlight] =useState([]);
    //when page loads use useEffect
     useEffect(()=>{
         loadFlights();
     },[]);
    const loadFlights = async function(){
        const result = await axios.get("http://localhost:3003/flights");
        setFlight(result.data.reverse());
    }
    const deleteFlight=async id=>{
        await axios.delete(`http://localhost:3003/flights/${id}`);
        loadFlights();
    }
    return(
        <div className="container">
            <div className="py-4">
                <h1>Home Page  </h1> 
                <table className="table border-shadow">
  <thead className="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">FlightName</th>
      <th scope="col">Email</th>
      <th scope="col">Action</th>
    </tr> 
  </thead>
  <tbody>
  {flights.map((flight,index)=>(
     <tr>
       <th scope ="row" >{index+1}</th>
       <td> {flight.name}</td>
       <td>{flight.flightname}</td>
       <td>{flight.email}</td>
       <td>
           <Link className="btn btn-primary mr-2" to={`/flights/${flight.id}`}>View</Link>
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
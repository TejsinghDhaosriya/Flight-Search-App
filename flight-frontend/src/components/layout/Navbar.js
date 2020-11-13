import React from 'react';
import {NavLink} from 'react-router-dom'
const Navbar =()=>{
  return(

    <nav className="navbar navbar-expand-lg navbar-light bg-light">

  <NavLink className="nav-link navbar-brand" exact to="/">  JetTravel </NavLink>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
      <NavLink className="nav-link" exact to="/">Home </NavLink>
             </li>
      
 
   <li>
     <NavLink className="nav-link" exact to="/flights/add"> Add  Flight  </NavLink>
     </li>
    <li>
        <NavLink className="nav-link" exact to="/flights/search-flight">Search Flights</NavLink>
      </li>
      </ul>
  </div>
</nav>



//   return(<nav className="navbar navbar-expand-lg navbar-light bg-light">
//   <div className="container">
  
//   <div className="navbar-collapse" id="navbarSupportedContent">
//     <ul className="navbar-nav mr-auto">
//       <li className="nav-item active">
//         <NavLink className="nav-link" exact to="/">Home <span className="sr-only">(current)</span></NavLink>
//       </li>
//       {/* <li className="nav-item">
//         <NavLink className="nav-link" exact to="/about">About</NavLink>
//       </li>
     
//       <li className="nav-item">
//         <NavLink className="nav-link" exact to="/contact">Contact</NavLink>
//       </li>  */}
      
//      </ul>
      
    
//     </div>
//     <NavLink className="btn btn-outline-dark" exact to="/flights/add">Add Flight</NavLink>
//     </div>
//     <div >
//         <NavLink className="btn btn-outline-dark" exact to="/flights/search-flight">Search Flights</NavLink>
//       </div>
// </nav>
  )

}
export default Navbar;
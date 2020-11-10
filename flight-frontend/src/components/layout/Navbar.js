import React from 'react';
import {NavLink} from 'react-router-dom'
const Navbar =()=>{
  return(<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container">
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <NavLink className="nav-link" exact to="/">Home <span className="sr-only">(current)</span></NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" exact to="/about">About</NavLink>
      </li>
     
      <li className="nav-item">
        <NavLink className="nav-link" exact to="/contact">Contact</NavLink>
      </li>

     </ul>
    </div>
    <NavLink className="btn btn-outline-dark" to="/users/add">Add User</NavLink>
    </div>
</nav>
  )

}
export default Navbar;
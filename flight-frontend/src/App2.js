import React from 'react';
import './App.css';

import { baseURL } from "./baseUrl"
import { TimePicker } from 'antd';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      flightList:[],
      activeItem:{
        id: null,
        number: '',
       departure_city: '',
       departure_time: null,
       arrival_city: '',
       arrival_time: null,
      },
      editing:false,
    }

   this.fetchFlights=this.fetchFlights.bind(this)
   this.handleChange =this.handleChange.bind(this)
   this.handleSubmit = this.handleSubmit.bind(this)
   this.deleteItem=this.deleteItem.bind(this)
  };
  componentWillMount(){
    this.fetchFlights()
  }
  fetchFlights()
    {
      console.log('fetching...')
      fetch(`${baseURL}flight-list`)
      .then(response=>response.json())
      .then(data=>
        this.setState({
          flightList:data
        } ))
    }

  handleChange(e)
  {
    var name=e.target.name
    var value = e.target.value
    console.log('Name: ',name)
    console.log('Value: ',value)
    this.setState({
      activeItem:{
        ...this.state.activeItem,
        number:value
      }
    })
  }
  handleSubmit(e){
  e.preventDefault()
  console.log('ITEM:',this.state.activeItem)
  var url = `${baseURL}flight-create/`
  if(this.state.editing==true)
    {
      url= `${baseURL}flight-update/${this.state.activeItem.id}/ `
      this.setState({
        editing:false
      })
    }
  fetch(url,{
    method:'POST',
    headers:{
      'Content-type':'application/json',

    },
    body:JSON.stringify(this.state.activeItem)
  }).then((response)=>{
    this.fetchFlights()
    this.setState({
      activeItem:{
        id: null,
        number: '',
       departure_city: '',
       departure_time: null,
       arrival_city: '',
       arrival_time: null,
      
      }
    })
    }).catch(function(error)
    {console.log('ERROR: ',error)}
    )
  

  }
  startEdit(flight){
    this.setState({
      activeItem:flight,
      editing:true

    })
  }
  deleteItem(flight){
    fetch(`${baseURL}flight-delete/${flight.id}/`,{
      method:'DELETE',
      header:{
        'Content-type':'application/json',
      },
    }).then((response)=>{
      this.fetchFlights()

    })
  }
  strikeUnstrike(flight){
    flight.completed=!flight.completed
    var url =`${baseURL}flight-update/${flight.id}/`
    fetch(url,{
      method:'POST',
      headers:{
        'Content-type':'application/json',
      },
      body:JSON.stringify({'completed':flight.completed,'title':flight.title})
    }).then(()=>{
      this.fetchFlights()
    })
  }
    render(){
      var self=this
    var flights = this.state.flightList;
    return(
      <div className="container">

        <div id="flight-container">
            <div  id="form-wrapper">
               <form onSubmit={this.handleSubmit}  id="form">
                  <div className="flex-wrapper">
                      <div style={{flex: 6}}>
                          <input onChange={this.handleChange} className="form-control" id="number" value={this.state.activeItem.number} type="text" name="number" placeholder="Add flight number" />
                       </div>

                       <div style={{flex: 6}}>
                          <input onChange={this.handleChange} className="form-control" id="departure_city" value={this.state.activeItem.departure_city} type="text" name="departure_city" placeholder="Add flight departure_city" />
                       </div>

                       <div style={{flex: 6}}>
                          <input onChange={this.handleChange} className="form-control" id="departure_time" value={this.state.activeItem.departure_time} type="text" name="departure_time" placeholder="Add flight departure_time" />
                       </div>

                       <div style={{flex: 6}}>
                          <input onChange={this.handleChange} className="form-control" id="arrival_city" value={this.state.activeItem.arrival_city} type="text" name="arrival_city" placeholder="Add flight arrival_city" />
                       </div>

                       <div style={{flex: 6}}>
                          <input onChange={this.handleChange} className="form-control" id="arrival_time" value={this.state.activeItem.arrival_time} type="text" name="arrival_time" placeholder="Add flight arrival_time" />
                       </div>

                       <div style={{flex: 1}}>
                          <input id="submit" className="btn btn-warning" type="submit" name="Add" />
                        </div>
                    </div>
              </form>
           
            </div>

            <div  id="list-wrapper">         
                  {flights.map(function(flight, index){
                    return(
                        <div key={index} className="flight-wrapper flex-wrapper">

                          <div onClick={() => self.strikeUnstrike(flight)} style={{flex:3}}>

                              {flight.completed == false ? (
                                  <span>{flight.number}</span>

                                ) : (

                                  <strike>{flight.number}</strike>
                                )}

                          </div>
                          <div style={{flex:1}}>
                              <span>{flight.departure_city}</span>
                                 </div>
                          <div style={{flex:1}}>
                              <span>{flight.departure_time}</span>
                                 </div>
                          <div style={{flex:1}}>
                              <span>{flight.arrival_city}</span>
                                 </div>
                                 <div style={{flex:1}}>
                              <span>{flight.arrival_time}</span>
                                 </div>

                          <div style={{flex:1}}>
                              <button onClick={() => self.startEdit(flight)}  className="btn btn-sm btn-outline-info">Edit</button>
                          </div>

                          <div style={{flex:1}}>
                              <button onClick={() => self.deleteItem(flight)} className="btn btn-sm btn-outline-dark delete">Delete</button>
                          </div>

                        </div>
                      )
                  })}
            </div>
        </div>
        <div id="container" style="padding: 24px" />
    <script>var mountNode = document.getElementById('container');</script>
      </div>
    )
}
}


export default App;

import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Update extends Component{
  constructor(props){
    super(props);
    this.state = {
      id:'',
      name:'',
      department:'',
      contact:''
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }
  //First get user data 
  async getUserData(){

    let Data= this.props.match.params.id;
    console.log(Data);
    const response = await fetch(`http://localhost:7001/user/${Data}`,{
        method: 'GET',
              mode: 'cors', // no-cors, *cors, same-origin
              cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
              credentials: 'same-origin', // include, *same-origin, omit
              header:{'accept':'application/json',
              'content-type': 'application/json'
            },
            
        });
        const data= await response.json();
        console.log(data);
        console.log(data[0].id);
        this.setState({
            id: data[0].id,
            name: data[0].name,
            department: data[0].department,
            contact: data[0].contact
        })
        
    }

componentDidMount(){
    this.getUserData();
};

 //Edit User after getting data from from
  editUser(newUser){
      console.log(newUser);
      fetch(`http://localhost:7001/user/${this.state.id}`,{
          method: 'PUT',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(newUser) //have to sent data in json format
        }).then(response=>{

        }).catch(err=>console.log(err));
  }
  
  //Set state data as like user input
  onSubmit(e){
    const newUser = {
      name: this.refs.name.value,
      department: this.refs.department.value,
      contact: this.refs.contact.value
    }
    console.log(newUser);
    this.editUser(newUser);
    e.preventDefault();
  }
 
  //Input change enable
  handleInputChange(e){
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  
  
  render(){
    return (
     <div>
        <br />
       <Link className="btn btn-primary btn-md" to="/show">Back</Link>
       <h1>Edit User</h1>
       <form onSubmit={this.onSubmit.bind(this)}>
          <div className="input-field">
            <input type="text" name="name" ref="name" value={this.state.name} onChange={this.handleInputChange} />
            <label htmlFor="name">Name</label>
          </div>
          <div className="input-field">
            <input type="text" name="department" ref="department" value={this.state.department} onChange={this.handleInputChange} />
            <label htmlFor="department">Department</label>
          </div>
          <div className="input-field">
            <input type="text" name="contact" ref="contact" value={this.state.contact} onChange={this.handleInputChange} />
            <label htmlFor="contact">Contact</label>
          </div>
          <input type="submit" value="Save" className="btn" />
        </form>
      </div>
    )
  }
}

export default Update;
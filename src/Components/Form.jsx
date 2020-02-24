import React, { Component } from 'react'

export class Form extends Component {

   //creating props and make new state
    constructor(props) {
        super(props)
        this.state = {
          name: '',
          department: '',
          contact: ''
        }
      }

    //change the state according to form value
     onChange=(e)=>{
         this.setState({[e.target.name]: e.target.value})
     }
     
     //Sent data to the server after submitting
     onSubmit = (e) => {
        e.preventDefault();
    
        fetch('http://localhost:7001/user' ,{
            method: "POST",
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify(this.state) //have to sent data in json format
          })
          .then((result) => result.json())
          .then((info) => { console.log(info); })
    }
   
    //Creating a form for submitting data
    render() {
        return (
            <div className="session">
             <a className="btn btn-primary btn-md" href="/show">Show User</a>
             <h1>Create your Account</h1>
                <div className="register-form">
                    <form method='POST' action='http://localhost:7001/user'>
                        <label>Name: </label>
                        <input name="name" placeholder="your name" />
                        <br/>
                        <label>Department:</label>
                        <input name="department" placeholder="your dept"/>
                        <br/>
                        <label>Contact: </label>
                        <input name="contact" placeholder="your contact" />
                        <br/>
                        <button type="submit" class="btn-success">insert</button>
                    </form>
                </div>
          </div>
        );
    }
}

export default Form

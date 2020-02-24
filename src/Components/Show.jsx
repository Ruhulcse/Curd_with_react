import React, { Component } from 'react'
import { Link } from 'react-router-dom';
export class Show extends Component {
    constructor(props){
        super(props);
        this.state = {
            users: []
        };
    }

   async showData(){
       const response = await fetch("http://localhost:7001/user");
       const data= await response.json();
       console.log(data);
       this.setState({users: data});
   }

   componentDidMount(){
       this.showData();
   }

   deleteUser(id){
       console.log(id);
       if(window.confirm('Are you sure?')){
           fetch('http://localhost:7001/user/'+id,{
              method: 'DELETE',
              mode: 'cors', // no-cors, *cors, same-origin
              cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
              credentials: 'same-origin', // include, *same-origin, omit
              header:{'accept':'application/json',
              'content-type': 'application/json'
            }
               
           })
       }
   }
    render() {
        return (
            <div className="container">
                <a className="btn btn-primary btn-md" href="/">Insert User</a>
              <div className="row">
              <table className="table table-striped mt-5">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Department</th>
                                <th scope="col">Contact</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.users.map(user => {
                                return(
                                    <React.Fragment>
                                        <tr>
                                            <td>{user.id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.department}</td>
                                            <td>{user.contact}</td>
                                            <td><Link className="btn btn-success" to={`update/${user.id}`}>Update</Link></td>
		                                    <td><button type="button" className="btn btn-danger" onClick={()=>this.deleteUser(user.id)}>Delete</button></td>
                                        </tr>
 
                                    </React.Fragment>
                                );
                            })}
                        </tbody>
                    </table>
              </div>
            </div>
        )
    }
}

export default Show

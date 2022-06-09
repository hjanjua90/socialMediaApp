import React, {Component} from 'react';
import {isAuthenticated} from '../auth';

class Profile extends Component {

    constructor(){
        super()
        this.state = {
            user:"",
            redirectToSignIn: false
        }
    }
    componentDidMount(){
        const userId = this.props.match.params.userId
        fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`,{
            method:"GET",
            headers:{

            }
        })
    }

    render(){
        return(
            <div className='container'>
                <h2 className="mt-5 mb-5">Profile</h2>
                <p>Hello {isAuthenticated().user.name}</p>
                <p>Email: {isAuthenticated().user.email}</p>
            </div>
        );
    }
}











export default Profile
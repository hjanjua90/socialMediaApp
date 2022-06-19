import React, { Component } from 'react'

export class DeleteUser extends Component {

    deleteAccount = () => {
        console.log("delete Account")
    }

    deleteConfirmed =() =>{
        let answer = window.confirm("Are you sure you want to delete your account")
        if(answer){
            this.deleteAccount()
        }
    }

    render() {
        return (
            <button className='btn btn-raised btn-danger'>
                Delete Profile
            </button>
        
        )
    }
    }

export default DeleteUser
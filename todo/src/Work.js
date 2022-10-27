import React from 'react'
import axios from 'axios'
import {useStateValue} from "./StateProvider"



export default function Work({work,removeJob}) {
    const {error, setError,signIn,signOut,currentUser,setCurrentUser,signUp}=useStateValue()


    const deleteTask=()=>{
        // console.log(work.id)
        axios.delete(`http://127.0.0.1:8000/jobs/${work.id}`,{headers:{ Authorization: "Bearer " + currentUser}})
        .then(res=>{
        // console.log(res.status,"<-status code")
        removeJob(work)
        }).catch(err=>{
            if(err.response.status=="401"){
                signOut()
                setError("Token has expired. Please login again.")
            }
            // console.log(err.response.status)
        })
        
    }


  return (
    <div className='border border-primary mb-1 p-2 '>
        <div className='row '>
            <div className='col-2'>
                <button onClick={deleteTask} className='cross-button'>+</button>
            </div>
            <div className='col-10'>
                <div className='fw-bold text-center p-2'>{work.title}</div>
                <div className='col-12'>{work.content}</div>
            </div>
        </div>
    </div>
  )
}

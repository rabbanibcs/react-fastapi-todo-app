import React,{useEffect,useState} from 'react';
import {useStateValue} from "./StateProvider"
import axios from 'axios';
import Work from './Work';



export default function Home() {
  const {signIn,signOut,currentUser,setCurrentUser,signUp}=useStateValue()
  
  const [title, setTitle] = useState("")
  const [content, setContent] = useState()
  const [jobs, setJobs] = useState([])



  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/jobs`,{headers:{ Authorization: "Bearer " + currentUser}})
    .then(res=>{
      // console.log(res.data)
      setJobs(res.data)
    }).catch()
    
  }, [])
  

const removeJob=(job)=>{
  const list=jobs.filter((item)=>(item.id != job.id))
  setJobs(list)
}



const createJob=()=>{
  const job={title,content}
  axios.post(`http://127.0.0.1:8000/jobs/`,job,{headers:{ Authorization: "Bearer " + currentUser}})
  .then(res=>{
    // console.log(res.data)
    setJobs([res.data,...jobs])
    setContent("")
    setTitle("")
  })
  .catch(err=>console.log(err))
}



  return (
    <div className='container mt-1 '>
    <div className='row '>
      <div className='col-6 p-5 left'>
        <h5 className='mb-2 text-center text-uppercase'>Add a Task here</h5>
        <input className="form-control mb-2" 
        value={title}
        placeholder='Title of the work'
        onChange={(e)=>setTitle(e.target.value)} />
        <textarea className="form-control mb-2" 
        value={content}
        placeholder='Description'
        onChange={(e)=>setContent(e.target.value)} ></textarea>
      <div className='btn btn-outline-primary' onClick={()=>createJob()}>Create</div>
    
    
      <div className='btn btn-outline-secondary place' onClick={()=>signOut()}>SignOut</div>
    </div>

    <div className='col-6 p-5 right'>
      <h5 className='mb-2 text-center'>Task to be accomplished</h5>

      {jobs.map((item,id)=><Work key={id} removeJob={removeJob} work={item}/>)}
      
      {jobs.length==0 && <p className='text-center'>No Task.</p>}
      </div>
    </div>
    
    </div>
    
  )
}

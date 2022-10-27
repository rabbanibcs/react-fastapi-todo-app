import React from 'react';
import "./css/login.css";
import { useState,useRef} from "react";
import validator from 'validator';
import {useStateValue} from "./StateProvider"
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { FormControl } from '@mui/material';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import axios from 'axios';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  




function Login(){
    const {error, setError,signIn,signOut,currentUser,setCurrentUser}=useStateValue()
    const [email, setEmail] = useState("")
    const [pwd, setPwd] = useState("")
    const [emailPlholder, setEmailPlholder] = useState("Email . . .")
    const [pwdPlholder, setPwdPlholder] = useState("Password . . .")
    const pwdErr=useRef()
    const emailErr=useRef()
    const authRef=useRef()
    const rightBar=useRef()

    const validateEmail = () => {
        if (validator.isEmail(email)) {
            return true
        } else {
            emailErr.current.value=""
            // setEmailPlholder("Email was not valid")
            setError("Email  address was not valid. Enter a valid email address.")
            setEmail(null)
            return false
        }
    }

    const handleSign=()=>{
        if(!email){
            // setEmailPlholder("Enter your email")
            setError("Please enter a valid email before you try to login.")
        
        }else{
            if(validateEmail()){
                if(!pwd){
                    setPwdPlholder("Enter password")
                    setError("Please enter password before you try to login.")
                }else{
                    const user={"email":email,"password":pwd}
                    signIn(user)
                    
                }
            }
        }
        // rightBar.current.style={width:'30%'}
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [signUpEmail, setSignUpEmail] = useState("")
    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")

    const handleSignUp=()=>{
        const user={"email":signUpEmail,"password":password1}
        if(password1==password2){

            axios.post(`http://127.0.0.1:8000/users`,user)
            .then(res=>{
                console.log("user's signup succesfull")
                authRef.current.innerHTML="Signup successful/Signin now"
                authRef.current.style={visibility:"visible"}
                })
            .catch((err)=>{
                console.log(err)
                authRef.current.innerHTML="Email already exists"
                authRef.current.style={visibility:"visible"}
            })
                handleClose()
            
        }else{
            authRef.current.innerHTML="Passwords did not match"
            authRef.current.style={visibility:"visible"}
            handleClose()
        }
    }

    const handleModal=()=>(
        <Modal
        open={open} 
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
            <FormControl>
            <InputLabel htmlFor="my-input">Email address</InputLabel>
            <Input onChange={(e)=>setSignUpEmail(e.target.value)} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
            <InputLabel htmlFor="my-input">Passward</InputLabel>
            <Input type='password' onChange={(e)=>setPassword1(e.target.value)} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
            <InputLabel htmlFor="my-input">Passward again</InputLabel>
            <Input type='password' onChange={(e)=>setPassword2(e.target.value)} id="my-input" aria-describedby="my-helper-text" />
            <button onClick={handleSignUp} type="button" className="btn btn-outline-primary mt-3">Sign Up</button>
            </FormControl>
        </Box>

    </Modal>
    )
        const crossLeftBar=()=>{
            setError(null)
            rightBar.current.style={"width" : "100%"}
        }



    return(
        <div className="container ">
          
            <div className='row'>
            <div ref={rightBar} className="center-position login__left">
                <div>
                <div><h6 className='text-center mb-4'>Do not have an account? <a className='link signup__link' onClick={handleOpen}>Signup Now</a></h6></div>
                <div ><h6 ref={authRef} style={{visibility:"hidden"}} className='text-center mb-4'>Authentication failed</h6></div>
                {open && handleModal()}
                <div className="input-group mb-5 ">
                    <input className="form-control" 
                    name="email" 
                    ref={emailErr}
                    onChange={(e)=>setEmail(e.target.value)} 
                    placeholder={emailPlholder}
                    />
                </div>    
                
                <div className=" input-group mb-5">
                    <input className="form-control" 
                    name="pwd" 
                    ref={pwdErr} 
                    onChange={(e)=>setPwd(e.target.value)} 
                    placeholder={pwdPlholder}
                    />
                </div>
                    
                <div className="text-center ">
                    <input className="btn btn-primary col-8"  type="button" value="submit" onClick={()=>handleSign()}/>
                </div>
                </div>
            </div>
            <div  className='login__right'>
            {/* <button onClick={crossLeftBar} className='cross-button'>+</button> */}
            
            
            {error ?  <div>
                <h1 className='text-center mt-5'>Sorry!</h1>
                <h4>{error}</h4>

                </div>:
                <div>

                <h1 className='text-center mt-5'>Welcome</h1>
                </div>}
                
            </div>
            </div>
        </div>
    )
}

export default Login;
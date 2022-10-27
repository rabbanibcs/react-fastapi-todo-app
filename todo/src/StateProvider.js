import React, {useState,createContext,useContext} from 'react';
import axios from 'axios';


export const StateContext= createContext()

export const StateProvider=({children})=>{

    const [currentUser,setCurrentUser]=useState(null)
    const [error, setError] = useState(null)

    const signIn=(user)=>{
        // console.log(user)
        axios.post(`http://127.0.0.1:8000/users/login`,user)
        .then(res=>{
            localStorage.setItem('token',JSON.stringify(res.data.access_token));
            setCurrentUser(JSON.parse(window.localStorage.getItem("token")))
            // console.log('user logged In')
    
            })
        .catch((err)=>{
            console.log(err.response.status)
            setError("Either Email or Password or Both was invalid. Please try again with valid credentials.")
        });
      }

    const signOut=()=>{
        localStorage.clear();
        setCurrentUser(null);
        setError("You are logged Out.")
    }

    


    const value={
        error,
        setError,
        signIn,
        signOut,
        currentUser,
        setCurrentUser,
    }


    
    return <StateContext.Provider value={value}>
        {children}
    </StateContext.Provider>
  
}

export const useStateValue=()=>useContext(StateContext) // custom Hook
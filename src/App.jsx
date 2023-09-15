
import { useState } from 'react';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from './firebase/firebase.init';


function App() {
  const [user,setuser]=useState({});
  const auth = getAuth(app);
  console.log(user)
  const Googleprovider = new GoogleAuthProvider();
  const provider = new GithubAuthProvider();

  



  const hendleGoogle=()=>{
    signInWithPopup(auth, Googleprovider)
    .then((result) =>{
      const user=result.user;
      setuser(user)
      console.log(user)
     
    })
    .catch((error) => {
      
      
      const errorMessage = error.message;
      console.log(errorMessage)
      
    });
  }

 const hendleGithaub=()=>{
  signInWithPopup(auth, provider)
    .then((result) =>{
      const user=result.user;
      setuser(user)
      console.log(user)
     
    })
    .catch((error) => {
      
      
      const errorMessage = error.message;
      console.log(errorMessage)
      
    });
 }
 const singout=()=>{
  signOut(auth)
    .then(()=>{
    setuser({})
    
    });
  }

  return (
    <>
     <h1 className='text-white'>Working Button SingIn & SingOut </h1>
     {
      user.uid ? <button className="btn btn-warning my-3 px-3" onClick={singout}>sing out</button> : 
      <>
      <button className="btn btn-warning mx-3 mt-4 px-2"  onClick={hendleGoogle}>Login width google</button>
      <button className="btn btn-warning mt-4 px-2"  onClick={hendleGithaub}>Sign in width GitHub</button>
      </>
     },
    {
      user.uid && <div>
        <h3 className='text-white'>Name: {user?.displayName}</h3>
        <p className='text-white'>Email: {user?.email}</p>
        <p className='text-white'>{user?.metadata?.lastSignInTime}</p>
        <p className='text-white'>{user?.metadata?.lastLoginAt}</p>
        <img className='xxx' src={user?.photoURL} alt="" />
      </div>
    },

     
    </>
  )
}
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
export default App

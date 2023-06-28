import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import "./css/login.css"
import { loginuser } from './features/userSlice';
import { auth } from './firebase';
import Logos from "./my-recpies.jpg";

function Login() {

    const [signup, setSignUp] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const dispatch = useDispatch();

    const register = (e)=>{
        e.preventDefault();

        if(!name)
        {
            return alert("Name is required.")
        }
        if(!email)
        {
            return alert("Email is required.")
        }

        if(!password)
        {
            return alert("Password is required.")
        }

        auth.createUserWithEmailAndPassword(email,password).then((userAuth)=>{
            userAuth.user.updateProfile({
                displayName:name,
            }).then(()=>{
                dispatch(loginuser({
                    email:userAuth.user.email,
                    uid: userAuth.user.uid,
                    displayName:name
                }))
            })
        }).catch(error=>alert(error));

        setName("");
        setEmail("");
        setPassword("");
    }

    const signIn=(e)=>{
        e.preventDefault();
        if(!email)
        {
            return alert("Email is required.")
        }

        if(!password)
        {
            return alert("Password is required.")
        }


        auth.signInWithEmailAndPassword(email,password).then(({user})=>{
            dispatch(loginuser({
                email:user.email,
                uid: user.uid,
                displayName:user.displayName
            }))
        }).catch(error=>alert(error))

    }
    return (
        <>
        
        <div className="loginScreen">
        <a href={"/recipe-app-api"}>
                  <img height="65px" alt="img" src={Logos} width="150px" />
                </a>
          
                {
                    signup===true ? (
            <form onSubmit={register}>
                <input type="text" placeholder="Full Name" value={name} onChange={e=>setName(e.target.value)}/>

                <input type="email" placeholder="Email"  value={email}  onChange={e=>setEmail(e.target.value)}/>
                <input type="password" placeholder="Password"  value={password}  onChange={e=>setPassword(e.target.value)}/>

                <input style={{backgroundColor:'darkslategray'}} type="submit" value="Sign Up"/>

                <h4>Already a member ? <span style={{color:'darkslategray'}} onClick={e=>setSignUp(false)}>Login Here</span></h4>
            </form>) 
            : 
            (
            <form onSubmit={signIn}>
               <input type="email" placeholder="Email"  value={email}  onChange={e=>setEmail(e.target.value)}/>
                <input type="password" placeholder="Password"  value={password}  onChange={e=>setPassword(e.target.value)}/>

                <input style={{backgroundColor:'darkslategray'}} type="submit" value="Sign In"/>

                <h4>Not a member ? <span style={{color:'darkslategray'}} onClick={e=>setSignUp(true)}>Register Here</span></h4>
            </form>
            )
 }
            
        </div>
        </>
    )
}

export default Login

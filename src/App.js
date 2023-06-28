import Pages from "./pages/Pages";
import Category from "./components/Category";
import Search from "./components/Search";
import { BrowserRouter } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Logos from "./my-recpies.jpg";
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginuser, logoutuser, selectUser } from "./features/userSlice";
import Login from "./Login";
import { auth } from "./firebase";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        //already login
        dispatch(loginuser({
          email: userAuth.email,
          uid: userAuth.uid,
          displayName: userAuth.displayName
        }))
      }
      else {
        // logout
        dispatch(logoutuser())
      }
    })
  }, [])

  return (
    <>
      {
        !user ? (<Login/>) : (
          <div className="App">
            <Blur>
        
            </Blur>
            <BrowserRouter>
              <Nav>
                <H1>THOUGHTS FOR FOOD</H1>
                <img style={{marginRight:"530px",marginTop:"10px"}} width="60px" height="55px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3ENqcWQadTj6_oIvi68jET38-hqVdIj2D0w&usqp=CAU"/>
                <Logo to={"/recipe-app-api"}>
                  <img height="65px" alt="img" src={Logos} width="100px" />
                </Logo>
              
              </Nav>
              <hr style={{ opacity: 0.4 }} />
              <Button style={{borderRadius:"10px",padding:"1px 8px 12px 8px",height:"30px",marginTop:"20px",marginLeft:"990px"}} onClick={e=>firebase.auth().signOut()}>Logout</Button>
              <Search />
             
              <Category />
              <Pages />
            </BrowserRouter>
          </div>
        )
      }


    </>

  );
}

const H1 = styled.h1`
margin-top:12px;
color:grey;
font-family:Bradley Hand, cursive
`
const Blur = styled.div`
  top: 0;
  right: 0;
  z-index: 0;
  position: absolute;
  width: 528px;
  height: 505px;
  background: linear-gradient(97.37deg, #f15b2b -15.03%, #ff0006 174.67%);
  filter: blur(727px);
  border-radius: 814px;
`;
const Button = styled.button`
background-color: black;
    color: #fff;
    padding: 0px 14px;
    border: none;
    border-radius: 61px;
    font-size: 18px;
    cursor: pointer;
  &:hover {
    background-color: #e59800;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #fca311;
  }
`;
const Logo = styled(Link)`
  z-index: 200;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius:10px

`;
const Nav = styled.div`
  margin: 2rem 0rem 1rem 0rem;
  display: flex;
  justify-content:space-between
`;
export default App;

import React, { useEffect, useState } from "react"
import Cookies from "universal-cookie"
import "./LoginSignup.css"
// import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom';import Body from './Body';
import axios from "axios" //connects frontend to backend by sending requests
import { useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify" //used to give popup
import "react-toastify/dist/ReactToastify.css"

const LoginSignup = () => {
  //global login
  const cookies = new Cookies()
  const navigate = useNavigate()
  const path = "http://localhost:5000/api/v1/user"
  //defining login and signup variables
  const [name, setName] = useState("") //for sign values
  const [email, setEmail] = useState("") //for login and signup values
  const [password, setPassword] = useState("") //for login and signup values

  const [action, setAction] = useState("Sign Up") //used to update action variable without refreshing the whole page

  // console.log(name);
  // console.log(email);
  // console.log(password);

  const Redirect = () => {
    console.log(name)
    console.log(email)
    console.log(password)
  }

  const handleSignup = async () => {
    try {
      console.log("handlesignup called")
      //waiting for response after post request
      const response = await axios.post(
        path + "/register",
        {
          name: name,
          email: email,
          password: password,
        },
        { headers: { "Content-Type": "application/json" } }
      )

      toast("hello") //doesnt work at the moment

      console.log(response.data.message)
      //temp
      //alert user
      alert(response.data.message)
      // if(response.data.msg=="Already signed in") { //if user already signed in
      //   alert("Already signed in");
      // }

      if (!response) {
        console.log("no response for signup")
      } else {
        console.log("signup response")
      }
    } catch (error) {
      console.log(error, "error")
    }
    //checking for response
  }

  const handleLogin = async () => {
    try {
      //waiting for response after post request
      const response = await axios.post(
        path + "/login",
        {
          email: email,
          password: password,
        },
        { headers: { "Content-Type": "application/json" } }
      )
      //alert user about login
      alert(response.data.message)
      cookies.set("access_token", response.data.token)

      if (!response) {
        console.log("no response for login")
      } else {
        console.log("login response")
        navigate("/")
      }
    } catch (error) {
      console.log(error, "error")
    }
    //checking for response
  }

  return (
    <>
      <div className="background-container">
        <div className="login_container container">
          <div className="header">
            <div className="text">{action}</div>
            <div className="underline"></div>
          </div>
          <div className="inputs">
            {action === "Login" ? null : (
              <div className="input">
                <img src="" alt="" />
                <input
                  type="text"
                  placeholder="Name"
                  defaultValue={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}
            <div className="input">
              <img src="" alt="" />
              {/* setEmail is used to change the value of email whenever input value changes */}
              <input
                id="email_login"
                type="email"
                placeholder="Email Id"
                defaultValue={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input">
              <img src="" alt="" />
              <input
                id="email_password"
                type="password"
                placeholder="Password"
                defaultValue={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          {action === "Sign Up" ? null : (
            <div className="forgot-password">
              Lost Password?<span>Click Here!</span>
            </div>
          )}
          <div
            id="submit_login"
            className="submit-container" /*onClick={Redirect} */
          >
            <div
              className={action === "Login" ? "submit gray" : "submit"}
              onClick={() => {
                setAction("Sign Up")
                console.log("signup called")
                handleSignup()
              }}
            >
              Sign Up
            </div>
            <div
              className={action === "Sign Up" ? "submit gray" : "submit"}
              onClick={() => {
                setAction("Login")
                console.log("login called")
                handleLogin()
              }}
            >
              Log in
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginSignup

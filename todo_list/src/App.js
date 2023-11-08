// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Body from "./Components/Body"
import LoginSignup from "./Components/LoginSignup"
function App() {
  return (
    <>
      {/* <LoginSignup/> */}
      <BrowserRouter>
        <Routes>
          <Route element={<LoginSignup />} path="/login" />
          <Route element={<Body />} path="/" />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

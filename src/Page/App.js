import React from 'react'
import Home from './Home'
import SignIn from '../SignIn/SignIn.js'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import AddEdit from '../AddEdit'
import View from '../View'
import Header from './Header'

function App() {
  return (
    <Router >
         <div className="App"><Header /></div>
        <Routes >
          <Route exact path="/" element={<Home />} />
          {/* <Route exact path="/Room" element={<Room />} /> */}
          <Route exact path="/Home" element={<Home />} />
          <Route exact path="/SignIn" element={<SignIn />} />
          <Route exact path="/Room" element={<AddEdit />} />
          <Route exact path="/view" element={<View />} />
        </Routes>
    </Router>
  )
}

export default App;

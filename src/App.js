import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"

import "./App.css"

import Menu from "./components/Menu"
import Game from "./components/Game"

function App() {
  return (
    <Router>
      <Route path="/" exact>
        <Menu />
      </Route>
      <Route path="/offline">
        <Game />
      </Route>
    </Router>
  )
}

export default App

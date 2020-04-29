import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import '../Homepage/homepage.css'

class ErrorPage extends Component {
  render() {
    return (
      <div className="homepage-container">
        <img
          src="https://media1.tenor.com/images/3ce94e2c5f30772be78e779750c56112/tenor.gif?itemid=3844286"
          className="intro-gif"
        />

        <h2 className="intro">
          Sorry! Either you do not have access to the required access or kindly
          check the URL. Click <NavLink to="/"> here </NavLink> to return to the
          home page
        </h2>
      </div>
    )
  }
}

export default ErrorPage

import React, { Component } from 'react'
import '../css/navbar.css'
import brand from '../img/wyr-logo.png'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Navbar extends Component {
  render() {
    const { user, authedUser } = this.props
    return (
      <div className="nav-container">
        <div className="inner-container">
          <img src={brand} alt="logo" className="nav-brand" />
          {authedUser ? (
            <ul className="nav-list">
              <li className="nav-item">
                <Link to="/home">Home</Link>
              </li>
              <li className="nav-item green">
                <Link to="/add">+ Add new question</Link>
              </li>
              <li className="nav-item split">
                <Link to="/leaderboard">Leaderboard</Link>
              </li>
              <li className="nav-item">{user ? user.name : null}</li>
              <li className="nav-item log-out">
                <Link to="/">
                  <button className="log-out-button">Log Out</button>
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="nav-list">
              <li className="nav-item">Log in to ask a question</li>
            </ul>
          )}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { users, authedUser } = state
  const user = users[authedUser]
  return {
    user,
    authedUser
  }
}

export default connect(mapStateToProps)(Navbar)

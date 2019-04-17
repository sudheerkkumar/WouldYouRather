import React, { Component } from 'react'
import '../css/leaderboard.css'
import { connect } from 'react-redux'

class Leaderboard extends Component {
  render() {
    const { users, leaderboardPlacements } = this.props

    console.log(leaderboardPlacements)

    return (
      <div className="vote-container">
        <h2>Leaderboard</h2>

        {leaderboardPlacements.sort((a, b) => b.points - a.points).map(user => (
          <div key={user.id}>
            <div className="avatar-holder">
              <img
                src={users[user.id].avatarURL}
                alt={`Avatar of ${users[user.id].avatarURL}`}
                className="avatar leaderboard-user"
              />
              <h3 className="author">
                {`${users[user.id].name}`} <small>({user.points} pts)</small>
              </h3>
              <hr />
              <p>
                Questions answered: {Object.keys(users[user.id].answers).length}
              </p>
              <p>Questions asked: {users[user.id].questions.length}</p>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

function mapStateToProps({ users }) {
  const userIds = Object.keys(users)
  const leaderboardPlacements = userIds.map(id => ({
    id: id,
    points:
      Object.keys(users[id].answers).length +
      Object.keys(users[id].questions).length
  }))

  return {
    leaderboardPlacements,
    users
  }
}

export default connect(mapStateToProps)(Leaderboard)

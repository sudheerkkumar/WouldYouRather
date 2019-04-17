import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../css/question.css'
import { formatDate } from '../utils/_DATA'
import { Link } from 'react-router-dom'

class Question extends Component {
  render() {
    const { question, user, question_id } = this.props

    return (
      <div className="question">
        <div className="question-title">
          <img src={user.avatarURL} alt="avatar!" className="avatar" />
          <h4>
            {user.name} <small>{formatDate(question.timestamp)}</small>
          </h4>
        </div>
        <div className="question-body">
          <h5>Would you rather:</h5>
          <p>A: {question.optionOne.text}</p>
          <p>B: {question.optionTwo.text}</p>
        </div>
        <div className="question-footer">
          <Link to={`/question/${question_id}`}>
            <button className="vote-button">TAKE A VOTE</button>
          </Link>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ questions, users }, { id }) {
  const question = questions[id]
  const question_id = question.id
  const user = users[question.author]

  return {
    question,
    question_id,
    user
  }
}

export default connect(mapStateToProps)(Question)

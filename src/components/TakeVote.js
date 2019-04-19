import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../css/question.css'
import '../css/takeVote.css'
import { handleSaveQuestionAnswer } from '../actions/questions'
import { Link } from 'react-router-dom'

class TakeVote extends Component {
  handleVote = answerObj => {
    const { dispatch } = this.props
    dispatch(handleSaveQuestionAnswer(answerObj))
  }

  render() {
    const {
      question,
      authedUser,
      rogueQuestion,
      questionAnswer,
      users
    } = this.props

    if (rogueQuestion) {
      return (
        <div className="vote-container">
          <h2>404: Woops, seems like that question went rogue!</h2>
          <p>
            Return to{' '}
            <Link to="/">
              <span className="green">safety</span>
            </Link>
          </p>
        </div>
      )
    }

    const optionOneAmount = question.optionOne.votes.length
    const optionTwoAmount = question.optionTwo.votes.length
    const allVotes = optionOneAmount + optionTwoAmount

    const optionOnePercentage = parseInt((optionOneAmount / allVotes) * 100, 10)
    const optionTwoPercentage = parseInt((optionTwoAmount / allVotes) * 100, 10)

    if (questionAnswer === undefined) {
      return (
        <div>
          <Link to="/home">
            <button className="returnBtn">
              &#60;&nbsp;&nbsp;Return to questions
            </button>
          </Link>
          <div className="vote-container">
            <div className="avatar-holder">
              <img
                src={users[question.author].avatarURL}
                alt={`Avatar of ${users[question.author].avatarURL}`}
                className="avatar"
              />
              <h3 className="author">
                {`${users[question.author].name}`} asks:
              </h3>
            </div>
            <br />
            <div>
              <h1>Would you rather</h1>
              <h3>
                A: {question.optionOne.text}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button
                  className="vote-btn"
                  onClick={() =>
                    this.handleVote({
                      authedUser,
                      qid: question.id,
                      answer: 'optionOne'
                    })
                  }
                >
                  Choose this
                </button>
              </h3>
              <h3>
                B: {question.optionTwo.text}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button
                  className="vote-btn"
                  onClick={e =>
                    this.handleVote({
                      answer: 'optionTwo',
                      authedUser,
                      qid: question.id
                    })
                  }
                >
                  Choose this
                </button>
              </h3>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <Link to="/home">
            <button className="returnBtn">
              &#60;&nbsp;&nbsp;Return to questions
            </button>
          </Link>
          <div className="vote-container">
            <div className="avatar-holder">
              <img
                src={users[question.author].avatarURL}
                alt={`Avatar of ${users[question.author].avatarURL}`}
                className="avatar"
              />
              <h3 className="author">
                {`${users[question.author].name}`} asks:
              </h3>
            </div>
            <br />
            <div>
              <h1>Would you rather</h1>
              <div className="optionOneResults">
                <h3
                  className={
                    users[authedUser].answers[question.id] === 'optionOne'
                      ? 'yourAnswer'
                      : ''
                  }
                >
                  A: {question.optionOne.text}{' '}
                  <small>
                    {users[authedUser].answers[question.id] === 'optionOne'
                      ? '- your answer'
                      : ''}
                  </small>
                </h3>
              </div>
              <div>
                <h3
                  className={
                    users[authedUser].answers[question.id] === 'optionTwo'
                      ? 'yourAnswer'
                      : ''
                  }
                >
                  B: {question.optionTwo.text}{' '}
                  <small>
                    {users[authedUser].answers[question.id] === 'optionTwo'
                      ? '- your answer'
                      : ''}
                  </small>
                </h3>
              </div>
              <div>
                <hr />
                <h4>What other users voted:</h4>
                <p>
                  A: {question.optionOne.text} | {optionOneAmount} votes (
                  {optionOnePercentage}
                  %)
                </p>
                <p>
                  B: {question.optionTwo.text} | {optionTwoAmount} votes (
                  {optionTwoPercentage}
                  %)
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

function mapStateToProps({ questions, users, authedUser }, props) {
  const thisQuestionId = props.match.params.question_id
  const question = questions[thisQuestionId]
  const rogueQuestion = !questions[thisQuestionId]
  const questionAnswer = users[authedUser].answers[thisQuestionId]
  return {
    questions,
    question,
    rogueQuestion,
    questionAnswer,
    users,
    authedUser,
    thisQuestionId
  }
}

export default connect(mapStateToProps)(TakeVote)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import '../css/dashboard.css'
import { createSelector } from 'reselect'

class Dashboard extends Component {
  state = {
    category: 'Unanswered Questions'
  }

  handleToggleCategory = e => {
    const category = e.target.value

    this.setState(() => ({
      category
    }))
  }

  render() {
    const { category } = this.state
    const { unansweredQuestions, answeredQuestions } = this.props
    return (
      <div>
        <div className="category-toggler">
          <select onChange={this.handleToggleCategory}>
            <option value="Unanswered Questions">Unanswered Questions</option>
            <option value="Answered Questions">Answered Questions</option>
          </select>
        </div>

        {category === 'Unanswered Questions' && (
          <ul className="questions">
            {unansweredQuestions.map(id => (
              <li key={id} className="question">
                <Question id={id} />
              </li>
            ))}
          </ul>
        )}

        {category === 'Answered Questions' && (
          <ul className="questions">
            {answeredQuestions.map(id => (
              <li key={id} className="question">
                <Question id={id} />
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
}

const getUnansweredQuestions = createSelector(
  state => state.questions,
  state => Object.keys(state.users[state.authedUser].answers),
  state => Object.keys(state.questions),
  (questions, answeredQuestions, questionsId) =>
    questionsId
      .filter(id => !answeredQuestions.includes(id))
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
)

const getAnsweredQuestions = createSelector(
  state => state.questions,
  state => Object.keys(state.users[state.authedUser].answers),
  (questions, answers) =>
    answers.sort((a, b) => questions[b].timestamp - questions[a].timestamp)
)

function mapStateToProps(state) {
  const { users, questions } = state
  return {
    users,
    questions,
    answeredQuestions: getAnsweredQuestions(state),
    unansweredQuestions: getUnansweredQuestions(state)
  }
}

export default connect(mapStateToProps)(Dashboard)

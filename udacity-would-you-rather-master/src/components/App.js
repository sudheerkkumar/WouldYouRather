import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from '../components/Dashboard'
import LogInPage from '../components/LogInPage'
import LoadingBar from 'react-redux-loading'
import Leaderboard from '../components/Leaderboard'
import NewQuestion from '../components/NewQuestion'
import TakeVote from '../components/TakeVote'
import Navbar from './Navbar'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'

class App extends Component {
  componentWillMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div>
            <Navbar />
            {this.props.loading === true ? null : (
              <div>
                <Route path="/" exact component={LogInPage} />
                <PrivateRoute path="/home" component={Dashboard} />
                <PrivateRoute
                  path="/question/:question_id"
                  component={TakeVote}
                />
                <PrivateRoute path="/add" component={NewQuestion} />
                <PrivateRoute path="/leaderboard" component={Leaderboard} />
              </div>
            )}
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({ loadingBar }) {
  return {
    loading: loadingBar > 0
  }
}

export default connect(mapStateToProps)(App)

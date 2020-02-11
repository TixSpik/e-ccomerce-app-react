import React from 'react';
import Home from './pages/home/Home';
import { Switch, Route, Redirect } from 'react-router-dom';
import Shop from './pages/shop/Shop';
import Header from './components/header/Header';
import SignInAndSignUp from './pages/sign-in-and-sign-up/SignInAndSignUp';
import { auth, createUserProfileDoc } from './firebase/firebase.utils';
import { setCurrenrUser } from './redux/user/userAction'
import { connect } from 'react-redux';

class App extends React.Component {

  unsubscribeFromAuth = null

  componentDidMount() {
    const { setCurrenrUser } = this.props

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {

        const userRef = await createUserProfileDoc(userAuth)

        userRef.onSnapshot(snapShot => {
          setCurrenrUser({
            id: snapShot.id,
            ...snapShot.data()
          })

        })
      } else {
        setCurrenrUser(userAuth)
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render() {
    return (
      <div >
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/shop' component={Shop} />
          <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInAndSignUp />)} />
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})
const mapDispatchToProps = dispatch => ({
  setCurrenrUser: user => dispatch(setCurrenrUser(user))
})
export default connect(mapStateToProps, mapDispatchToProps)(App);

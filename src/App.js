import React from 'react';
import Home from './pages/home/Home';
import { Switch, Route, Redirect } from 'react-router-dom';
import Shop from './pages/shop/Shop';
import Header from './components/header/Header';
import SignInAndSignUp from './pages/sign-in-and-sign-up/SignInAndSignUp';
import CheckOut from './pages/checkout/CheckOut';
import { auth, createUserProfileDoc } from './firebase/firebase.utils';
import { setCurrenrUser } from './redux/user/userAction'
import { connect } from 'react-redux';
import { toogleCartHidden } from './redux/cart/cartAction';
import { selectCurrentUser } from './redux/user/userSelectors';
import { createStructuredSelector } from 'reselect'
import { selectCartHidden } from './redux/cart/cartSelectors';

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

  closeCartOutOfDiv(e) {
    const { hidden, toogleCartHidden } = this.props
    let isHide = e.target.id

    if (isHide === 'divclick' && hidden === false) {
      toogleCartHidden(true)
    }
  }
  render() {
    return (
      <div id='divclick' onClick={(e) => this.closeCartOutOfDiv(e)}>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/shop' component={Shop} />
          <Route exact path='/checkout' component={CheckOut} />
          <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInAndSignUp />)} />
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
})

const mapDispatchToProps = dispatch => ({
  setCurrenrUser: user => dispatch(setCurrenrUser(user)),
  toogleCartHidden: () => dispatch(toogleCartHidden())
})
export default connect(mapStateToProps, mapDispatchToProps)(App);

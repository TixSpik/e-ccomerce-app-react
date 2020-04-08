import React, { useEffect } from 'react';
import Home from './pages/home/Home';
import { Switch, Route, Redirect } from 'react-router-dom';
import Shop from './pages/shop/Shop';
import Header from './components/header/Header';
import SignInAndSignUp from './pages/sign-in-and-sign-up/SignInAndSignUp';
import CheckOut from './pages/checkout/CheckOut';
import { connect } from 'react-redux';
import { toogleCartHidden } from './redux/cart/cartAction';
import { selectCurrentUser } from './redux/user/userSelectors';
import { createStructuredSelector } from 'reselect'
import { selectCartHidden } from './redux/cart/cartSelectors';
import { checkUserSession } from './redux/user/userAction';

const App = ({ checkUserSession, currentUser, hidden, toogleCartHidden }) => {

  useEffect(() => {
    checkUserSession()
  }, [checkUserSession])

  const closeCartOutOfDiv = (e) => {
    let isHide = e.target.id

    if (isHide === 'divclick' && hidden === false) {
      toogleCartHidden(true)
    }
  }

  return (
    <div id='divclick' onClick={(e) => closeCartOutOfDiv(e)}>
      <Header />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/shop' component={Shop} />
        <Route exact path='/checkout' component={CheckOut} />
        <Route exact path='/signin' render={() => currentUser ? (<Redirect to='/' />) : (<SignInAndSignUp />)} />
        <Route component={PageNotFoud} />
      </Switch>
    </div>
  );
}
const PageNotFoud = () => (
  <h2 style={{ textAlign: "center" }}>
    PAGE NOT FOUND
  </h2>
)

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
})

const mapDispatchToProps = dispatch => ({
  toogleCartHidden: () => dispatch(toogleCartHidden()),
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);

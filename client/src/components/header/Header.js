import React from 'react'
import { Link } from 'react-router-dom'
import './Header.scss'
import Logo from '../../assets/logo.png'
import { connect } from 'react-redux'
import CartIcon from '../cart-icon/CartIcon'
import CartDropDown from '../cart-dropdown/CartDropDown'
import { createStructuredSelector } from 'reselect'
import { selectCartHidden } from '../../redux/cart/cartSelectors'
import { selectCurrentUser } from '../../redux/user/userSelectors'
import { signOutStart } from '../../redux/user/userAction'

function Header(props) {
    const { currentUser, hidden, signOutStart } = props

    return (
        <div className='header'>
            <Link className='logo-container' to='/'>
                <img style={{ width: 60 }} src={Logo} className='logo' alt='logo' />
            </Link>
            <div className='options'>
                <Link className='option' to='/shop'>
                    SHOP
                </Link>
                <Link className='option' to='/contact'>
                    CONTACT
                </Link>
                {
                    currentUser ? (<div
                        className='option'
                        onClick={signOutStart}>
                        SIGN OUT
                    </div>)
                        : (<Link
                            className='option'
                            to='/signin'>
                            SIGN IN
                        </Link>)
                }
                <CartIcon />
            </div>
            {
                hidden ?
                    null
                    : <CartDropDown />
            }
        </div>
    )
}
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
})
export default connect(mapStateToProps, mapDispatchToProps)(Header)
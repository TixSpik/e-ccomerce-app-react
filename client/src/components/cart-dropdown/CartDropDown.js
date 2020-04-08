import React from 'react'
import './CartDropDown.scss'
import CustomButton from '../custom-button/CustomButton'
import CartItem from '../cart-item/CartItem'
import { connect } from 'react-redux'
import { selectCartItems, selectCartHidden } from '../../redux/cart/cartSelectors'
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router-dom'
import { toogleCartHidden } from '../../redux/cart/cartAction'

function CartDropDown(props) {
    const { cartItems, history, toogleCartHidden } = props

    const btnCheckOutClicked = () => {
        history.push('/checkout')
        toogleCartHidden()
    }
    return (
        <div className='cart-dropdown'>
            <div className='cart-items' >
                {cartItems.length ?
                    <div className={`${cartItems.length > 2 ? 'cart-items-overflow' : ''}`} >
                        {
                            cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem} />)
                        }
                    </div>
                    : <span className='empty-message'>Your cart is empty</span>
                }
            </div>
            <CustomButton onClick={() => btnCheckOutClicked()}>GO TO CHECKOUT</CustomButton>
        </div>
    )
}
const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    hidden: selectCartHidden
})

const mapDispatchToProps = dispatch => ({
    toogleCartHidden: () => dispatch(toogleCartHidden())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartDropDown))
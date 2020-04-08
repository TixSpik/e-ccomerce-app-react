import React from 'react'
import './CheckOut.scss'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectCartItems, selectCartTotal } from '../../redux/cart/cartSelectors'
import CheckOutItem from '../../components/checkout-item/CheckOutItem'
import StripeButton from '../../components/stripe-button/StripeButton'

function CheckOut(props) {
    const { cartItems, cartTotal } = props

    if (cartItems.length === 0) {
        return (
            <div>
                <hr />
                <h2 style={{ textAlign: 'center' }} >Checkout empty</h2>
            </div>
        )
    }

    return (
        <div className='checkout-page'>
            <div className='checkout-header'>
                <div className='header-block'>
                    <span>Propduct</span>
                </div>
                <div className='header-block'>
                    <span>Descripction</span>
                </div>
                <div className='header-block'>
                    <span>Quantity</span>
                </div>
                <div className='header-block'>
                    <span>Price</span>
                </div>
                <div className='header-block'>
                    <span>Remove</span>
                </div>
            </div>
            {
                cartItems.map(cartItem => <CheckOutItem key={cartItem.id} cartItem={cartItem} />)
            }
            <div className='total'>
                <span>TOTAL: ${cartTotal}</span>
            </div>
            <StripeButton price={cartTotal} />
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    cartTotal: selectCartTotal
})

export default connect(mapStateToProps, null)(CheckOut)
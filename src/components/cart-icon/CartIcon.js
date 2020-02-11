import React from 'react'
import './CartIcon.scss'
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'
import { connect } from 'react-redux'
import { toogleCartHidden } from '../../redux/cart/cartAction'

function CartIcon({ toogleCartHidden }) {

    return (
        <div className='cart-icon' id='isHide' onClick={toogleCartHidden}>
            <ShoppingIcon className='shopping-icon' />
            <span className='item-count'>0</span>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    toogleCartHidden: () => dispatch(toogleCartHidden())
})

export default connect(null, mapDispatchToProps)(CartIcon)

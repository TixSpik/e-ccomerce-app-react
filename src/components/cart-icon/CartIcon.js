import React from 'react'
import './CartIcon.scss'
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'
import { connect } from 'react-redux'
import { toogleCartHidden } from '../../redux/cart/cartAction'
import { selectCartItemsCount } from '../../redux/cart/cartSelectors'

function CartIcon({ toogleCartHidden, itemCount }) {

    return (
        <div className='cart-icon' id='isHide' onClick={toogleCartHidden}>
            <ShoppingIcon className='shopping-icon' />
            <span className='item-count'>{itemCount}</span>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    toogleCartHidden: () => dispatch(toogleCartHidden())
})
const mapStateToProps = state => ({
    itemCount: selectCartItemsCount(state)
})
export default connect(mapStateToProps, mapDispatchToProps)(CartIcon)

import React from 'react'
import './CartDropDown.scss'
import CustomButton from '../custom-button/CustomButton'

export default function CartDropDown() {
    return (
        <div className='cart-dropdown'>
            <div className='cart-items' />
            <CustomButton>GO TO CHECKOUT</CustomButton>
        </div>
    )
}

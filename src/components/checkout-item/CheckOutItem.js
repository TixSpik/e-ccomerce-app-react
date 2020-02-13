import React from 'react'
import './CheckOutItem.scss'

export default function CheckOutItem(props) {
    const { cartItem: { name, imageUrl, price, quantity } } = props
    return (
        <div className='checkout-item'>
            <div className='image-container'>
                <img src={imageUrl} alt='item' />
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>{quantity}</span>
            <span className='price'>${price}</span>
            <div className='remove-button'>&#10005;</div>
        </div>
    )
}

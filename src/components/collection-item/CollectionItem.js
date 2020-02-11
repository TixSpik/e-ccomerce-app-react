import React from 'react'
import './CollectionItem.scss'
import CustomButton from '../custom-button/CustomButton'

export default function CollectionItem(props) {
    const { name, price, imageUrl } = props

    return (
        <div className='collection-item'>
            <div
                className='image'
                style={{
                    backgroundImage: `url('${imageUrl}')`
                }}
            />
            <div className='collection-footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <CustomButton inverted>
                ADD TO CART
            </CustomButton>
        </div>
    )
}

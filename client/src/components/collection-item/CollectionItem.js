import React from 'react'
import './CollectionItem.scss'
import CustomButton from '../custom-button/CustomButton'
import { connect } from 'react-redux'
import { addItem } from '../../redux/cart/cartAction'

function CollectionItem(props) {
    const { item, addItem } = props
    const { name, price, imageUrl } = item
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
                <span className='price'>${price}</span>
            </div>
            <CustomButton inverted onClick={() => addItem(item)}>
                ADD TO CART
            </CustomButton>
        </div>
    )
}

const mapDispatchProps = dispatch => ({
    addItem: item => dispatch(addItem(item))
})

export default connect(null, mapDispatchProps)(CollectionItem)
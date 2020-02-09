import React from 'react'
import './PreviewCollections.scss'
import CollectionItem from '../collection-item/CollectionItem'

export default function PreviewCollections(props) {
    const { title, items } = props
    return (
        <div className='collection-preview'>
            <h1 className='title' >{title.toUpperCase()}</h1>
            <div className='preview' >
                {
                    items
                        .filter((item, idx) => idx < 4)
                        .map(({ id, ...itemProps }) => (
                            <CollectionItem key={id} {...itemProps} />
                        ))
                }
            </div>
        </div>
    )
}

import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import './CollectionsOverview.scss'
import PreviewCollections from '../preview-collections/PreviewCollections'
import { selectCollectionForPreview } from '../../redux/shop/shopSelector'

function CollectionsOverview(props) {
    const { collections } = props
    return (
        <div className='collections-overview'>
            {
                collections.map(({ id, ...otherCollectionsProps }) => (
                    <PreviewCollections key={id} {...otherCollectionsProps} />
                ))
            }
        </div>
    )
}
const mapStateToProps = createStructuredSelector({
    collections: selectCollectionForPreview
})
export default connect(mapStateToProps)(CollectionsOverview)
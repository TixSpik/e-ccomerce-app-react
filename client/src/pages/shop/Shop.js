import React, { useEffect } from 'react'
import CollectionsOverviewContainer from '../../components/collections-overview/CollectionsOverviewContainer'
import { Route } from 'react-router-dom'
import CollectionContainer from '../collection/CollectionContainer'
import { connect } from 'react-redux'
import { fetchCollectionsStart } from '../../redux/shop/shopAction'

const ShopPage = ({ match, fetchCollectionsStart }) => {

    useEffect(() => {
        fetchCollectionsStart()
    }, [fetchCollectionsStart])

    return (
        <div className='shop-page'>
            <Route exact path={`${match.path}`} component={CollectionsOverviewContainer} />
            <Route path={`${match.path}/:collectionId`} component={CollectionContainer} />
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
})

export default connect(null, mapDispatchToProps)(ShopPage) 
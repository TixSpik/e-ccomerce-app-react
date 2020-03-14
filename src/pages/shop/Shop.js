import React from 'react'
import CollectionsOverview from '../../components/collections-overview/CollectionsOverview'
import { Route } from 'react-router-dom'
import Collection from '../collection/Collection'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { fetchCollectionsStartAsync } from '../../redux/shop/shopAction'
import WithSpinner from '../../components/with-spinner/WithSpinner'
import { selectIsCollectionFetching } from '../../redux/shop/shopSelector'
const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview)
const CollectionWithSpinner = WithSpinner(Collection)

class Shop extends React.Component {

    componentDidMount() {
        const { fetchCollectionsStartAsync } = this.props
        fetchCollectionsStartAsync()
    }

    render() {
        const { match, isCollectionFetching } = this.props
        return (
            <div className='shop-page'>
                <Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading={isCollectionFetching} {...props} />} />
                <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionWithSpinner isLoading={isCollectionFetching} {...props} />} />
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    isCollectionFetching: selectIsCollectionFetching
})

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
})

export default connect(mapStateToProps, mapDispatchToProps)(Shop) 
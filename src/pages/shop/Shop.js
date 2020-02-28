import React from 'react'
import CollectionsOverview from '../../components/collections-overview/CollectionsOverview'
import { Route } from 'react-router-dom'
import Collection from '../collection/Collection'
import { firestore, converCollectionsSnapShotToMap } from '../../firebase/firebase.utils'
import { connect } from 'react-redux'
import { updateCollections } from '../../redux/shop/shopAction'
import WithSpinner from '../../components/with-spinner/WithSpinner'

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview)
const CollectionWithSpinner = WithSpinner(Collection)

class Shop extends React.Component {
    state = {
        loading: true
    }

    unsubscribeFromSnapsho = null

    componentDidMount() {
        const { updateCollections } = this.props
        const collectionRef = firestore.collection('collections')
        collectionRef.onSnapshot(async snapshot => {
            const collectionMap = converCollectionsSnapShotToMap(snapshot)
            updateCollections(collectionMap)
            this.setState({ loading: false })
        })
    }

    render() {
        const { match } = this.props
        const { loading } = this.state
        return (
            <div className='shop-page' >
                <Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading={loading} {...props} />} />
                <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionWithSpinner isLoading={loading} {...props} />} />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionMap => dispatch(updateCollections(collectionMap))
})

export default connect(null, mapDispatchToProps)(Shop) 
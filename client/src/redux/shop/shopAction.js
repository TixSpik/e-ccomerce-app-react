import ShopActionsTypes from "./shopTypes";
import { converCollectionsSnapShotToMap, firestore } from "../../firebase/firebase.utils";

export const fetchCollectionsStart = () => ({
    type: ShopActionsTypes.FETCH_COLLECTIONS_START
})

export const fetchCollectionsSuccess = collectionMap => ({
    type: ShopActionsTypes.FETCH_COLLECTIONS_SUCESS,
    payload: collectionMap
})

export const fetchCollectionsFailure = (errorMessage) => ({
    type: ShopActionsTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
})

export const fetchCollectionsStartAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection('collections')
        dispatch(fetchCollectionsStart())
        collectionRef.get().then(snapshot => {
            const collectionMap = converCollectionsSnapShotToMap(snapshot)
            dispatch(fetchCollectionsSuccess(collectionMap))
        }).catch(error => dispatch(fetchCollectionsFailure(error.message)))
    }
}
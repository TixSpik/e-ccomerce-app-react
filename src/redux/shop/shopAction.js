import ShopActionsTypes from "./shopTypes";

export const updateCollections = (collectionMap) => ({
    type: ShopActionsTypes.UPDATE_COLLECTIONS,
    payload: collectionMap
})
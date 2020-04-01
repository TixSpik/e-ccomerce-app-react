import cartActionType from "./cartTypes";

export const toogleCartHidden = () => ({
    type: cartActionType.TOGGLE_CART_HIDDEN
})

export const addItem = item => ({
    type: cartActionType.ADD_ITEM,
    payload: item
})

export const removeItemFromCart = item => ({
    type: cartActionType.REMOVE_ITEM,
    payload: item
})

export const decreaseItemFromCart = item => ({
    type: cartActionType.DECREASE,
    payload: item
})

export const claerCart = () => ({
    type: cartActionType.CLEAR_CART
})
import cartActionType from "./cartTypes";

export const toogleCartHidden = () => ({
    type: cartActionType.TOGGLE_CART_HIDDEN
})

export const addItem = item => ({
    type: cartActionType.ADD_ITEM,
    payload: item
})
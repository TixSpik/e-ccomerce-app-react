import cartActionType from "./cartTypes";
import { addItemToCart, decreaseItemFromCartUtil } from "./cartUtils";

const INITIAL_STATE = {
    hidden: true,
    cartItems: []
}
const cartReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case cartActionType.TOGGLE_CART_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden
            }
        case cartActionType.ADD_ITEM:
            return {
                ...state,
                cartItems: addItemToCart(state.cartItems, action.payload)
            }
        case cartActionType.REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.id !== action.payload.id)
            }
        case cartActionType.DECREASE:
            return {
                ...state,
                cartItems: decreaseItemFromCartUtil(state.cartItems, action.payload)
            }
        case cartActionType.CLEAR_CART:
            return {
                ...state,
                cartItems: []
            }
        default: return state
    }
}

export default cartReducer
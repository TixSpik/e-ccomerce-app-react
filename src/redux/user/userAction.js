import { UserActionTypes } from "./userTypes";

export const setCurrenrUser = user => ({
    type: UserActionTypes.SET_CURRENT_USER,
    payload: user
})
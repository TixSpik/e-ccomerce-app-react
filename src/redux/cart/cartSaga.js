import { all, put, takeLatest, call } from "redux-saga/effects";
import UserActionTypes from "../user/userTypes";
import { claerCart } from "./cartAction";

export function* clearCartOnSingOut() {
    yield put(claerCart())
}

export function* onSignOutSuccess() {
    yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSingOut)
}

export function* cartSagas() {
    yield (all([
        call(onSignOutSuccess)
    ]))
}
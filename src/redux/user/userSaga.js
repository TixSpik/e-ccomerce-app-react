import { takeLatest, put, all, call } from 'redux-saga/effects'
import UserActionTypes from './userTypes'
import { auth, googleProvider, createUserProfileDoc, getCurrentUser } from '../../firebase/firebase.utils'
import { SignSuccess, SignFailure, signOutFailure, signOutSuccess } from './userAction'

export function* getSnapshotFromUserAuth(userAuth) {
    try {
        const userRef = yield call(createUserProfileDoc, userAuth)
        const userSnapshot = yield userRef.get()
        yield put(SignSuccess({ id: userSnapshot.id, ...userSnapshot.data() }))
    } catch (error) {
        yield put(SignFailure(error))
    }
}

export function* signInWithGoogle() {
    try {
        const { user } = yield auth.signInWithPopup(googleProvider)
        yield getSnapshotFromUserAuth(user)
    } catch (error) {
        yield put(SignFailure(error))
    }
}

export function* signInWithEmail({ payload: { email, password } }) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password)
        yield getSnapshotFromUserAuth(user)
    } catch (error) {
        yield put(SignFailure(error))
    }
}

export function* isUserAuth() {
    try {
        const userOAuth = yield getCurrentUser()
        if (!userOAuth) return
        yield getSnapshotFromUserAuth(userOAuth)
    } catch (error) {
        yield put(SignFailure(error))
    }
}

export function* signInOut() {
    try {
        const userOAuth = yield getCurrentUser()
        if (!userOAuth) return
        yield auth.signOut
        yield put(signOutSuccess())
    } catch (error) {
        yield put(signOutFailure(error))
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuth)
}

export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signInOut)
}

export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(isUserAuth),
        call(onSignOutStart)
    ])
}
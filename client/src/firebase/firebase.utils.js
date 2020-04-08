import * as firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCiSYuf9CwHzDbxS6k-pT-s0Wn6ExkESD8",
    authDomain: "reactshop-db-73937.firebaseapp.com",
    databaseURL: "https://reactshop-db-73937.firebaseio.com",
    projectId: "reactshop-db-73937",
    storageBucket: "reactshop-db-73937.appspot.com",
    messagingSenderId: "845727013376",
    appId: "1:845727013376:web:82d475379924fca89216e5",
    measurementId: "G-QQ4H002M81"
};

firebase.initializeApp(firebaseConfig)

export const createUserProfileDoc = async (userAuth, additionalData) => {
    if (!userAuth) return

    const userRef = firestore.doc(`/users/${userAuth.uid}`)
    const snapShot = await userRef.get()

    if (!snapShot.exists) {
        const { displayName, email } = userAuth
        const createAt = new Date()

        try {
            await userRef.set({
                displayName,
                email,
                createAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message)
        }
    }

    return userRef
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey)

    const batch = firestore.batch()
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc()
        batch.set(newDocRef, obj)
    })

    return await batch.commit()
}

export const converCollectionsSnapShotToMap = (collections) => {
    const tranformedCollection = collections.docs.map(doc => {
        const { title, items } = doc.data()

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    })

    return tranformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection
        return accumulator
    }, {})
}

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe()
            resolve(userAuth)
        }, reject)
    })

}

export const auth = firebase.auth()
export const firestore = firebase.firestore()
export const googleProvider = new firebase.auth.GoogleAuthProvider()
googleProvider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider)

export default firebase
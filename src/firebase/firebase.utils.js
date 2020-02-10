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
export const auth = firebase.auth()
export const firestore = firebase.firestore()
const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
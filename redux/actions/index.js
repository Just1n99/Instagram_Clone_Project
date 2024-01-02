import { USER_STATE_CHANGE } from "../constants/index";
import { getDoc, getFirestore, collection, doc } from "firebase/firestore"
import { getAuth } from "firebase/auth"

export function fetchUser() {
    return((dispatch) => {
        const auth = getAuth();
        const firestore = getFirestore();
        const user = auth.currentUser;
        
        const usersCollection = collection(firestore, "users");
        const userDoc = doc(usersCollection, user.uid);
        getDoc(userDoc)
        .then((snapshot) => {
            if(snapshot.exists) {
                dispatch({type: USER_STATE_CHANGE, user: snapshot.data()})
            }
            else {
                console.log("does not exist")
            }
        })
    })
}
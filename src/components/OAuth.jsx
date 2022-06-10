import {useNavigate, useLocation} from 'react-router-dom'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import { GoogleIcon } from '../assets'




const OAuth = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const googleLogin = async() => {
        try {
            const auth = getAuth()
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider)
            const user = result.user
            // Check For user 
            const docRef = doc(db, "users", user.uid)
            const docSnap = await getDoc(docRef)

            // If not user, create user
            if(!docSnap.exists()) {
                await setDoc(doc(db, "users", user.uid), {
                    name: user.displayName,
                    email: user.email,
                    timestamp: serverTimestamp()
                })
            }
            navigate("/")
            toast.success(`${user.displayName} you are LogedIn`, {autoClose:1000})

        } catch (error) {
           toast.error("Could not Authorize with Google!", {autoClose:2000}) 
        }
    }

  return (
    <div className="socialLogin">
        <p>Sign {location.pathname === "/login" ? "In" : "Up"} </p>
        <button 
            className="socialIconDiv"
            onClick={googleLogin}
        >
            <img className="socialIconImg" src={GoogleIcon} alt="Google Login"/>
        </button>
    </div>
  )
}

export default OAuth
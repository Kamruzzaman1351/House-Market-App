import { createContext, useState } from "react";
import { toast } from "react-toastify";
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config"
import { useNavigate } from "react-router-dom";


const SingInSignUpContext = createContext()



export const SingInSignUpProvider = ({ children }) => {
    const navigate = useNavigate()
    const [signInFormData, setSignInFromData] = useState({
        email: "",
        password: "",
    })
    const [signUnFormData, setSignUnFromData] = useState({
        name:"",
        email: "",
        password: "",
    })

    const onChange = (e, type) => {
        if(type === "signIn") {
            setSignInFromData({
                ...signInFormData,
                [e.target.id]: e.target.value,
            })            
        } else if(type === "signUp") {
            setSignUnFromData({
                ...signUnFormData,
                [e.target.id]: e.target.value,
            })
        }
    }

    const handleSignInFormSubmit = async(e, signInFormData) => {
        e.preventDefault()
        const {email, password} = signInFormData
        try {
            const auth = getAuth()
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            const user = userCredential.user
            toast.success(`${user.displayName} are LogedIn`, {autoClose:1000})
            navigate("/")
            setSignInFromData({
                email: "",
                password: ""
            })
        } catch (error) {
            toast.error("User Credential does not match", {autoClose:3000})
        }
    }

    const handleSignUpFormSubmit = async(e, formData) => {
        e.preventDefault()
        const {name, email, password} = formData
        try {
            const auth = getAuth()
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user
            updateProfile(auth.currentUser, {
                displayName: name,
            })

            const copyFormData = {...formData}
            delete copyFormData.password
            copyFormData.timestamp = serverTimestamp()
            // Store Data Into Database
            await setDoc(doc(db, "users", user.uid), copyFormData)
            toast.success(`You are logedIn ${user.displayName}`, {autoClose:1000})
            navigate("/");
            setSignUnFromData({
                name:"",
                email: "",
                password: "",
            })
        } catch (error) {
            toast.error("Something Went wrong!", {autoClose: 3000})
        }
    }

    return <SingInSignUpContext.Provider 
        value={{
            signInFormData,
            signUnFormData,
            onChange,
            handleSignInFormSubmit,
            handleSignUpFormSubmit,

        }}
    >
        { children }
    </SingInSignUpContext.Provider>
}


export default SingInSignUpContext
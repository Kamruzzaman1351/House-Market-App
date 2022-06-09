import { createContext, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
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

    const handleSignInFormSubmit = (e) => {
        e.preventDefault()
        console.log("working")
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
            console.log(copyFormData)
            // Store Data Into Database
            await setDoc(doc(db, "users", user.uid), copyFormData)
            
            navigate("/");
            setSignUnFromData({
                name:"",
                email: "",
                password: "",
            })
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage, errorCode)
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
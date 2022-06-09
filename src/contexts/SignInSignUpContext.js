import { createContext, useState } from "react";


const SingInSignUpContext = createContext()



export const SingInSignUpProvider = ({ children }) => {
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

    const handleSignUpFormSubmit = (e) => {
        e.preventDefault()
        console.log("working")
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
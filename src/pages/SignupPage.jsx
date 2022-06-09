import {useState, useContext} from 'react'
import { Link } from 'react-router-dom'
import { ArrowRightIcon, VisibilityIcon } from '../assets'
import SingInSignUpContext from '../contexts/SignInSignUpContext'

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { signUnFormData, onChange, handleSignUpFormSubmit } = useContext(SingInSignUpContext)
  const {name, email, password} = signUnFormData
  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Sign Up Now</p>
        </header>
        <main>
          <form onSubmit={(e) => handleSignUpFormSubmit(e, signUnFormData)}>
            <input 
              type="text"
              id="name"
              className="nameInput"
              placeholder="Name"
              value={name}
              onChange={(e)=>onChange(e, "signUp")}
            />
            <input 
              type="email"
              id="email"
              className="emailInput"
              placeholder="Email"
              value={email}
              onChange={(e)=>onChange(e, "signUp")}
            />
            <div className='passwordInputDiv'>
              <input 
                type={showPassword? "text" : "password"}
                id="password"
                className="passwordInput"
                placeholder="Password"
                value={password}
                onChange={(e)=>onChange(e, "signUp")}
              />
              <img src={VisibilityIcon} alt="Show Password"
                className="showPassword" 
                onClick={() => {setShowPassword(prevState => !prevState)}}
              />
            </div>
            <div className="signInBar">
              <p className="signInText">
                Sign Up
              </p>
              <button className="signUpButton">
                <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
              </button>
            </div>
          </form>

          {/* Googel SignIn */}
          <div>
            <p style={{textAlign:"center",marginTop:"50px"}}>Already have an account ?</p>
            <Link to="/login" className='registerLink' style={{textAlign:"center",marginTop:"10px"}}>
              Sign In Instead
            </Link>
          </div>

        </main>
      </div>
    </>
  )
}

export default SignupPage
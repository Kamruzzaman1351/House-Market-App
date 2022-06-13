import {useState, useContext} from 'react'
import { Link } from 'react-router-dom'
import { ArrowRightIcon, VisibilityIcon } from '../assets'
import SingInSignUpContext from '../contexts/SignInSignUpContext'
import { OAuth, PageHeader } from '../components'


const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const {signInFormData, onChange, handleSignInFormSubmit} = useContext(SingInSignUpContext)
  const {email, password} = signInFormData
  return (
    <>
      <div className="pageContainer">
        <PageHeader pageTitle='WellCome' />
        <main>
          <form onSubmit={(e)=> handleSignInFormSubmit(e, signInFormData)}>
            <input 
              type="email"
              id="email"
              className="emailInput"
              placeholder="Email"
              value={email}
              onChange={(e)=>onChange(e, "signIn")}
            />
            <div className='passwordInputDiv'>
              <input 
                type={showPassword? "text" : "password"}
                id="password"
                className="passwordInput"
                placeholder="Password"
                value={password}
                onChange={(e)=>onChange(e, "signIn")}
              />
              <img src={VisibilityIcon} alt="Show Password"
                className="showPassword" 
                onClick={() => {setShowPassword(prevState => !prevState)}}
              />
            </div>
            <Link to="/forgot-password"
              className="forgotPasswordLink" 
            >
              Forgot Password
            </Link> 
            <div className="signInBar">
              <p className="signInText">
                Sign In
              </p>
              <button className="signInButton">
                <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
              </button>
            </div>
          </form>

          <OAuth />
          <div style={{marginBottom:"100px"}}>
            <p style={{textAlign:"center",marginTop:"50px"}}>Do not have an account ?</p>
            <Link to="/signup" className='registerLink' style={{textAlign:"center",marginTop:"10px"}}>
              Sign Up Instead
            </Link>
          </div>

        </main>
      </div>
    </>
  )
}

export default LoginPage
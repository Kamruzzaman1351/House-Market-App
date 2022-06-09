import {useState} from 'react'
import { Link } from 'react-router-dom'
import { ArrowRightIcon, VisibilityIcon } from '../assets'




const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">WellCome</p>
        </header>
        <main>
          <form>
            <input 
              type="email"
              id="email"
              className="emailInput"
              placeholder="Email"
              onChange={()=>{}}
            />
            <div className='passwordInputDiv'>
              <input 
                type={showPassword? "text" : "password"}
                id="password"
                className="passwordInput"
                placeholder="Password"
                onChange={()=>{}}
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

          {/* Googel SignIn */}
          <div>
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
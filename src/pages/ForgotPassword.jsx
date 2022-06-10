import {useState} from 'react'
import { ArrowRightIcon } from '../assets'
import { Link, useNavigate  } from 'react-router-dom'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { toast } from 'react-toastify'
const ForgotPassword = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')

  const onChange = e => {
      setEmail(e.target.value)
  }
  const onSubmit = async(e) => {
    e.preventDefault()
    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      toast.success("Email Send", {autoClose:1000})
      navigate("/login")
    } catch (error) {
      toast.error("Something went wrong!", {autoClose:2000})
    }
  }

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Forgot Password</p>
        </header>
        <main>
          <form onSubmit={onSubmit}>
            <input 
              type="email"
              id="email"
              className="emailInput"
              placeholder="Email"
              value={email}
              onChange={onChange}
            />
            <Link 
              to="/login"
              className="forgotPasswordLink" 
            >
              Sign In
            </Link> 
            <div className="signInBar">
              <p className="signInText">
                Send Email
              </p>
              <button className="signInButton">
                <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
              </button>
            </div>
          </form>
        </main>
      </div>
    </>
  )
}

export default ForgotPassword
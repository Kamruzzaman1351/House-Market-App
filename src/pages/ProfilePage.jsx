import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getAuth } from 'firebase/auth'
const ProfilePage = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const auth = getAuth()
  
  useEffect(() => {
    if(auth.currentUser) {
      setUser(auth.currentUser)
    } else{
      toast.error("Please Sign In !", {autoClose:1500})
      navigate("/login")
    }
  }, [])
  
  return user 
    ? <h1>{user.displayName}</h1> 
    :<p>Please Sign Up </p> 
  
}

export default ProfilePage
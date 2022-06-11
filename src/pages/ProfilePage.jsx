import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getAuth, updateProfile } from 'firebase/auth'
import { db } from '../firebase.config'
import {updateDoc, doc } from "firebase/firestore"
import { PageHeader } from '../components'
const ProfilePage = () => {
  const navigate = useNavigate()
  const auth = getAuth()
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })
  const {name, email} = formData
  const [changeDetails, setChangeDetails] = useState(false)

  const handleLogout = () => {
      auth.signOut()
      navigate("/")
  }
  const onSubmit = async() => {
   try {
    if(auth.currentUser.displayName !== name) {
      await updateProfile(auth.currentUser, {
        displayName: name
      })
      const userRef = doc(db, "users", auth.currentUser.uid)
      await updateDoc(userRef, {
        name
      })
      toast.success("Profile Updated", {autoClose:1000})
    }
    
   } catch (error) {
    toast.error("Can't Update Profile", {autoClose:2000})
   }
  }
  const onChange = (e) => {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
      }))
  }




  return (
    <>
      <div className="profile">
        <header className="profileHeader">
          <PageHeader pageTitle='My Profile' />
          <button className="logOut" type="button" onClick={handleLogout}>
            Logout
          </button>
        </header>
        <main>
          <div className="profileDetailsHeader">
            <p className="profileDetailsText">Personal Detailes</p>
            <p className="changePersonalDetails"
              onClick={() => {
                changeDetails && onSubmit()
                setChangeDetails((prevState) => !prevState)
              }}
            >
                { changeDetails ? "Done" : "Change" }
            </p>
          </div>
          <div className="profileCard">
              <form>
                <input type="text" id="name" 
                  className={!changeDetails ? "profileName" : "profileNameActive"}
                  value={name}
                  disabled={!changeDetails}
                  onChange={onChange}
                />
                <input type="text" id="email" 
                  className="profileEmail"
                  value={email}
                  disabled
                />
              </form>
          </div>
        </main>
      </div>
    </>

  )
   
  
}

export default ProfilePage
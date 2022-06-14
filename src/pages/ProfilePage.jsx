import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getAuth, updateProfile } from 'firebase/auth'
import { db } from '../firebase.config'
import {updateDoc, doc, getDocs, collection, query, where, orderBy } from "firebase/firestore"
import { PageHeader, ListingItem } from '../components'
import { Link } from 'react-router-dom'
import { homeIcon, arrowRightIcon } from '../assets'
const ProfilePage = () => {
  const navigate = useNavigate()
  const auth = getAuth()
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })
  const [listings, setListings] = useState(null)
  const[loading, setLoading] = useState(true)
  useEffect(() => {
    const getListings = async() => {
      try {
        setLoading(true)
        const listingRef = collection(db, "listings")
        const q = query(listingRef, where("userRef", "==", auth.currentUser.uid), orderBy("timestamp", "desc"))
        const querySnap = await getDocs(q)
        const listings = []
        querySnap.forEach((doc)=>{
          return listings.push({
            id: doc.id,
            data: doc.data()
          })
        })
        setListings(listings)
        setLoading(false)
      } catch (error) {
        console.log("No listing")
      }
    }
    getListings()
  }, [])
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

  const onDelete = () => {

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
          <Link to='/create-listing' className='createListing'>
            <img src={homeIcon} alt='home' />
            <p>Sell or rent your home</p>
            <img src={arrowRightIcon} alt='arrow right' />
          </Link>
          <div>
            {/* <p className='listingText'>Your Listings</p>
            <ul className='listingsList'>
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                  onDelete={() => onDelete(listing.id)}
                  onEdit={() => onEdit(listing.id)}
                />
              ))}
            </ul> */}
          </div>
          {!loading && listings && (
            <>
              <p className='listingText'>Your Listings</p>
              <ul className='listingsList'>
                {listings.map((listing) => (
                  <ListingItem
                    key={listing.id}
                    listing={listing.data}
                    id={listing.id}
                    onDelete={onDelete}
                  />
                ))}
              </ul>
            </>
          )}
        </main>
      </div>
    </>

  )
   
  
}

export default ProfilePage
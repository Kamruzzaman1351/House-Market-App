import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getAuth, updateProfile } from 'firebase/auth'
import { db } from '../firebase.config'
import {updateDoc, doc, getDocs, collection, query, where, orderBy, deleteDoc } from "firebase/firestore"
import { PageHeader, ListingItem, Message } from '../components'
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
  const [messages, setMessages] = useState(null)
  const [sender, setSender] = useState(null)
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
  }, [auth.currentUser.uid])
  const {name, email} = formData
  const [changeDetails, setChangeDetails] = useState(false)
  useEffect( ()=> {
    const getMessages = async() => {
      setLoading(true)
      const messagesRef = collection(db, "messages")
      const q = query(messagesRef, where("to", "==", auth.currentUser.uid), orderBy("timestamp", "desc"))
      const querySnap = await getDocs(q)
      const messages = []
      querySnap.forEach((doc) => {
        return messages.push({
          id: doc.id,
          data: doc.data()
        })
      })
      setMessages(messages)
      setLoading(false)
    }
    getMessages()
  }, [auth.currentUser.uid])

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

  const onDelete = async(listingId) => {
    if(window.confirm("Are You Sure!")) {
      await deleteDoc(doc(db, "listings", listingId))
      const updaterdListings = listings.filter((listing) => listing.id !== listingId)
      setListings(updaterdListings)
      toast.success("Listing Deleted Succesfully", {autoClose: 1500})
    }
  }
  const onEdit = (listingId)=> {
    navigate(`/edit-listing/${listingId}`)
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
            {!loading && listings && (
              <>
                <p className='listingText'>Your Listings</p>
                <ul className='listingsList'>
                  {listings.map((listing) => (
                    <ListingItem
                      key={listing.id}
                      listing={listing.data}
                      id={listing.id}
                      onDelete={()=> onDelete(listing.id)}
                      onEdit={()=> onEdit(listing.id)}
                    />
                  ))}
                </ul>
              </>
            )}            
          </div>
          {!loading && messages.length !== null && (
          <>
            <div>
              <p className='listingText'>Your Messages</p>
              <ul className='listingList'>
                {messages.map((message)=> (
                  <Message 
                    key={message.id} 
                    message={message.data} 
                    id={message.id}
                  />
                ))}
              </ul>
            </div>
          </>)}
                    
        </main>
      </div>
    </>

  )
   
  
}

export default ProfilePage
import {useState, useEffect} from 'react'
import { Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { PageHeader } from '../components'
import { db } from '../firebase.config'
import { getDoc, doc, addDoc, serverTimestamp, collection } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const Contact = () => {
    const auth = getAuth()
    const navigate = useNavigate()
    const params = useParams()
    const [landlord, setLandload] = useState(null)
    const [message, setMessage] = useState('')
    // eslint-disable-next-line
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        const getLandload = async () => {
            try {
                const docRef = doc(db, "users", params.landloadId)
                const docSnap = await getDoc(docRef)
                if(docSnap.exists()) {
                    setLandload(docSnap.data())
                }
            } catch (error) {
                toast.error("Could not fiend Landload", {autoClose:1200})
            }
        }

        getLandload()
    }, [params.userId])

    const onChange = (e) => {
        setMessage(e.target.value)
    }
    const onSubmit = (e) => {
      e.preventDefault()
      onAuthStateChanged(auth, async (user)=>{
        if(user) {
          const copyMessage = {
            message,
            from: {
              email: user.email,
              name: user.displayName,
              id: user.uid
            },
            listing_name: searchParams.get("listingName"),
            status: false,
            to: params.landloadId,
            timestamp: serverTimestamp(),
          }
          await addDoc(collection(db, "messages"), copyMessage)
          toast.success("Message Send", {autoClose:1500})
          navigate("/offers")
        } else {
          navigate("/login")
          toast.error("You need to sign in to send a message", {autoClose:1000})
        }
      })
    }
  return (
    <div className='pageContainer profile'>
      <PageHeader pageTitle="Contact Landlord" />

      {landlord !== null && (
        <main>
          <div className='contactLandlord'>
            <p className='landlordName'>Contact {landlord?.name}</p>
          </div>

          <form className='messageForm' onSubmit={onSubmit}>
            <div className='messageDiv'>
              <label htmlFor='message' className='messageLabel'>
                Message
              </label>
              <textarea
                name='message'
                id='message'
                className='textarea'
                value={message}
                onChange={onChange}
              ></textarea>
            </div>
              <button type='submit' className='primaryButton'>
                Send Message
              </button>
            
          </form>
        </main>
      )}
    </div>
  )
}

export default Contact
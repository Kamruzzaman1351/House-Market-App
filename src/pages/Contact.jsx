import {useState, useEffect} from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { PageHeader } from '../components'
import { db } from '../firebase.config'
import { getDoc, doc } from 'firebase/firestore'
import { toast } from 'react-toastify'


const Contact = () => {
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
  return (
    <div className='pageContainer profile'>
      <PageHeader pageTitle="Contact Landlord" />

      {landlord !== null && (
        <main>
          <div className='contactLandlord'>
            <p className='landlordName'>Contact {landlord?.name}</p>
          </div>

          <form className='messageForm'>
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

            <a
              href={`mailto:${landlord.email}?Subject=${searchParams.get('listingName')}&body=${message}`}
            >
              <button type='button' className='primaryButton'>
                Send Message
              </button>
            </a>
          </form>
        </main>
      )}
    </div>
  )
}

export default Contact
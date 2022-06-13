import { useContext, useEffect, useRef } from 'react'
import { ListingForm, PageHeader, Spinner } from '../components'
import ListingContext from '../contexts/ListingContext'
import { getAuth, onAuthStateChanged} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
const CreateListing = () => {  
    const navigate = useNavigate()  
    const auth = getAuth()
    const isMounted = useRef(true)
    useEffect(() => {
        if(isMounted) {
            onAuthStateChanged(auth, (user) => {
                if(!user) {
                    navigate("/login")
                } 
            })
        }
        return () => isMounted.current = false
    }, [isMounted])
    const {formData, onMutate, onFormSubmit, loading} = useContext(ListingContext)
    if(loading){
        return <Spinner />
    }
    return (
        <div className="profile">
            <PageHeader pageTitle="Create Listing" />
            <div>
                <ListingForm 
                    formData={formData} 
                    onSubmit={(e)=>onFormSubmit(e,formData)} 
                    onMutate={onMutate}
                />
            </div>
        </div>
  )
}

export default CreateListing
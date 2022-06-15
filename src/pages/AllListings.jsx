import {useState, useEffect, useRef} from 'react'
import { PageHeader, Spinner, ListingItem} from '../components'
import { collection, getDocs, orderBy, query, limit } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'



const AllListings = () => {
    const [loading, setLoading] = useState(true)
    const [rentlistings, setRentListings] = useState(null)
    const [salelistings, setSaleListings] = useState(null)
    const isMounted = useRef(true)
    useEffect(() => {
        if(isMounted) {
            const getAllListings = async() => {
                try {
                    setLoading(true)
                    const listingsRef = collection(db, "listings")
                    const q = query(listingsRef, orderBy("timestamp", "desc"), limit(20))
                    const querySnap = await getDocs(q)
                    const listings = []
                    querySnap.forEach((doc)=> {
                        return listings.push({
                            id: doc.id,
                            data: doc.data()
                        })
                    })
                    
                    setRentListings(listings.filter((listing) => listing.data.type === "rent"))
                    setSaleListings(listings.filter((listing) => listing.data.type === "sale"))
                    setLoading(false)
                    
                } catch (error) {
                    setLoading(false)
                    toast.error("Could not fetch Listings", {autoClose:1200})
                }
            }
            
            getAllListings()
            
        }
        
        return () => { 
            isMounted.current = false
        }
    }, [isMounted])
    if(loading) {
        return <Spinner />
    }

  return (
    <div className='pageContainer profile'>
        <PageHeader pageTitle='All Listings' />
        <main>
            {rentlistings && (
                <>
                    <h3>Rent Listings</h3>
                    <main>
                        <ul className="categoryListings">
                            {rentlistings.map((listing) => (
                                <ListingItem 
                                    key={listing.id}
                                    listing={listing.data}
                                    id={listing.id}
                                />
                            ))}
                        </ul>
                    </main>
                </>
            )}
            <br/>
            <br/>
            <br/>
            {salelistings && (
                <>
                    <h3>Sale Listings</h3>
                    <main>
                        <ul className="categoryListings">
                            {salelistings.map((listing) => (
                                <ListingItem 
                                    key={listing.id}
                                    listing={listing.data}
                                    id={listing.id}
                                />
                            ))}
                        </ul>
                    </main>
                </>
            )}
        </main>
    </div>
  )
}

export default AllListings
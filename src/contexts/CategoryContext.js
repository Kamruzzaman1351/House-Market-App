import { createContext, useState } from "react"; 
import { collection, getDocs, query, where, orderBy, limit, startAfter } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";


const CategoryContext = createContext()


export const CategoryProvider = ({ children }) => {
    const [listings, setListings] = useState(null)
    const [loading, setLoading] = useState(true)
    const [fetchLastListing, setFetchLastListing] = useState(null)
    const [fetchLastOfferListing, setFetchLastOfferListing] = useState(null)

    const fetchListings = async (prams) => {
        try {
            setLoading(true)
            // Get referance
            const listingsRef = collection(db, "listings")

            // Create query
            const q = query( 
                        listingsRef,
                        where("type", "==", prams),
                        orderBy("timestamp", "desc"),
                        limit(1)
                    )
            // Execute query
            const querySnap = await getDocs(q)
            const lastVisible = querySnap.docs[querySnap.docs.length - 1]
            setFetchLastListing(lastVisible)
            const listings = []
            querySnap.forEach((doc) => {
                return listings.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            
            setListings(listings)
            setLoading(false)
        } catch (error) {
            toast.error("Could not get the listings", {autoClose:2000})
        }
    }

    // Fetching Offers
    const fetchOfferListings = async () => {
        try {
            setLoading(true)
            // Get referance
            const listingsRef = collection(db, "listings")

            // Create query
            const q = query( 
                        listingsRef,
                        where("offer", "==", true),
                        orderBy("timestamp", "desc"),
                        limit(2)
                    )
            // Execute query
            const querySnap = await getDocs(q)
            const lastVisible = querySnap.docs[querySnap.docs.length - 1]
            setFetchLastOfferListing(lastVisible)
            const listings = []
            querySnap.forEach((doc) => {
                return listings.push({
                    id: doc.id,
                    data: doc.data()
                })
            })            
            setListings(listings)
            setLoading(false)
        } catch (error) {
            toast.error("Could not get the offers listings", {autoClose:2000})
        }
    }
    // Fetching More Offers
    const fetchMoreOfferListings = async () => {
        try {
            setLoading(true)
            // Get referance
            const listingsRef = collection(db, "listings")

            // Create query
            const q = query( 
                        listingsRef,
                        where("offer", "==", true),
                        orderBy("timestamp", "desc"),
                        limit(2)
                    )
            // Execute query
            const querySnap = await getDocs(q)
            const lastVisible = querySnap.docs[querySnap.docs.length - 1]
            setFetchLastOfferListing(lastVisible)
            const listings = []
            querySnap.forEach((doc) => {
                return listings.push({
                    id: doc.id,
                    data: doc.data()
                })
            })            
            setListings((prevState) => [...prevState, ...listings])
            setLoading(false)
        } catch (error) {
            toast.error("Could not get the offers listings", {autoClose:2000})
        }
    }
    // Load more Listing
    const fetchMoreListing = async(prams) => {
        try {
            setLoading(true)
            // Get referance
            const listingsRef = collection(db, "listings")

            // Create query
            const q = query( 
                        listingsRef,
                        where("type", "==", prams),
                        orderBy("timestamp", "desc"),
                        startAfter(fetchLastListing),
                        limit(1)
                    )
            // Execute query
            const querySnap = await getDocs(q)
            const lastVisible = querySnap.docs[querySnap.docs.length - 1]
            setFetchLastListing(lastVisible)
            const listings = []
            querySnap.forEach((doc) => {
                return listings.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            
            setListings((prevState)=> [...prevState, ...listings])
            setLoading(false)
        } catch (error) {
            toast.error("Could not get the listings", {autoClose:2000})
        }
    }


    return <CategoryContext.Provider 
        value={{
            listings,
            loading,
            fetchLastListing,
            fetchLastOfferListing,
            fetchListings,
            fetchOfferListings,
            fetchMoreListing,
            fetchMoreOfferListings,
        }}
    >
        { children }
    </CategoryContext.Provider>
}

export default CategoryContext
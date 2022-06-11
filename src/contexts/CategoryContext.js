import { createContext, useState } from "react"; 
import { collection, getDocs, query, where, orderBy, limit, startAfter } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";


const CategoryContext = createContext()


export const CategoryProvider = ({ children }) => {
    const [listings, setListings] = useState(null)
    const [loading, setLoading] = useState(true)

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
                        limit(10)
                    )
            // Execute query
            const querySnap = await getDocs(q)
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
                        limit(10)
                    )
            // Execute query
            const querySnap = await getDocs(q)
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


    return <CategoryContext.Provider 
        value={{
            listings,
            loading,
            fetchListings,
            fetchOfferListings
        }}
    >
        { children }
    </CategoryContext.Provider>
}

export default CategoryContext
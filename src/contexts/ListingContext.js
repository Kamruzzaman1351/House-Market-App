import { createContext, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase.config";
import {getDoc, doc, collection, serverTimestamp, addDoc, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";



const ListingContext = createContext()


export const ListingProvider = ({ children }) => {
    const auth = getAuth()
    const navigate = useNavigate()
    const[listing, setListing] = useState(null)
    const [formData, setFormData] = useState({
        type: "rent",
        name: "", 
        bathrooms: 1, 
        bedrooms: 1, 
        parking: true, 
        furnished: false, 
        address: "", 
        offer: false, 
        regularPrice: "", 
        discountedPrice: "",
        longitude: "", 
        latitude:"",
        images:{}
    })
    const [loading, setLoading] = useState(false)
    const onMutate = (e) => {
        let boolean = null
        if(e.target.value === "true") {
            boolean = true
        }
        if(e.target.value === "false") {
            boolean = false
        }
        // Text / Boolean / Number
        if(!e.target.files) {
            setFormData((prevState) => ({
                ...prevState,
                [e.target.id]: boolean ?? e.target.value
            }))
        }

        // Files
        if(e.target.files) {
            setFormData((prevState)=>({
                ...prevState,
                images: e.target.files
            }))
        }
    }
    // Store Image in FireBase Storage
    const storeImage = async( image) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage()
            const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`
            const storageRef = ref(storage, `images/${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef, image);
            uploadTask.on('state_changed', 
                (snapshot) => {                    
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    toast.info('Upload is ' + progress + '% done', {autoClose: 500})
                    switch (snapshot.state) {
                    case 'paused':
                       
                        break;
                    case 'running':
                        
                        break;
                    }
                }, 
                (error) => {
                    reject(error)
                }, 
                () => {                    
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    });
                }
            );
        })
    }
    const onFormSubmit = async (e, formData) => {
        e.preventDefault();
        setLoading(true)
        const {address, offer, regularPrice, longitude, latitude, discountedPrice, images} = formData
        const geolocation = {
            lat: latitude,
            lng: longitude
        }
        if(discountedPrice >= regularPrice) {
            setLoading(false)
            toast.error("Discount Price must be less then regular price", {autoClose:1000})
            return
        }
        if(images.length > 6) {
            setLoading(false)
            toast.error("Max six images upload", {autoClose:1000})
            return
        }

        // Get Images Urls
        const imageUrls = await Promise.all(
            [...images].map((image)=> storeImage(image))
        ).catch(() => {
            setLoading(false)
            toast.error("Images not uploaded", {autoClose:1000})
        })

        // Save FormData to FireStore
        const formDataCopy = {
            ...formData,
            imageUrls,
            geolocation,
            location: address,
            timestamp: serverTimestamp(),
            userRef: auth.currentUser.uid
        }

        delete formDataCopy.images
        delete formDataCopy.address
        !offer && delete formDataCopy.discountedPrice
        delete formDataCopy.latitude
        delete formDataCopy.longitude

        const docRef = await addDoc(collection(db, "listings"), formDataCopy)

        setLoading(false)
        toast.success("Listing Saved", {autoClose:1500})
        navigate(`/category/${formDataCopy.type}/${docRef.id}`)
    }

    // Get Listing From FireStore
    const getListing = async (prams) => {
        try {
            setLoading(true)
            const docRef = doc(db, "listings", prams.listingId)
            
            const docSnap = await getDoc(docRef)
           
            if(docSnap.exists()) {
               setListing(docSnap.data())
            }

            setLoading(false)
        } catch (error) {
            setLoading(false)
            toast.error("Could not fetch Listing", {autoClose:1500})
        }
    }

   return <ListingContext.Provider 
        value={{
            formData,
            loading,
            listing,
            auth,
            setFormData,
            onMutate,
            onFormSubmit,
            getListing
        }}
    >
        { children }
    </ListingContext.Provider>
}

export default ListingContext
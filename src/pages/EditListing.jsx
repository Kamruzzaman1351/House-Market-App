import {useState, useEffect, useRef,} from 'react'
import { PageHeader, Spinner, ListingForm} from '../components'
import { useParams, useNavigate } from 'react-router-dom'
import { getDoc, doc, updateDoc, serverTimestamp} from 'firebase/firestore'
import { db } from '../firebase.config'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { toast } from 'react-toastify'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { v4 as uuidv4 } from "uuid";
const EditListing = () => {
    const navigate = useNavigate()
    const auth = getAuth()
    const params = useParams()
    const [formData, setFormData] = useState({
        type: 'rent',
        name: '',
        bedrooms: 1,
        bathrooms: 1,
        parking: false,
        furnished: false,
        address: '',
        offer: false,
        regularPrice: 0,
        discountedPrice: 0,
        images: {},
        latitude: 0,
        longitude: 0,
    })
    const [loading, setLoading] = useState(true)
    const isMounted = useRef(true)
    useEffect(()=> {
        if(isMounted) {
            onAuthStateChanged(auth, (user) => {
                if(!user) {
                    navigate("/login")                    
                } 
            })
        }
        return () => {
            isMounted.current = false
        }
    }, [isMounted])
    useEffect(()=> {
        if(isMounted) {
            const getListing = async () => {
                setLoading(true)
                const docRef = doc(db, "listings", params.listingId)
                const docSnap = await getDoc(docRef)
                if(docSnap.exists()) {
                   setFormData({...docSnap.data(), 
                        address: docSnap.data().location,
                        latitude:docSnap.data().geolocation.lat, 
                        longitude:docSnap.data().geolocation.lng 
                    })
                   setLoading(false)
                } else {
                    navigate("/")
                    toast.error("Listing does not exist", {autoClose:1200})
                }
            }

            getListing()
        }
        return () => {
            isMounted.current = false
        }
    }, [isMounted, params.listingId, navigate])

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
    // Update Listing
    const onFormSubmit = async (e) => {
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

        const docRef = doc(db, "listings", params.listingId)
        await updateDoc(docRef, formDataCopy)

        setLoading(false)
        toast.success("Listing Updated", {autoClose:1500})
        navigate(`/category/${formDataCopy.type}/${docRef.id}`)
        console(docRef)
    }
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

    if(loading) {
        return <Spinner />
    }
  return (
    <div className="profile">
        <PageHeader pageTitle='Edit Listing' />
        <div>
            <ListingForm 
                formData={formData}
                onSubmit={onFormSubmit} 
                onMutate={onMutate}
                edit={"edit"}
            />
        </div>
    </div>
  )
}

export default EditListing
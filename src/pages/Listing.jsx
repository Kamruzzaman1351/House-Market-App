import {useState, useContext, useEffect, useRef} from 'react'
import ListingContext from '../contexts/ListingContext'
import { useParams, Link } from 'react-router-dom'
import { Spinner } from '../components'
import { toast } from 'react-toastify'
import { shareIcon } from '../assets'
const Listing = () => {
    const params = useParams()
    const isMounted = useRef(true)
    const {loading, getListing, listing, auth } = useContext(ListingContext)
    useEffect(() => { 
        if(isMounted){
            getListing(params)
        }       
        return ()=> {
            isMounted.current = false
        }
        
    }, [isMounted, params])

    const onShare = () => {
        navigator.clipboard.writeText(window.location.href)
        setTimeout(() => {
            toast.info("Link Coped", {autoClose:1000})
        }, 1000)
    }
    if(loading) {
        return <Spinner />
    }
  return (
    <main>
        {/* Slider Show  */}
        <div className="shareIconDiv" onClick={onShare}>
            <img src={shareIcon} alt="Social Share" />
        </div>
        <div className="listingDetails">
            <p className="listingName">
                {listing?.name} - $ {listing?.offer ? 
                    listing?.discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",") : 
                    listing?.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}
            </p>
            <p className="listingLocation">{listing?.location}</p>
            <p className="listingType">
               For {listing?.type==="sale" ? "Sale" : "Rent"}
            </p>
            {listing?.offer && (
                <p className="discountPrice">
                    $ {listing?.regularPrice - listing?.discountedPrice} discount
                </p>
            )}
            <ul className='listingDetailsList'>
                <li>
                    {listing?.bedrooms > 1
                    ? `${listing?.bedrooms} Bedrooms`
                    : '1 Bedroom'}
                </li>
                <li>
                    {listing?.bathrooms > 1
                    ? `${listing?.bathrooms} Bathrooms`
                    : '1 Bathroom'}
                </li>
                <li>{listing?.parking && 'Parking Spot'}</li>
                <li>{listing?.furnished && 'Furnished'}</li>
                </ul>

            <p className='listingLocationTitle'>Location</p>
            {/* Map Goes Here */}

            {auth.currentUser?.uid !== listing?.userRef && (
            <Link
                to={`/contact/${listing.userRef}?listingName=${listing.name}`}
                className='primaryButton'
            >
                Contact Landlord
            </Link>
            )}
                
        </div>
    </main>
  )
}

export default Listing
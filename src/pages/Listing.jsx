import {useContext, useEffect, useRef} from 'react'
import ListingContext from '../contexts/ListingContext'
import { useParams, Link } from 'react-router-dom'
import { Spinner } from '../components'
import { toast } from 'react-toastify'
import { shareIcon } from '../assets'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, EffectFade, Autoplay } from 'swiper';
import 'swiper/css/bundle';
import "swiper/css/autoplay"
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
        {listing && (
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, EffectFade, Autoplay]}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                effect="fade"
                autoplay={true}
            >
                {listing.imageUrls.map((url, index) => (
                    <SwiperSlide key={index} >
                        <div className='swiperSlideDiv' 
                            style={{
                                background: `url(${listing.imageUrls[index]}) center no-repeat`,
                                backgroundSize: 'cover',
                                width:"100%",
                                height:"400px",
                                position:"relative"
                            }}
                            
                        > 
                        </div> 
                    </SwiperSlide>

                ))}
                
            </Swiper>
        )}
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
            <div className='leafletContainer'>
                {/* <MapContainer
                    style={{ height: '100%', width: '100%' }}
                    center={[listing?.geolocation.lat, listing?.geolocation.lng]}
                    zoom={13}
                    scrollWheelZoom={false}
                >
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url='https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png'
                    />

                    <Marker
                        position={[listing?.geolocation.lat, listing?.geolocation.lng]}
                    >
                        <Popup>{listing?.location}</Popup>
                    </Marker>
                </MapContainer> */}
            </div>

            {auth.currentUser?.uid !== listing?.userRef && (
            <Link
                to={`/contact/${listing?.userRef}?listingName=${listing?.name}`}
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
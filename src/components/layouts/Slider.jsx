import {useEffect, useState }from 'react'
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase.config';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, EffectFade, Autoplay } from 'swiper';
import 'swiper/css/bundle';
import "swiper/css/autoplay"
import Spinner from './Spinner';

const Slider = () => {
    const [loading, setLoading] = useState(true)
    const [listings, setListings] = useState(null)
    const navigate = useNavigate()
    useEffect(() => {
        const getListings = async() => {
            try {
                setLoading(true)
                const listingsRef = collection(db, "listings")
                const q = query(listingsRef, orderBy("timestamp", "desc"), limit(5))
                const querySnap = await getDocs(q)
                let listings = []
                querySnap.forEach((doc) => {
                    return listings.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                setListings(listings)
                setLoading(false)
                // console.log(listings)
            } catch (error) {
                console.log("No Listing")
            }
        }
        getListings()
    }, [])

    if(loading) {
        return <Spinner />
    }

  return listings && (
    <>
        <p className="explorHeading">
            Recommended
        </p>
        <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, EffectFade, Autoplay]}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            effect="fade"
            autoplay={true}
        >
            {listings.map((listing) => (
                <SwiperSlide key={listing.id} >
                    <div className='swiperSlideDiv' 
                        style={{
                            background: `url(${listing.data.imageUrls[0]}) center no-repeat`,
                            backgroundSize: 'cover',
                            width:"100%",
                            height:"450px",
                            position:"relative"
                        }}
                        
                    >               
                        <p className='swiperSlideText'>{listing.data.name}</p>
                        <p className='swiperSlidePrice'>
                        ${listing.data.discountedPrice ?? listing.data.regularPrice}{' '}
                        {listing.data.type === 'rent' && '/ month'}
                        </p>
                    </div> 
                </SwiperSlide>

            ))}
            
        </Swiper>
    </>
  )
}

export default Slider
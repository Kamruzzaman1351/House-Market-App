import React, {useEffect, useContext, useRef} from 'react'
import { PageHeader, Spinner, ListingItem } from '../components'
import CategoryContext from '../contexts/CategoryContext'

const OffersPage = () => {
    const isMounted = useRef(true)    
    const {listings, loading, fetchOfferListings} = useContext(CategoryContext)
    useEffect(() => {
        if(isMounted) {
            fetchOfferListings()
        }
        return () => {
            isMounted.current = false
        }
    }, [isMounted])
  return (
    <div className='pageContainer'>
      <PageHeader pageTitle='Offers' />
      { loading ? (
            <Spinner />
          ) : listings && listings.length > 0 ? (
            <>
              <main>
                  <ul className="categoryListings">
                      {listings.map((listing) => (
                          <ListingItem 
                              key={listing.id}
                              listing={listing.data}
                              id={listing.id}
                          />
                      ))}
                  </ul>
              </main>
            </>
          ) : (
            <p>No Offers Now</p>
          ) 
      }
    </div>
  )
}

export default OffersPage
import React, {useEffect, useContext, useRef} from 'react'
import { PageHeader, Spinner, ListingItem } from '../components'
import CategoryContext from '../contexts/CategoryContext'

const OffersPage = () => {
    const isMounted = useRef(true)    
    const {listings, loading, fetchOfferListings, fetchMoreOfferListings, fetchLastOfferListing} = useContext(CategoryContext)
    useEffect(() => {
        if(isMounted) {
            fetchOfferListings()
        }
        return () => {
            isMounted.current = false
        }
    }, [isMounted])
    const onClick = () =>{
      fetchMoreOfferListings()
    }
  return (
    <div className='pageContainer profile'>
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
              <br/>
              <br/>
              <br/>
              {fetchLastOfferListing && (
                  <p className='loadMore'
                      onClick={onClick}
                  >Load More</p>
              )}
            </>
          ) : (
            <p>No Offers Now</p>
          ) 
      }
    </div>
  )
}

export default OffersPage
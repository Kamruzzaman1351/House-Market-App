import React, {useEffect, useContext, useRef} from 'react'
import { PageHeader, Spinner, ListingItem } from '../components'
import { useParams } from 'react-router-dom'
import CategoryContext from '../contexts/CategoryContext'
const Category = () => {
    const isMounted = useRef(true)
    const {categoryName} = useParams();
    
    const {listings, loading, fetchListings, fetchMoreListing, fetchLastListing} = useContext(CategoryContext)
    useEffect(() => {
        if(isMounted) {
            fetchListings(categoryName)
        }
        return () => {
            isMounted.current = false
        }
    }, [isMounted])
    const onClick = () =>{
        fetchMoreListing(categoryName)
    }

    return (
        <div className='pageContainer category'>
            <PageHeader pageTitle={categoryName === "rent" ? "Place For Rent" : "Place form Seal"} />
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
                        {fetchLastListing && (
                            <p className='loadMore'
                                onClick={onClick}
                            >Load More</p>
                        )}
                    </>
                ) : (
                    <p>No place for {categoryName}</p>
                ) 
            }
        </div>
    )
}

export default Category
import React from 'react'
import { Link } from 'react-router-dom'
import { bathtubIcon, bedIcon, DeleteIcon } from '../assets'
const ListingItem = ({listing, id, onDelete}) => {
    const {bathrooms, bedrooms, discountedPrice, furnished, geolocation, imageUrls, location, name, offer, parking, regularPrice, type, userRef} = listing
  return (
    <li className="categoryListing">
        <Link to={`/category/${type}/${id}`}
            className="categoryListingLink"
        >
            <img 
                src={imageUrls[0]}
                alt={name}
                className="categoryListingImg"
            />
            <div className="categoryListingDetails">
                <p className="categoryListingLocation">{location}</p>
                <p className="categoryListingName">{name}</p>
                <p className="categoryListingPrice">
                    $ {offer ? 
                        discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",") : 
                        regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")
                    }
                    {type === "rent" && " / Month"}
                </p>
                <div className="categoryListingInfoDiv">
                    <img src={bedIcon} alt="bad" />
                    <p className="categoryListingInfoText">
                        {bedrooms > 1 ? `${bedrooms} Bedrooms`: "1 Bedroom"}
                    </p>
                    <img src={bathtubIcon} alt="bath" />
                    <p className="categoryListingInfoText">
                        {bathrooms > 1 ? `${bathrooms} Bathrooms`: "1 Bathroom"}
                    </p>
                </div>
            </div>
        </Link>
        {true && (
            <DeleteIcon fill="rgb(231,76,60)"
                className="removeIcon"
                onClick={() => onDelete(id, name)}
            />
        )}
    </li>
  )
}

export default ListingItem
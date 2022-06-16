import React from 'react'

const Message = ({message, id}) => {
  return (
    <li className="categoryListing">
        <div className='categoryListingDetails'>
            <h4>Listing Name: {message.listing_name}</h4>
            <p>From: {message.from.name}</p>
            <p>Email: {message.from.email}</p>
            <p>Message: {message.message}</p>
            <button className='formButtonActive'>Reply</button>
        </div>
    </li>
  )
}

export default Message
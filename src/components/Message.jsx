import React from 'react'

const Message = ({message, id, onClick}) => {
  return (
    <li className="categoryListing">
        <div className='categoryListingDetails'>
          <div  style={{
            background: !message.status ? "green" : "white",
            color: !message.status ? "white" : "#00000",
            padding:"5px 10px"
          }}>
            <h4>Listing Name: {message.listing_name}</h4>
            <p>From: {message.from.name}</p>
            <p>Email: {message.from.email}</p>
            <p>Message: {message.message}</p>

          </div>
            <button className='formButtonActive'>Reply</button>
            
          <div className='editIcon'
            style={{color: !message.status? "green" : "red"}} 
            onClick={()=>onClick(id)} >
            {!message.status ? "UnRead" : "Read"}
          </div>
        </div>
    </li>
  )
}

export default Message
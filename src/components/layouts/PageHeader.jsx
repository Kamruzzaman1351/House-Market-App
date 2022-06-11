import React from 'react'
import PropTypes from "prop-types"
const PageHeader = ({pageTitle}) => {
  return (
    <header>
        <p className="pageHeader">{pageTitle}</p>
    </header>
  )
}


PageHeader.defaultProp = {
    pageTitle: "Page Header"
}

PageHeader.propTypes = {
    pageTitle: PropTypes.string.isRequired,
}


export default PageHeader
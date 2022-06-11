import React from 'react'
import { PageHeader } from '../components'
import { useParams } from 'react-router-dom'
const Category = () => {
    const {categoryName} = useParams();
  return (
    <div className='pageContainer'>
        <PageHeader pageTitle={`${categoryName.toLocaleUpperCase()} Category`} />
    </div>
  )
}

export default Category
import {Link, useNavigate} from 'react-router-dom'
import { sellCategoryImage, rentCategoryImage } from '../assets'
import { PageHeader, Slider } from '../components'

const HomePage = () => {
  const navigate = useNavigate()
  const onClick = (path) => {
    navigate(path)
  }
  const allListings = ()=> {
    navigate("/all-listings")
  }
  return (
    <div className="pageContainer profile">
      <PageHeader pageTitle="Explor" />
      <Slider customFunc={(path)=>onClick(path)}/>
      <main>
        {/* Slider Goes Here */}
        <p className="exploreCategoryHeading">Categories</p>
        <div className="exploreCategories">
          <Link to="/category/rent" >
            <img 
              src={rentCategoryImage} 
              className="exploreCategoryImg"
              alt="rent" 
            />
            <p className='exploreCategoryName'>
              Places for Rent
            </p>
          </Link>
          <Link to="/category/sale" >
            <img 
              src={sellCategoryImage} 
              className="exploreCategoryImg"
              alt="sell" 
            />
            <p className='exploreCategoryName'>
              Places for Sell
            </p>
          </Link>
        </div>
        <div className='allListingDiv'>
          <button onClick={allListings}>All Listings</button>
        </div>
      </main>
    </div>
  )
}

export default HomePage
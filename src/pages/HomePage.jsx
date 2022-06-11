import {Link} from 'react-router-dom'
import { sellCategoryImage, rentCategoryImage } from '../assets'
import { PageHeader } from '../components'

const HomePage = () => {
  return (
    <div className="pageContainer explor">
      <PageHeader pageTitle="Explor" />
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
      </main>
    </div>
  )
}

export default HomePage
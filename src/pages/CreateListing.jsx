import { useContext,  } from 'react'
import { ListingForm, PageHeader } from '../components'
import ListingContext from '../contexts/ListingContext'

const CreateListing = () => {
    const {formData, onMutate, onFormSubmit} = useContext(ListingContext)

    return (
        <div className="profile">
            <PageHeader pageTitle="Create Listing" />
            <div>
                <ListingForm 
                    formData={formData} 
                    onSubmit={(e)=>onFormSubmit(e,formData)} 
                    onMutate={onMutate}
                />
            </div>
        </div>
  )
}

export default CreateListing
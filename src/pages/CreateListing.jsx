import { ListingForm, PageHeader } from '../components'


const CreateListing = () => {


    return (
        <div className="profile">
            <PageHeader pageTitle="Create Listing" />
            <div>
                <ListingForm 
                    formData={{}} 
                    onSubmit={() =>{}} 
                    onMutate={() => {}}
                />
            </div>
        </div>
  )
}

export default CreateListing
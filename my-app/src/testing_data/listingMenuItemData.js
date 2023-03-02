//an array containing the user's stored saved listings
import { Typography } from "@mui/material"
import { useId } from "react"

export function SavedListingItem(props) {
    //TODO: map these values from the user's "saved listings" into "listings in mind" drop down menu
    //returns saved listing as menu item within a dropdown menu
    return (
        props.noListingSelected ? "None"
            :
            <div className="saved-listing" style={{ display: 'flex', flexFlow: 'row nowrap' }}>
                {/*replace hard coded values */}
                <img style={{ width: "70px", height: "60px", padding: '5px', borderRadius: '10px' }} src={props.image}></img>
                <div style={{ maxWidth: '350px', display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: '5px', }}>
                    <Typography variant="body2" color="text.secondary" noWrap>
                        {/*replace hard coded values */}
                        {props.address}
                    </Typography>
                    <Typography component="div" fontWeight="bold" noWrap >
                        {/*replace hard coded values */}
                        {`${props.price}/month`}
                    </Typography>
                    <Typography component="div" fontWeight="normal" fontSize="small" noWrap >
                        {/*replace hard coded values */}
                        {props.bedBath}
                    </Typography>

                </div>
            </div >
    )
}

export const listingMenuItems = [

    <SavedListingItem
        noListingSelected={true}
        index={0}
        image=""
        address=""
        price=""
        bedBath=""
    />,
    <SavedListingItem
        index={1}
        image="https://www.contemporist.com/wp-content/uploads/2015/09/student-housing_050915_01.jpg"
        address="345 Horner Avenue, Etobicoke, ON, Canada"
        price={`$${2800}`}
        bedBath="3 Beds | 2 Baths | 1900 sqft"
    />,
    <SavedListingItem
        index={2}
        image="https://hbrdnhlsprod.blob.core.windows.net/nhlsprod/uploads/ckeditor/pictures/344/content_Calgary_Condos_NHLS.jpg"
        address="Square One Shopping Centre, City Centre Drive, Mississauga, ON, Canada"
        price={`$${2300}`}
        bedBath="4 Beds | 4 Baths | 2500 sqft"
    />,
    <SavedListingItem
        index={3}
        image="https://hbrdnhlsprod.blob.core.windows.net/nhlsprod/uploads/posting/logo/222352/large_square_1.jpg"
        address="2597 Cartwright Crescent, Mississauga, ON L5M, Canada"
        price={`$${1200}`}
        bedBath="1 Beds | 1 Baths | 800 sqft"
    />,
    <SavedListingItem
        index={4}
        image="https://www.guidehabitation.ca/wp-content/themes/gh/pub/auto/10256/xl-19792daf-2be5-472f-98c4-970ac5479ea7.jpg"
        address="81 Bay Street, Toronto, ON, Canada"
        price={`$${1400}`}
        bedBath="2 Beds | 1 Baths | 1200 sqft"
    />,
    <SavedListingItem
        index={5}
        image="https://images.rentals.ca/property-pictures/medium/kitchener-on/438218/apartment-4118473.jpg"
        address="Burlington Bowl, Harvester Road, Burlington, ON, Canada"
        price={`$${1100}`}
        bedBath="2 Beds | 1 Baths | 1000 sqft"
    />,
    <SavedListingItem
        index={6}
        image="https://dmn-dallas-news-prod.cdn.arcpublishing.com/resizer/TOFA0I1HAkCvldr0PMoacKC-eTc=/1660x934/smart/filters:no_upscale()/cloudfront-us-east-1.images.arcpublishing.com/dmn/B53LOI4GQVDOJCXCHTMBPZKWKU.jpg"
        address="14 Jane Street, York, ON, Canada"
        price={`$${1750}`}
        bedBath="2 Beds | 3 Baths | 2000 sqft"
    />,
    <SavedListingItem
        index={7}
        image="https://srresidenceschicago.com/wp-content/uploads/vista_wide-three-bed-13.jpg"
        address="14th Avenue, Markham, ON, Canada"
        price={`$${900}`}
        bedBath="1 Beds | 1 Baths | 500 sqft"
    />,
]


export const identityMenuItems = [
    "As myself",
    "As a group",
]
import { Typography, Divider } from "@mui/material"
import { ActionButton } from "../../../Components/Utils/Form"
import { Link } from "react-router-dom"

/**
 * @function StaticInfoBox 
 * 
 * @brief (Child Component of Unit function) Renders the L2Details component, which displays information about the lowest level of a property listing (unit).
 * 
 * @details shows information on the individual units of the building as well call to action buttons 
 * @param {object} data stores listing info that will be used to populate the listing details page
 * @param {number} index stores the index of the unit details (inherited props from l2Details) 
 * @returns {React.ReactElement} a react element that contains the most important information about the unit
 */
export default function StaticInfoBox({ data, index }) {

    return (
        <>
            <UnitDetails data={data} index={index} />
            <ActionBox />
        </>

    )
}

/**
 * @brief A function UI component that displays key info about the unit
 * 
 * @param {object} data inherited from StaticInfoBox
 * @param {number} index inherited from StaticInfoBox
 * @details
    * How Unit Details is structured
        * 1. Unit Name (ex. Bedroom 1)
        * 2. Unit Price
        * 3. Date first available 
        * 4. Number of beds
        * 5. Number of Baths
        * 6. Number of Sqft
        * 7. Type of unit (duplex, studio)
 * @returns {JSX.Element} a jsx element that contains key information on the unit
 */
const UnitDetails = ({ data, index }) => {

    return (
        <div style={{ margin: '0px 15px 0px 15px' }}>
            <Typography color="text.primary" variant="h4" sx={{ padding: '10px 0px 10px 0px', fontWeight: 800 }}>
                {data.listing_details.units[index].title}
            </Typography>
            <Typography color="text.secondary" variant="h5" sx={{ padding: '5px', fontWeight: 600 }}>
                {`$${data.listing_details.units[index].price} ${data.listing_details.units[index].currency} / Month`}
            </Typography>
            <Typography color="text.secondary" variant="h6" sx={{ padding: '5px', color: 'grey' }} >
                {`Available: ${data.listing_details.units[index].dateAvailable}`}
            </Typography>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Typography color="text.secondary" variant="h6" sx={{ margin: '0px 5px 0px 5px', color: "grey", }}>
                    {`${data.listing_details.units[index].beds} Beds`}
                </Typography>
                <div><Divider orientation="vertical" sx={{ margin: '0px 5px 0px 5px', }} /></div>
                <Typography color="text.secondary" variant="h6" sx={{ margin: '0px 5px 0px 5px', color: 'grey' }}>
                    {`${data.listing_details.units[index].baths} Baths`}
                </Typography>
                <div><Divider orientation="vertical" sx={{ margin: '0px 5px 0px 5px' }} /></div>
                <Typography color="text.secondary" variant="h6" sx={{ margin: '0px 5px 0px 5px', color: 'grey' }}>
                    {`${data.listing_details.units[index].sqft} Sqft`}
                </Typography>
                <div><Divider orientation="vertical" sx={{ margin: '0px 5px 0px 5px' }} /></div>
                <Typography color="text.secondary" variant="h6" sx={{ margin: '0px 5px 0px 5px', color: 'grey' }}>
                    {`${data.listing_details.units[index].type}`}
                </Typography>
            </div>
        </div>
    )
}


/**
 * @brief A function UI component that houses the call to action buttons
 * @details User can choose to either start their application or book a tour
 * @returns {React.ReactElement} a react element that contains 2 action buttons
 */
const ActionBox = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Link
                to={"/applications"}
                style={{ textDecoration: 'none', width: '50%', margin: '0px 10px 0px 10px' }}
            >
                <ActionButton title="Apply Now" containerWidth="100%" height="50px" />
            </Link>
            <ActionButton title="Book a Tour" containerWidth="50%" height="50px" />
        </div>
    )
}
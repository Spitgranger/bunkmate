//an array containing the user's stored saved listings
import { Tooltip, Typography } from "@mui/material"
import { useId } from "react"

export function SavedListingItem(props) {
    //TODO: map these values from the user's "saved listings" into "listings in mind" drop down menu
    //returns saved listing as menu item within a dropdown menu
    console.log(parseInt(props.price), props.roommates)
    return (
        props.noListingSelected ? "None"
            :
            <div className="saved-listing" style={{ display: 'flex', flexFlow: 'row nowrap', }}>
                {/*replace hard coded values */}
                <img style={{ width: "70px", height: "60px", padding: '5px', borderRadius: '10px' }} src={props.image}></img>
                <div style={{ maxWidth: props.addressWidth ?? '350px', display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: '5px', }}>
                    <Typography variant="body2" color="text.secondary" noWrap>
                        {/*replace hard coded values */}
                        {props.address}
                    </Typography>
                    <Typography component="div" fontWeight="bold" noWrap >
                        {/*replace hard coded values */}
                        {`$${props.price}/month   `}
                        {props.price && props.totalRoommates ?
                            `  $${Math.round(parseInt(props.price) / props.totalRoommates)}/person`
                            : null}
                    </Typography>
                    <Typography component="div" fontWeight="normal" fontSize="small" noWrap >
                        {/*replace hard coded values */}
                        {props.bedBath}
                    </Typography>

                </div>
            </div >
    )
}
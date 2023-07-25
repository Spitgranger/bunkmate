//an array containing the user's stored saved listings
import {Typography} from "@mui/material"
import React from 'react'

interface SavedListingItemProps {
    index: number
    image: string
    address: string
    price: string
    bedBath: string
    addressWidth?: string
    totalBunkmates?: number
}

export function SavedListingItem(props: SavedListingItemProps): React.ReactNode {
    //TODO: map these values from the user's "saved listings" into "listings in mind" drop down menu
    //returns saved listing as menu item within a dropdown menu
    return (
        <div className="saved-listing" style={{display: 'flex', flexFlow: 'row nowrap', alignItems: 'center'}}>
            {/*replace hard coded values */}
            <img style={{width: "70px", height: "60px", padding: '5px', borderRadius: '10px'}}
                 src={props.image}></img>
            <div style={{
                maxWidth: props.addressWidth ?? '350px',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                padding: '5px',
            }}>
                <Typography variant="body2" color="text.secondary" noWrap>
                    {/*replace hard coded values */}
                    {props.address}
                </Typography>
                <Typography component="div" fontWeight="bold" noWrap>
                    {/*replace hard coded values */}
                    {`$${props.price}/month   `}
                    {props.price && props.totalBunkmates ?
                        `  $${Math.round(parseInt(props.price) / props.totalBunkmates)}/person`
                        : null}
                </Typography>
                <Typography component="div" fontWeight="normal" fontSize="small" noWrap>
                    {/*replace hard coded values */}
                    {props.bedBath}
                </Typography>

            </div>
        </div>
    )
}
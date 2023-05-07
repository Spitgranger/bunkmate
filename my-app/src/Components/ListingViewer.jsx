import { useEffect, useState } from "react"
import { CardMedia, CardContent, Typography, CardActionArea, Divider } from "@mui/material"
import { ActionButton } from "./Utils/Form"
import { Link } from "react-router-dom"

function ListingViewer({ data }) {


    const maxCharacterLength = 300
    //state management for how many characters of the overview is seen at any given time
    const [overViewLength, setOverViewLength] = useState(maxCharacterLength)
    //View more / View Less State
    const [viewMore, setViewMore] = useState(false)
    //state management for checking if the character count is over the limit
    const [overflow, setOverflow] = useState(false)
    //state management for text overflow elipsis
    const [textOverflowElipsis, setTextOverflowElipsis] = useState("...")


    //UI component for units in the property
    const Unit = ({ unitData }) => {
        return (
            <>
                <CardActionArea style={{ borderRadius: '10px', padding: '10px', width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
                    <CardMedia sx={{ width: "30%", height: '100%', borderRadius: '5%' }} component="img" image={unitData.interiorLayoutImage}></CardMedia>
                    <CardContent sx={{ width: '70%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: '100px', padding: '0px 10px 0px 10px !important' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                            <Typography color="text.primary" sx={{ fontWeight: 600, paddingRight: '2px', }}>
                                {unitData.title}
                            </Typography>
                            <Typography color="text.secondary" sx={{ fontWeight: 600, paddingLeft: '2px' }}>
                                {unitData.type}
                            </Typography>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                            <Typography color="text.primary" variant="h4" sx={{ fontWeight: 600, fontSize: '20px' }}>
                                {`$${unitData.price}`}
                            </Typography>
                            <Typography color="text.secondary" sx={{ fontWeight: 600 }}>
                                {`${unitData.numUnitsAvailable} Units`}
                            </Typography>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <Typography color="text.secondary">
                                {`${unitData.beds} Beds`}
                            </Typography>
                            <Divider orientation="vertical" sx={{ margin: '0px 5px 0px 5px' }} />
                            <Typography color="text.secondary">
                                {`${unitData.baths} Baths`}
                            </Typography>
                            <Divider orientation="vertical" sx={{ margin: '0px 5px 0px 5px' }} />
                            <Typography color="text.secondary">
                                {`${unitData.sqft} Sqft`}
                            </Typography>
                        </div>
                        <Typography color="text.secondary">
                            {`Available: ${unitData.dateAvailable}`}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <div style={{ width: '100%', padding: '10px' }}>
                    <Divider sx={{ width: '100%' }} />
                </div>
            </>
        )
    }

    //Used on initial render to determine if view more functionality is needed
    const Overview = () => {
        if (data.listing_details.overview.length <= maxCharacterLength) {
            setOverflow(false)
            return (data.listing_details.overview)
        } else if (data.listing_details.overview.length > maxCharacterLength) {
            setOverflow(true)
            return (data.listing_details.overview.substring(0, overViewLength) + textOverflowElipsis)
        }
    }


    //state management for view more button
    const handleViewMore = () => {
        setViewMore(!viewMore)
    }

    useEffect(() => {
        if (viewMore) {
            setOverViewLength(data.listing_details.overview.length)
            setTextOverflowElipsis("")
        } else if (!viewMore) {
            setOverViewLength(300)
            setTextOverflowElipsis("...")
        }
    }, [handleViewMore])

    return (
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: "row", width: '65vw', height: '80vh', overflowY: 'scroll' }}>
            <CardContent style={{ display: 'flex', width: '60%', flexDirection: 'column', margin: '10px', overflowY: 'scroll' }}>
                <CardActionArea sx={{ borderRadius: '5%', }}>
                    <CardMedia component="img" image={data.listing_img[0]} sx={{ borderRadius: "2%" }} />
                </CardActionArea>
                <div style={{ display: 'flex', flexFlow: "row wrap", justifyContent: 'center', padding: '10px' }}>
                    <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
                        {data.listing_img.slice(1).map((image) => (
                            <CardActionArea sx={{ borderRadius: '5%', maxWidth: '31%', margin: '1%' }}>
                                <CardMedia component="img" image={image} sx={{ borderRadius: '2%' }} />
                            </CardActionArea>))}
                    </div>
                </div>
            </CardContent>
            <CardContent sx={{ margin: '10px', width: '40%', display: 'flex', alignItems: 'flex-start', flexDirection: 'column', }}>
                <Typography color="text.primary" variant="h4" sx={{ padding: '10px 0px 10px 0px', fontWeight: 800 }}>
                    {data.listing_details.developerName}
                </Typography>
                <Typography color="text.secondary" variant="h5" sx={{ padding: '5px' }}>
                    {data.listing_details.address}
                </Typography>
                <Typography color="text.secondary" variant="h6" sx={{ padding: '5px', fontWeight: 600 }} >
                    {`$${data.listing_details.priceRange[0]} - $${data.listing_details.priceRange[1]}`}
                </Typography>
                <Typography color="text.secondary" variant="h6" sx={{ padding: '5px', fontWeight: 600 }} >
                    {`${data.listing_details.sqftRange[0]} - ${data.listing_details.sqftRange[1]} Sqft`}
                </Typography>
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Link
                        to={"/apply_to_listings"}
                        style={{ textDecoration: 'none', width: '50%', margin: '0px 10px 0px 10px' }}
                    >
                        <ActionButton title="Apply Now" containerWidth="100%" />
                    </Link>
                    <ActionButton title="Book a Tour" containerWidth="50%" />
                </div>
                <div style={{ margin: '10px', width: '100%', display: 'flex', alignItems: 'flex-start', flexDirection: 'column', overflowY: 'scroll' }}>
                    <Typography color="text.primary" variant="h5" sx={{ padding: '10px 0px 10px 0px ', fontWeight: 600 }} >
                        Overview
                    </Typography>
                    <Typography color="text.secondary" sx={{ padding: '5px' }}>
                        <Overview />
                    </Typography>
                    {overflow
                        ? <div style={{ width: '100%' }}>
                            <Divider sx={{ color: "grey", cursor: 'pointer' }} onClick={handleViewMore}>{viewMore ? "View Less" : "View More"}</Divider>
                        </div>
                        : ""}
                    <Typography color="text.primary" variant="h5" sx={{ padding: '10px 0px 10px 0px ', fontWeight: 600 }} >
                        Units
                    </Typography>
                    {data.listing_details.units.map((unitData) => {
                        return (<Unit unitData={unitData} />)
                    })}
                </div>
            </CardContent>
        </div >
    )
}

export default ListingViewer
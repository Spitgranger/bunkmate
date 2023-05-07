import { useEffect, useState } from "react"
import { Avatar, Card, CardMedia, CardContent, Typography, CardActionArea, Divider, IconButton } from "@mui/material"
import { useLocation } from "react-router-dom"
import Navbar from "./Navbar";
import { BsFillBookmarksFill, BsBookmarks } from "react-icons/bs";
import { IoShareSocialOutline, IoShareSocial, IoBedSharp } from "react-icons/io5";
import { MdCircle, MdVilla } from "react-icons/md";
import { AiFillDollarCircle, } from "react-icons/ai";
import { FaSwimmingPool } from "react-icons/fa";
import { CgGym } from "react-icons/cg";
import { TbElevator } from "react-icons/tb";
import { RiParkingBoxLine } from "react-icons/ri";
import { IoMdBasketball } from "react-icons/io";
import { BiParty } from "react-icons/bi";

function ListingDetails() {

    const pageStyles = {
        page: { display: 'flex', alignItems: 'center', width: '100%', flexDirection: 'column', padding: '20px' },
        top: { minWidth: '1000px', maxWidth: '60%' },
        body: {
            display: 'flex', flexDirection: 'row',
            leftSide: { margin: '10px', padding: '10px', width: '50%', display: 'flex', alignItems: 'flex-start', flexDirection: 'column', },
            rightSide: { width: '50%', display: 'flex', alignItems: 'flex-end', flexDirection: 'column', padding: '20px 0px 20px 0px' }
        }
    }

    const { state } = useLocation();
    const data = state

    return (
        <>
            <Navbar />
            <div style={{ height: '9vh' }} />
            <div style={pageStyles.page}>
                <div style={pageStyles.top}>
                    <TopInfoBar data={data} />
                    <Gallery data={data} />
                    <div style={pageStyles.body}>
                        <div style={pageStyles.body.leftSide}>
                            <Overview />
                            <Property data={data} />
                            <Ammenities />
                            <Policies />
                        </div>
                        <div style={pageStyles.body.rightSide}>
                            <UnitCard data={data} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default ListingDetails


function TopInfoBar({ data }) {

    const topInfoBarStyles = {
        container: { display: 'flex', alignItems: 'flex-start', flexDirection: 'column', padding: '0px 20px 0px 20px' },
        developerName: { padding: '20px 0px 0px 0px', fontWeight: 800, },
        subBar: {
            display: 'flex', justifyContent: 'space-between', width: '100%',
            address: { padding: '5px' },
            actions: {
                display: 'flex', flexDirection: 'row', alignItems: 'center',
                share: { padding: '0px 5px 0px 5px', fontSize: '15px' },
                save: { padding: '0px 5px 0px 5px', fontSize: '15px' },
            },

        }
    }

    //state management for saving listings
    const [saveListing, setSaveListing] = useState(false)
    //state management for sharing listings
    const [shareListing, setShareListing] = useState(false)


    //@details function for saving a listing
    //@details boolean alternates between true and false 
    const handleSaveListing = () => {
        setSaveListing(!saveListing)
    }

    //@details function for sharing a listing
    //@details boolean alternates between true and false 
    const handleShareListing = () => {
        setShareListing(!shareListing)
    }

    return (

        <CardContent sx={topInfoBarStyles.container}>
            <Typography color="text.primary" variant="h4" sx={topInfoBarStyles.developerName}>
                {data.listing_details.developerName}
            </Typography>
            <div style={topInfoBarStyles.subBar}>
                <Typography color="text.secondary" variant="h5" sx={topInfoBarStyles.subBar.address}>
                    {data.listing_details.address}
                </Typography>
                <div style={topInfoBarStyles.subBar.actions}>
                    <IconButton onClick={handleShareListing}>
                        {shareListing ? <IoShareSocial /> : <IoShareSocialOutline />}
                    </IconButton>
                    <Typography color="text.primary" variant="h6" sx={topInfoBarStyles.subBar.actions.share}>
                        Share
                    </Typography>
                    <IconButton onClick={handleSaveListing}>
                        {saveListing ? <BsFillBookmarksFill /> : <BsBookmarks />}
                    </IconButton>
                    <Typography color="text.primary" variant="h6" sx={topInfoBarStyles.subBar.actions.save}>
                        Save
                    </Typography>
                </div>
            </div>
        </CardContent >
    )
}

function Gallery({ data }) {
    const gallery = {
        container: {
            display: 'flex', justifyContent: 'center', height: '100%',
            innerContainer: {
                display: 'flex', width: '100%', flexDirection: 'row', margin: '20px', borderRadius: '2%', padding: '0%', overflow: 'hidden',
            },
        },
        largeImage: { flex: 2 },
        smallImagesContainer: { display: 'flex', flexFlow: "column wrap", flex: 1, marginLeft: '10px', },
        smallImage: { margin: '5px' },

    }
    return (

        <div style={gallery.container}>
            <CardContent style={gallery.container.innerContainer}>
                <CardActionArea sx={gallery.largeImage}>
                    <CardMedia component="img" image={data.listing_img[0]} />
                </CardActionArea>
                <div style={gallery.smallImagesContainer}>
                    {data.listing_img.slice(1).map((image) => (
                        <CardActionArea sx={gallery.smallImage}>
                            <CardMedia component="img" image={image} />
                        </CardActionArea>
                    ))}
                </div>
            </CardContent>
        </div>
    )
}

function Overview() {

    return (
        <div style={{ margin: '20px 0px 20px 0px' }}>
            <Typography color="text.primary" variant="h5" sx={{ padding: '10px 0px 10px 0px ', fontWeight: 600, }}>
                Overview
            </Typography>
            <div style={{ display: 'flex', flexDirection: 'row', padding: '10px 5px 10px 5px' }}>
                <MdVilla size={30} />
                <div style={{ padding: '3px' }}>
                    <Typography color="text.primary" variant="h5" sx={{ fontWeight: 600, fontSize: '17px', padding: '2px' }} >
                        Room in Villa
                    </Typography>
                    <Typography color="text.secondary" variant="h5" sx={{ padding: '10px 0px 10px 0px ', fontWeight: 600, fontSize: '15px', padding: '2px' }} >
                        Your own room in a home, plus access to shared spaces.
                    </Typography>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', padding: '10px 5px 10px 5px' }}>
                <IoBedSharp size={30} />
                <div style={{ padding: '3px' }}>
                    <Typography color="text.primary" variant="h5" sx={{ fontWeight: 600, fontSize: '17px', padding: '2px' }} >
                        Private rooms for rent
                    </Typography>
                    <Typography color="text.secondary" variant="h5" sx={{ padding: '10px 0px 10px 0px ', fontWeight: 600, fontSize: '15px', padding: '2px' }} >
                        You can rent one of the bedrooms in this shared home.
                    </Typography>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', padding: '10px 5px 10px 5px' }}>
                <AiFillDollarCircle size={30} />
                <div style={{ padding: '3px' }}>
                    <Typography color="text.primary" variant="h5" sx={{ fontWeight: 600, fontSize: '17px', padding: '2px' }} >
                        Pro-Rated
                    </Typography>
                    <Typography color="text.secondary" variant="h5" sx={{ padding: '10px 0px 10px 0px ', fontWeight: 600, fontSize: '15px', padding: '2px' }} >
                        You will not be charged a full monthly cost, if you book partial months.
                    </Typography>
                </div>
            </div>
        </div>
    )
}

function Property({ data }) {

    const propertyStyles = {
        container: { margin: '20px 0px 20px 0px' },
        title: { padding: '10px 0px 10px 0px ', fontWeight: 600, },
        propertyContainer: { padding: '5px' },
        managementInfo: { display: 'flex', flexDirection: 'row', alignItems: 'center', margin: '10px 0px 10px 0px', padding: '10px 0px 10px 0px !important' },
        Avatar: { width: '65px', height: '65px', margin: '0px 20px 0px 10px' },
        textInfo: {
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            place: { fontWeight: 700, fontSize: '17px' },
            address: { fontWeight: 700, fontSize: '15px' },
            number: { fontWeight: 700, fontSize: '15px' }
        },
        viewMoreContainer: {
            width: '100%',
            viewMore: { color: 'grey', cursor: 'pointer' }
        }
    }

    const maxCharacterLength = 300
    //state management for how many characters of the overview is seen at any given time
    const [overViewLength, setOverViewLength] = useState(maxCharacterLength)
    //View more / View Less State
    const [viewMore, setViewMore] = useState(false)
    //state management for checking if the character count is over the limit
    const [overflow, setOverflow] = useState(false)
    //state management for text overflow elipsis
    const [textOverflowElipsis, setTextOverflowElipsis] = useState("...")

    //Used on initial render to determine if view more functionality is needed
    const InitialViewMore = () => {
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
    //Change character limit and showing textoverflow elipsis depending on view more state
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
        <div style={propertyStyles.container}>
            <Typography color="text.primary" variant="h5" sx={propertyStyles.title} >
                Property
            </Typography>
            <Typography color="text.secondary" sx={propertyStyles.propertyContainer}>
                <CardContent sx={propertyStyles.managementInfo}>
                    <Avatar sx={propertyStyles.Avatar} src={'https://thumbs.dreamstime.com/b/b-letter-boutique-logo-design-159417325.jpg'} />
                    <div style={propertyStyles.textInfo}>
                        <Typography color="text.primary" variant="h6" sx={propertyStyles.textInfo.place}>
                            Marshalls Place
                        </Typography>
                        <Typography color="text.secondary" variant="h6" sx={propertyStyles.textInfo.address}>
                            4753 Stewart Street Indianapolis
                        </Typography>
                        <Typography color="text.secondary" variant="h6" sx={propertyStyles.textInfo.number}>
                            +1 (647) 451 4523
                        </Typography>

                    </div>
                </CardContent>

                <InitialViewMore />
            </Typography>
            {overflow
                ? <div style={propertyStyles.viewMoreContainer}>
                    <Divider sx={propertyStyles.viewMoreContainer.viewMore} onClick={handleViewMore}>{viewMore ? "View Less" : "View More"}</Divider>
                </div>
                : ""}
        </div>
    )
}

function Ammenities() {

    const ammenitiesStyles = {
        title: { marginTop: '20px', padding: '10px 0px 10px 0px ', fontWeight: 600, },
        container: { display: 'flex', justifyContent: 'space-between', width: '100%' },
        firstColumn: { width: '100%', margin: '10px 0px 10px 0px', flexFlow: 'column wrap', height: '130px', display: 'flex', justifyContent: 'flex-start' },
        ammenityContainer: {
            display: 'flex', flexDirection: 'row', padding: '10px 5px 10px 5px',
            ammenity: { fontWeight: 600, fontSize: '17px', margin: '0px 10px 0px 10px' }
        },
        viewAll: {
            borderBottom: '1px solid black', cursor: 'pointer'
        }

    }

    return (
        <>
            <Typography color="text.primary" variant="h5" sx={ammenitiesStyles.title}>
                Ammenities
            </Typography>
            <div style={ammenitiesStyles.container}>
                <div style={ammenitiesStyles.firstColumn}>
                    <div style={ammenitiesStyles.ammenityContainer}>
                        <CgGym size={20} />
                        <Typography noWrap color="text.secondary" variant="h5" sx={ammenitiesStyles.ammenityContainer.ammenity} >
                            Gym
                        </Typography>
                    </div>
                    <div style={ammenitiesStyles.ammenityContainer}>
                        <FaSwimmingPool size={20} />
                        <Typography noWrap color="text.secondary" variant="h5" sx={ammenitiesStyles.ammenityContainer.ammenity} >
                            Pool
                        </Typography>
                    </div>
                    <div style={ammenitiesStyles.ammenityContainer}>
                        <TbElevator size={20} />
                        <Typography noWrap color="text.secondary" variant="h5" sx={ammenitiesStyles.ammenityContainer.ammenity} >
                            Elevator
                        </Typography>
                    </div>
                </div>
                <div style={ammenitiesStyles.secondColumn}>
                    <div style={ammenitiesStyles.ammenityContainer}>
                        <BiParty size={20} />
                        <Typography noWrap color="text.secondary" variant="h5" sx={ammenitiesStyles.ammenityContainer.ammenity} >
                            Party Room
                        </Typography>
                    </div>
                    <div style={ammenitiesStyles.ammenityContainer}>
                        <IoMdBasketball size={20} />
                        <Typography noWrap color="text.secondary" variant="h5" sx={ammenitiesStyles.ammenityContainer.ammenity} >
                            Games Room
                        </Typography>
                    </div>
                    <div style={ammenitiesStyles.ammenityContainer}>
                        <RiParkingBoxLine size={20} />
                        <Typography noWrap color="text.secondary" variant="h5" sx={ammenitiesStyles.ammenityContainer.ammenity} >
                            Parking
                        </Typography>

                    </div>
                </div>
            </div>
            <Typography color="text.secondary" sx={ammenitiesStyles.viewAll}>View All</Typography>
        </>
    )
}

function Policies() {

    const policiesStyles = {
        container: { margin: '20px 0px 20px 0px' },
        title: { marginTop: '20px', padding: '10px 0px 10px 0px', fontWeight: 600, },
        policyContainer: {
            display: 'flex', flexDirection: 'row', alignItems: 'center',
            bulletPoint: { margin: '10px', fontSize: '18px' },
            policy: { fontWeight: 600, fontSize: '16px' },
        },
    }

    return (

        <div style={policiesStyles.container}>
            <Typography color="text.primary" variant="h5" sx={policiesStyles.title}>
                Policies
            </Typography>
            <div style={policiesStyles.policyContainer}>
                <MdCircle style={policiesStyles.policyContainer.bulletPoint} />
                <Typography color="text.secondary" variant="h5" sx={policiesStyles.policyContainer.policy} >
                    Subletting isn't permitted
                </Typography>
            </div>
            <div style={policiesStyles.policyContainer}>
                <MdCircle style={policiesStyles.policyContainer.bulletPoint} />
                <Typography color="text.secondary" variant="h5" sx={policiesStyles.policyContainer.policy} >
                    Pets are allowed
                </Typography>
            </div>
            <div style={policiesStyles.policyContainer}>
                <MdCircle style={policiesStyles.policyContainer.bulletPoint} />
                <Typography color="text.secondary" variant="h5" sx={policiesStyles.policyContainer.policy} >
                    No smoking on or around the premise
                </Typography>
            </div>
            <div style={policiesStyles.policyContainer}>
                <MdCircle style={policiesStyles.policyContainer.bulletPoint} />
                <Typography color="text.secondary" variant="h5" sx={policiesStyles.policyContainer.policy} >
                    Must inform landlord prior to bringing guests
                </Typography>
            </div>
        </div>


    )
}

function UnitCard({ data }) {

    const unitCardStyles = {
        cardContainer: { width: '85%', padding: '30px', borderRadius: '10px', margin: '20px' },
        priceRange: { padding: '5px', fontWeight: 600 },
        sqftRange: { padding: '5px', fontWeight: 600 },
    }

    return (
        <Card sx={unitCardStyles.cardContainer} raised={true}>
            <Typography color="text.primary" variant="h5" sx={unitCardStyles.priceRange} >
                {`$${data.listing_details.priceRange[0]} - $${data.listing_details.priceRange[1]}`}
            </Typography>
            <Typography color="text.secondary" variant="h6" sx={unitCardStyles.sqftRange} >
                {`${data.listing_details.sqftRange[0]} Sqft - ${data.listing_details.sqftRange[1]} Sqft`}
            </Typography>
            {data.listing_details.units.map((unitData) => {
                return (<Unit unitData={unitData} />)
            })}
        </Card>
    )
}


//UI component for units in the property
//Child Component for Unit Card
function Unit({ unitData }) {

    const unitStyles = {
        container: { borderRadius: '10px', padding: '10px', width: '100%', display: 'flex', justifyContent: 'flex-start' },
        unitImage: { width: "30%", height: '100%', borderRadius: '5%' },
        unitContainer: {
            width: '70%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: '100px', padding: '0px 10px 0px 10px !important',
            firstRow: {
                display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%',
                title: { fontWeight: 600, paddingRight: '2px', fontSize: '18px' },
                type: { fontWeight: 600, paddingLeft: '2px' }
            },
            price: { fontWeight: 600, fontSize: '20px' },
            beds: { display: 'flex', flexDirection: 'row' },
            divider: { margin: '0px 5px 0px 5px' }

        },

    }

    return (
        <>
            <CardActionArea sx={unitStyles.container}>
                <CardMedia sx={unitStyles.unitImage} component="img" image={unitData.interiorLayoutImage} />
                <CardContent sx={unitStyles.unitContainer}>
                    <div style={unitStyles.unitContainer.firstRow}>
                        <Typography color="text.secondary" sx={unitStyles.unitContainer.firstRow.title}>
                            {unitData.title}
                        </Typography>
                        <Typography color="text.secondary" sx={unitStyles.unitContainer.firstRow.type}>
                            {unitData.type}
                        </Typography>
                    </div>
                    <Typography color="text.primary" variant="h4" sx={unitStyles.unitContainer.price}>
                        {`$${unitData.price}`}
                    </Typography>
                    <div style={unitStyles.unitContainer.beds}>
                        <Typography color="text.secondary">
                            {`${unitData.beds} Beds`}
                        </Typography>
                        <Divider orientation="vertical" sx={unitStyles.unitContainer.divider} />
                        <Typography color="text.secondary">
                            {`${unitData.baths} Baths`}
                        </Typography>
                        <Divider orientation="vertical" sx={unitStyles.unitContainer.divider} />
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


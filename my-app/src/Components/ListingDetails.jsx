import React, { useEffect, useState } from "react"
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


/**
 * @function ListingDetails
 * 
 * @brief Renders the ListingDetails component, which displays information about a property listing.
 * 
 * @details
    * How the page is organized
        * 1. Navbar
        * 2. TopInfoBar
        * 3. Gallery
        * 4. Overview
        * 5. Property
        * 6. Ammenities
        * 7. Policies
        * 8. UnitCard 
 * @returns {React.ReactElement} a react element that contains a wealth of information about the property
 */
export default function ListingDetails() {

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

/**
 * @brief A functional UI component for the Top Bar of the listing details page 
 * 
 * @details 
    * How the TopInfoBar is structured
        * 1. The Name of the property
        * 2. The Address of the property
        * 3. Share button
        * 4. Save button
 * @param {object} data stores listing info that will be used to populate the listing details page
 * @returns {React.ReactElement} A react element that contains the header content
 */
function TopInfoBar({ data }) {

    const topInfoBarStyles = {
        container: { display: 'flex', alignItems: 'flex-start', flexDirection: 'column', padding: '0px 20px 0px 20px' },
        developerName: { padding: '20px 0px 0px 0px', fontWeight: 800, },
        subBar: {
            display: 'flex', justifyContent: 'space-between', width: '100%',
            address: { padding: '5px' },
            actions: {
                display: 'flex', flexDirection: 'row', alignItems: 'center',
                action: { padding: '0px 5px 0px 5px', fontSize: '15px' },
            },

        }
    }

    // Define state variable for tracking whether the user has saved a listing
    const [saveListing, setSaveListing] = useState(false)
    // Define state variable for tracking whether the user has shared a listing
    const [shareListing, setShareListing] = useState(false)


    /**
     * @brief This event handler uses the setSaveListing hook to toggle the saveListing state between true and false.
     * 
     * @details If saveListing is currently true, this function sets it to false. If it's false, this function sets it to true.
     * @see setSaveListing save / unsave state
     */
    const handleSaveListing = () => {
        setSaveListing(!saveListing)
    }

    /**
     * @brief This event handler uses the setShareListing hook to toggle the saveListing state between true and false.
     * 
     * @details If shareListing is currently true, this function sets it to false. If it's false, this function sets it to true.
     * @see setShareListing share / unshare state 
     */
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
                    <Typography color="text.primary" variant="h6" sx={topInfoBarStyles.subBar.actions.action}>
                        Share
                    </Typography>
                    <IconButton onClick={handleSaveListing}>
                        {saveListing ? <BsFillBookmarksFill /> : <BsBookmarks />}
                    </IconButton>
                    <Typography color="text.primary" variant="h6" sx={topInfoBarStyles.subBar.actions.action}>
                        Save
                    </Typography>
                </div>
            </div>
        </CardContent >
    )
}

/**
 * @brief A functional UI component that displays a photo gallery of the property
 * 
 * @details The gallery displays the top 4 photos of gallery with the 1st photo taking up the most space
 * @param {object} data stores listing info that will be used to populate the listing details page
 * @returns {React.ReactElement} a react element that contains gallery photos of the property 
 */
function Gallery({ data }) {

    const galleryStyles = {
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

        <div style={galleryStyles.container}>
            <CardContent style={galleryStyles.container.innerContainer}>
                <CardActionArea sx={galleryStyles.largeImage}>
                    <CardMedia component="img" image={data.listing_img[0]} />
                </CardActionArea>
                <div style={galleryStyles.smallImagesContainer}>
                    {data.listing_img.slice(1).map((image) => (
                        <CardActionArea sx={galleryStyles.smallImage}>
                            <CardMedia component="img" image={image} />
                        </CardActionArea>
                    ))}
                </div>
            </CardContent>
        </div>
    )
}

/**
 * @brief A functional UI component that displays an overview section with multiple overview points and takes no props.
 * 
 * @returns {React.ReactElement} A React element representing the overview section UI component. 
 */
function Overview() {

    const overviewStyles = {
        container: { margin: '20px 0px 20px 0px' },
        title: { padding: '10px 0px 10px 0px ', fontWeight: 600, },
        overviewContainer: {
            display: 'flex', flexDirection: 'row', padding: '10px 5px 10px 5px',
        },
        textContainer: {
            padding: '3px',
            advantage: { fontWeight: 600, fontSize: '17px', padding: '2px' },
            explanation: { padding: '10px 0px 10px 0px ', fontWeight: 600, fontSize: '15px', padding: '2px' },
        },
    }

    /**
     * @brief A UI component that displays an overview point with an icon, advantage, and explanation.
     *
     * @param {React.ReactElement} icon - The icon to display alongside the advantage and explanation.
     * @param {string} advantage - A short description of the advantages offered by the property
     * @param {string} explanation - An explanation for the advantage offered
     * @returns {React.ReactElement} A React element representing one of overview points.
     *
     * @example 
     * <OverviewPoint
     *    icon={<MyIcon />}
     *    advantage="Cheap Security Deposit"
     *    explanation="This property's security deposit is 60% cheaper than similar properties!"
     * />
     */
    const OverviewPoint = ({ icon, advantage, explanation }) => {
        return (<div style={overviewStyles.overviewContainer}>
            {icon}
            <div style={overviewStyles.textContainer}>
                <Typography color="text.primary" variant="h5" sx={overviewStyles.textContainer.advantage} >
                    {advantage}
                </Typography>
                <Typography color="text.secondary" variant="h5" sx={overviewStyles.textContainer.explanation} >
                    {explanation}
                </Typography>
            </div>
        </div>)
    }

    return (
        <div style={overviewStyles.container}>
            <Typography color="text.primary" variant="h5" sx={overviewStyles.title}>
                Overview
            </Typography>
            <OverviewPoint icon={<MdVilla size={30} />} advantage="Room In Villa" explanation={"Your own room in a home, plus access to shared spaces"} />
            <OverviewPoint icon={<IoBedSharp size={30} />} advantage="Private rooms for rent" explanation={"You can rent one of the bedrooms in the shared home"} />
            <OverviewPoint icon={<AiFillDollarCircle size={30} />} advantage="Pro-Rated" explanation={"You will not be charged a full monthly cost, if you book partial months"} />
        </div>
    )
}

/**
 * @brief A functional UI component that displays information on the property
 * 
 * @details 
    * How Property is structured
        * 1. Property Management Avatar
        * 2. Property Management Name 
        * 3. Property Management Address
        * 4. Property Management Phone Number
        * 5. Property Description
 * @param {object} data stores listing info that will be used to populate the listing details page
 * @returns {React.ReactElement} a react element that contains information on the property management team and description of the property itself 
 */
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
    const [overviewLength, setOverviewLength] = useState(maxCharacterLength)
    //state management for checking if the character count is over the limit
    const [overflow, setOverflow] = useState(false)
    //State management for viewing more or less of the property description
    const [viewMore, setViewMore] = useState(false)
    //state management for text overflow elipsis
    const [textOverflowElipsis, setTextOverflowElipsis] = useState("...")

    /**
     * @brief //Used on initial render to determine if view more functionality is needed
     * 
     * @details
        * logical Flow
            * 1. if the listing details is less than a certain character length then the textoverflow ellipsis isn't needed and the text isn't considered to be overflowing
            * 2. else if listing details is more than a certain character length then the textoverflow ellipsis is added, the text is considered to be overflowing and the character length allotted is increased
     * @see setOverflow true / false overflow
     * @see textOverflowElipsis true / false text overflow elipsis
     * @see overViewLength number of characters seen
     */
    const InitialViewMore = () => {
        if (data.listing_details.overview.length <= maxCharacterLength) {
            setOverflow(false)
            return (data.listing_details.overview)
        } else if (data.listing_details.overview.length > maxCharacterLength) {
            setOverflow(true)
            return (data.listing_details.overview.substring(0, overviewLength) + textOverflowElipsis)
        }
    }

    /**
     * @brief This event handler uses the setSaveListing hook to toggle the saveListing state between true and false.
     * 
     * @details If setViewMore is currently false then set to true and vice versa
     * @see setViewMore View More / View Less state 
     */
    const handleViewMore = () => {
        setViewMore(!viewMore)
    }

    //useEffect hook for Changing character limit and showing textoverflow elipsis depending on view more state
    useEffect(() => {
        if (viewMore) {
            setOverviewLength(data.listing_details.overview.length)
            setTextOverflowElipsis("")
        } else if (!viewMore) {
            setOverviewLength(300)
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

/**
 * @brief This functional UI component returns the ammenities offered by the property 
 * 
 * @returns {React.ReactElement} a react element that contains the key ammenities found on the property 
 */
function Ammenities() {

    const ammenitiesStyles = {
        title: { marginTop: '20px', padding: '10px 0px 10px 0px ', fontWeight: 600, },
        container: { display: 'flex', justifyContent: 'space-between', width: '100%' },
        column: { width: '100%', margin: '10px 0px 10px 0px', flexFlow: 'column wrap', height: '130px', display: 'flex', justifyContent: 'flex-start' },
        ammenityContainer: {
            display: 'flex', flexDirection: 'row', padding: '10px 5px 10px 5px',
            ammenity: { fontWeight: 600, fontSize: '17px', margin: '0px 10px 0px 10px' }
        },
        viewAll: {
            borderBottom: '1px solid black', cursor: 'pointer'
        }
    }

    /**
     * @brief This functional UI component returns an ammenity offered by the property accompanies by an Icon 
     * 
     * @param {React.ReactElement} icon the icon that's used to complement ammenity listed
     * @param {string} ammenity an ammenity offered by the property
     * @returns {React.ReactElement} a react element that contains one the ammenities that's offered by the property with an icon of the ammenity
     */
    const Ammenity = ({ icon, ammenity }) => {
        return (
            <div style={ammenitiesStyles.ammenityContainer}>
                {icon}
                <Typography noWrap color="text.secondary" variant="h5" sx={ammenitiesStyles.ammenityContainer.ammenity} >
                    {ammenity}
                </Typography>
            </div>
        )
    }

    return (
        <>
            <Typography color="text.primary" variant="h5" sx={ammenitiesStyles.title}>
                Ammenities
            </Typography>
            <div style={ammenitiesStyles.container}>
                <div style={ammenitiesStyles.column}>
                    <Ammenity icon={<CgGym />} ammenity={"Gym"} />
                    <Ammenity icon={<FaSwimmingPool size={20} />} ammenity={"Pool"} />
                    <Ammenity icon={<TbElevator size={20} />} ammenity={"Elevator"} />
                </div>
                <div style={ammenitiesStyles.column}>
                    <Ammenity icon={<BiParty size={20} />} ammenity={"Party Room"} />
                    <Ammenity icon={<IoMdBasketball size={20} />} ammenity={"Games Room"} />
                    <Ammenity icon={<RiParkingBoxLine size={20} />} ammenity={"Parking"} />
                </div>
            </div>
            <Typography color="text.secondary" sx={ammenitiesStyles.viewAll}>View All</Typography>
        </>
    )
}


/**
 * @brief This functional UI component returns the policies imposed by the property managers
 * 
 * @returns {React.ReactElement} a react element that contains the policies set by the property managers
 */
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

    /**
     * @brief A UI component that displays a single policy as a bullet point.
     *
     * @param {string} policy - The policy to display as a bullet point.
     * @returns {React.ReactElement} A React element representing one of the policies.
     *
     * @example 
     * <Policy policy="No smoking on or around the premise" />
     */
    const Policy = ({ policy }) => {
        return (
            <div style={policiesStyles.policyContainer}>
                <MdCircle style={policiesStyles.policyContainer.bulletPoint} />
                <Typography color="text.secondary" variant="h5" sx={policiesStyles.policyContainer.policy} >
                    {policy}
                </Typography>
            </div>
        )
    }

    return (

        <div style={policiesStyles.container}>
            <Typography color="text.primary" variant="h5" sx={policiesStyles.title}>
                Policies
            </Typography>
            <Policy policy="Subletting isn't permitted" />
            <Policy policy="Pets are allowed" />
            <Policy policy="No smoking on or around the premise" />
            <Policy policy="Must inform landlord prior to bringing guests" />
        </div>
    )
}

/**
 * @brief This functional UI component contains key details about all units and individual units as well
 * @details
    * Structure of this UI component
        * 1. Price Range of the units 
        * 2. Sqft Range of the units 
        * 3. Individual Unit details
 * @param {object} data stores listing info that will be used to populate the listing details page
 * @returns {React.ReactElement} a react element that contains price and sqft range of all units and contains details of individual units within the property
 */
function UnitCard({ data }) {

    const unitCardStyles = {
        cardContainer: { width: '85%', padding: '30px', borderRadius: '10px', margin: '20px' },
        priceRange: { padding: '5px', fontWeight: 600 },
        sqftRange: { padding: '5px', fontWeight: 600 },
    }

    /**
     * @brief This functional UI component contains key details about individual units
     * @details
        * Structure of this UI component
            * 1. Interior floorplan layout diagram
            * 2. Unit Number
            * 3. Unit Type
            * 4. Unit Price
            * 5. Number of Beds
            * 6. Number of Baths
            * 7. Square Footage
            * 8. Date Available
            * 
     * @param {object} unitData stores unit info
     * @returns {React.ReactElement} a react element that contains information on the individual units in a propertyj
     */
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




import { useEffect, useState } from "react"
import { Avatar, Card, CardMedia, CardContent, Typography, CardActionArea, Divider, IconButton } from "@mui/material"
import { ActionButton } from "./Utils/Form"
import { Link, useLocation } from "react-router-dom"
import Navbar from "./Navbar";
import { BsFillBookmarksFill, BsBookmarks } from "react-icons/bs";
import { IoShareSocialOutline, IoShareSocial, IoBedSharp } from "react-icons/io5";
import { MdCircle, MdVilla } from "react-icons/md";
import { AiFillDollarCircle, AiFillFire, AiOutlineFire } from "react-icons/ai";
import { FaSwimmingPool } from "react-icons/fa";
import { CgGym } from "react-icons/cg";
import { TbAirConditioning, TbElevator } from "react-icons/tb";
import { RiParkingBoxLine } from "react-icons/ri";
import { IoMdBaseball, IoMdBasketball } from "react-icons/io";
import { BiParty } from "react-icons/bi";

function ListingDetails() {

    const { state } = useLocation();
    const data = state

    const maxCharacterLength = 300
    //state management for how many characters of the overview is seen at any given time
    const [overViewLength, setOverViewLength] = useState(maxCharacterLength)
    //View more / View Less State
    const [viewMore, setViewMore] = useState(false)
    //state management for checking if the character count is over the limit
    const [overflow, setOverflow] = useState(false)
    //state management for text overflow elipsis
    const [textOverflowElipsis, setTextOverflowElipsis] = useState("...")
    //state management for saving listings
    const [saveListing, setSaveListing] = useState(false)
    //state management for sharing listings
    const [shareListing, setShareListing] = useState(false)

    const UnitDetails = () => {
        return (
            <>

                <CardContent sx={{ display: 'flex', flexDirection: 'row', height: '100px', justifyContent: 'space-around', width: '100%', padding: '0px 20px 0px 20px' }}>
                    <Typography color="text.primary" sx={{ margin: '5px', fontSize: '17px', fontWeight: '600' }}>Unit</Typography>
                    <Divider orientation="vertical" />
                    <Typography color="text.primary" sx={{ margin: '5px', fontSize: '17px', fontWeight: '600' }}>Price</Typography>
                    <Divider orientation="vertical" />
                    <Typography color="text.primary" sx={{ margin: '5px', fontSize: '17px', fontWeight: '600' }}>Date Available</Typography>
                </CardContent>
                <CardContent sx={{ display: 'flex', flexDirection: 'row', height: '100px', justifyContent: 'space-around', width: '100%', padding: '0px 20px 0px 20px' }}>
                    <Typography sx={{ margin: '5px', display: 'flex', justifyContent: 'left', width: '100%' }}>Unit 405</Typography>
                    <Typography sx={{ margin: '5px', display: 'flex', justifyContent: 'left', width: '100%' }}>$2600</Typography>
                    <Typography sx={{ margin: '5px', display: 'flex', justifyContent: 'left', width: '100%' }}>June 10 2023</Typography>
                </CardContent>
                <CardContent sx={{ display: 'flex', flexDirection: 'row', height: '100px', justifyContent: 'space-around', width: '100%', padding: '0px 20px 0px 20px' }}>
                    <Typography sx={{ margin: '5px', display: 'flex', justifyContent: 'left', width: '100%' }}>Unit 406</Typography>
                    <Typography sx={{ margin: '5px', display: 'flex', justifyContent: 'left', width: '100%' }}>$2800</Typography>
                    <Typography sx={{ margin: '5px', display: 'flex', justifyContent: 'left', width: '100%' }}>June 21 2023</Typography>
                </CardContent>
                <CardContent sx={{ display: 'flex', flexDirection: 'row', height: '100px', justifyContent: 'space-around', width: '100%', padding: '0px 20px 0px 20px' }}>
                    <Typography sx={{ margin: '5px', display: 'flex', justifyContent: 'left', width: '100%' }}>Unit 407</Typography>
                    <Typography sx={{ margin: '5px', display: 'flex', justifyContent: 'left', width: '100%' }}>$2620</Typography>
                    <Typography sx={{ margin: '5px', display: 'flex', justifyContent: 'left', width: '100%' }}>June 21 2023</Typography>
                </CardContent>
            </>
        )
    }

    //UI component for units in the property
    const Unit = ({ unitData }) => {
        const [unitDetails, setUnitDetails] = useState(false)

        const handleShowUnitDetails = () => {
            setUnitDetails(!unitDetails)
        }


        return (
            <>
                <CardActionArea sx={{ borderRadius: '10px', padding: '10px', width: '100%', display: 'flex', justifyContent: 'flex-start' }} onClick={handleShowUnitDetails}>
                    <CardMedia sx={{ width: "30%", height: '100%', borderRadius: '5%' }} component="img" image={unitData.interiorLayoutImage}></CardMedia>
                    <CardContent sx={{ width: '70%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: '100px', padding: '0px 10px 0px 10px !important' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                            <Typography color="text.secondary" sx={{ fontWeight: 600, paddingRight: '2px', fontSize: '18px' }}>
                                {unitData.title}
                            </Typography>
                            <Typography color="text.secondary" sx={{ fontWeight: 600, paddingLeft: '2px' }}>
                                {unitData.type}
                            </Typography>
                        </div>
                        <Typography color="text.primary" variant="h4" sx={{ fontWeight: 600, fontSize: '20px' }}>
                            {`$${unitData.price}`}
                        </Typography>
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
                {unitDetails ? <UnitDetails /> : ""}
                <div style={{ width: '100%', padding: '10px' }}>
                    <Divider sx={{ width: '100%' }} />
                </div>
            </>
        )
    }

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
        <>
            <Navbar />
            <div style={{ height: '9vh' }} />
            <div style={{ display: 'flex', alignItems: 'center', width: '100%', flexDirection: 'column', padding: '20px' }}>
                <div style={{ minWidth: '1000px', maxWidth: '60%' }}>

                    <CardContent sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', padding: '0px 20px 0px 20px' }}>
                        <Typography color="text.primary" variant="h4" sx={{ padding: '20px 0px 0px 0px', fontWeight: 800, }}>
                            {data.listing_details.developerName}
                        </Typography>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <Typography color="text.secondary" variant="h5" sx={{ padding: '5px' }}>
                                {data.listing_details.address}
                            </Typography>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <IconButton onClick={handleShareListing}>
                                    {shareListing ? <IoShareSocial /> : <IoShareSocialOutline />}
                                </IconButton>
                                <Typography color="text.primary" variant="h6" sx={{ padding: '0px 5px 0px 5px', fontSize: '15px' }}>
                                    Share
                                </Typography>
                                <IconButton onClick={handleSaveListing}>
                                    {saveListing ? <BsFillBookmarksFill /> : <BsBookmarks />}
                                </IconButton>
                                <Typography color="text.primary" variant="h6" sx={{ padding: '0px 5px 0px 5px', fontSize: '15px' }}>
                                    Save
                                </Typography>
                            </div>
                        </div>
                    </CardContent >
                    <div style={{ display: 'flex', justifyContent: 'center', height: '100%', }}>
                        <CardContent style={{ display: 'flex', width: '100%', flexDirection: 'row', margin: '20px', borderRadius: '2%', padding: '0%', overflow: 'hidden' }}>
                            <CardActionArea sx={{ flex: 2 }}>
                                <CardMedia component="img" image={data.listing_img[0]} />
                            </CardActionArea>
                            <div style={{ display: 'flex', flexFlow: "column wrap", flex: 1, marginLeft: '10px', }}>
                                {data.listing_img.slice(1).map((image) => (
                                    <CardActionArea sx={{ margin: '5px', }}>
                                        <CardMedia component="img" image={image} />
                                    </CardActionArea>
                                ))}
                            </div>
                        </CardContent>

                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div style={{ margin: '10px', padding: '10px', width: '50%', display: 'flex', alignItems: 'flex-start', flexDirection: 'column', }}>
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




                            <div style={{ margin: '20px 0px 20px 0px' }}>
                                <Typography color="text.primary" variant="h5" sx={{ padding: '10px 0px 10px 0px ', fontWeight: 600, }} >
                                    Property
                                </Typography>
                                <Typography color="text.secondary" sx={{ padding: '5px' }}>

                                    <CardContent sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', margin: '10px 0px 10px 0px', padding: '10px 0px 10px 0px !important' }}>
                                        <Avatar sx={{ width: '65px', height: '65px', margin: '0px 20px 0px 10px' }} src={'https://thumbs.dreamstime.com/b/b-letter-boutique-logo-design-159417325.jpg'} />
                                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                            <Typography color="text.primary" variant="h6" sx={{ fontWeight: 700, fontSize: '17px' }}>
                                                Marshalls Place
                                            </Typography>
                                            <Typography color="text.secondary" variant="h6" sx={{ fontWeight: 700, fontSize: '15px' }}>
                                                4753 Stewart Street Indianapolis
                                            </Typography>
                                            <Typography color="text.secondary" variant="h6" sx={{ fontWeight: 700, fontSize: '15px' }}>
                                                +1 (647) 451 4523
                                            </Typography>

                                        </div>
                                    </CardContent>

                                    <Overview />
                                </Typography>
                                {overflow
                                    ? <div style={{ width: '100%' }}>
                                        <Divider sx={{ color: "grey", cursor: 'pointer' }} onClick={handleViewMore}>{viewMore ? "View Less" : "View More"}</Divider>
                                    </div>
                                    : ""}
                            </div>


                            <Typography color="text.primary" variant="h5" sx={{ marginTop: '20px', padding: '10px 0px 10px 0px ', fontWeight: 600, }}>
                                Ammenities
                            </Typography>
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                <div style={{ width: '100%', margin: '10px 0px 10px 0px', flexFlow: 'column wrap', height: '130px', display: 'flex', justifyContent: 'flex-start' }}>
                                    <div style={{ display: 'flex', flexDirection: 'row', padding: '10px 5px 10px 5px' }}>
                                        <CgGym size={20} />
                                        <Typography noWrap color="text.secondary" variant="h5" sx={{ fontWeight: 600, fontSize: '17px', margin: '0px 10px 0px 10px' }} >
                                            Gym
                                        </Typography>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'row', padding: '10px 5px 10px 5px' }}>
                                        <FaSwimmingPool size={20} />
                                        <Typography noWrap color="text.secondary" variant="h5" sx={{ fontWeight: 600, fontSize: '17px', margin: '0px 10px 0px 10px' }} >
                                            Pool
                                        </Typography>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'row', padding: '10px 5px 10px 5px' }}>
                                        <TbElevator size={20} />
                                        <Typography noWrap color="text.secondary" variant="h5" sx={{ fontWeight: 600, fontSize: '17px', margin: '0px 10px 0px 10px' }} >
                                            Elevator
                                        </Typography>
                                    </div>
                                </div>
                                <div style={{ margin: '10px 0px 10px 0px', width: '100%', flexFlow: 'column wrap', height: '130px', display: 'flex', justifyContent: 'flex-start' }}>
                                    <div style={{ display: 'flex', flexDirection: 'row', padding: '10px 5px 10px 5px' }}>
                                        <BiParty size={20} />
                                        <Typography noWrap color="text.secondary" variant="h5" sx={{ fontWeight: 600, fontSize: '17px', margin: '0px 10px 0px 10px' }} >
                                            Party Room
                                        </Typography>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'row', padding: '10px 5px 10px 5px' }}>
                                        <IoMdBasketball size={20} />
                                        <Typography noWrap color="text.secondary" variant="h5" sx={{ fontWeight: 600, fontSize: '17px', margin: '0px 10px 0px 10px' }} >
                                            Games Room
                                        </Typography>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'row', padding: '10px 5px 10px 5px' }}>
                                        <RiParkingBoxLine size={20} />
                                        <Typography noWrap color="text.secondary" variant="h5" sx={{ fontWeight: 600, fontSize: '17px', margin: '0px 10px 0px 10px' }} >
                                            Parking
                                        </Typography>

                                    </div>
                                </div>
                            </div>
                            <Typography color="text.secondary" sx={{ borderBottom: '1px solid black', cursor: 'pointer' }}>View All</Typography>


                            <div style={{ margin: '20px 0px 20px 0px' }}>
                                <Typography color="text.primary" variant="h5" sx={{ marginTop: '20px', padding: '10px 0px 10px 0px', fontWeight: 600, }}>
                                    Policies
                                </Typography>
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <MdCircle style={{ margin: '10px' }} />
                                    <Typography color="text.primary" variant="h5" sx={{ fontWeight: 600, fontSize: '17px', padding: '2px' }} >
                                        Subletting Policy:
                                    </Typography>
                                    <Typography color="text.secondary" variant="h5" sx={{ fontWeight: 600, fontSize: '15px', padding: '2px' }} >
                                        Subletting isn't permitted
                                    </Typography>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <MdCircle style={{ margin: '10px' }} />
                                    <Typography color="text.primary" variant="h5" sx={{ fontWeight: 600, fontSize: '17px', padding: '2px' }} >
                                        Pet Policy:
                                    </Typography>
                                    <Typography color="text.secondary" variant="h5" sx={{ fontWeight: 600, fontSize: '15px', padding: '2px' }} >
                                        Pets are allowed
                                    </Typography>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <MdCircle style={{ margin: '10px' }} />
                                    <Typography color="text.primary" variant="h5" sx={{ fontWeight: 600, fontSize: '17px', padding: '2px' }} >
                                        Smoking Policy:
                                    </Typography>
                                    <Typography color="text.secondary" variant="h5" sx={{ fontWeight: 600, fontSize: '15px', padding: '2px' }} >
                                        No smoking on or around the premise
                                    </Typography>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <MdCircle style={{ margin: '10px' }} />
                                    <Typography color="text.primary" variant="h5" sx={{ fontWeight: 600, fontSize: '17px', padding: '2px' }} >
                                        Guest Policy:
                                    </Typography>
                                    <Typography color="text.secondary" variant="h5" sx={{ fontWeight: 600, fontSize: '15px', padding: '2px' }} >
                                        Must inform landlord prior to bringing guests
                                    </Typography>
                                </div>
                            </div>


                        </div>



                        <div style={{ width: '50%', display: 'flex', alignItems: 'flex-end', flexDirection: 'column', padding: '20px 0px 20px 0px' }}>
                            <Card sx={{ width: '85%', padding: '30px', borderRadius: '10px', margin: '20px' }} raised={true}>
                                <Typography color="text.primary" variant="h5" sx={{ padding: '5px', fontWeight: 600 }} >
                                    {`$${data.listing_details.priceRange[0]} - $${data.listing_details.priceRange[1]}`}
                                </Typography>
                                <Typography color="text.secondary" variant="h6" sx={{ padding: '5px', fontWeight: 600 }} >
                                    {`${data.listing_details.sqftRange[0]} Sqft - ${data.listing_details.sqftRange[1]} Sqft`}
                                </Typography>
                                {data.listing_details.units.map((unitData) => {
                                    return (<Unit unitData={unitData} />)
                                })}
                            </Card>
                        </div>
                    </div>
                </div >
            </div >
        </>
    )

}

export default ListingDetails 
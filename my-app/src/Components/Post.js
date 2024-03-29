import "./Post.css"
import {BsBookmarks} from 'react-icons/bs'
import {BsBookmarksFill} from 'react-icons/bs'
import {IoIosArrowDroprightCircle} from 'react-icons/io'
import {IoIosArrowDropleftCircle} from 'react-icons/io'
import {BsFillCircleFill} from 'react-icons/bs'
import Modal from "./Utils/Modal";
import {useState} from "react"
import {Typography} from "@mui/material"
import L2Details from "../Views/listings/l2Details"
import L1Details from "../Views/listings/l1Details"
import {Link} from "react-router-dom"

export function Bookmark() {

    const [fill, setFill] = useState(() => count()); //save button state (avoids being re-rendered every time it's called, only renders first time)

    function count(number = 1) {
        return (number++);

    }

    function handleSaveClick() {
        return setFill(() => fill + 1)

    }

    return (
        <label>
            <input type="check"
                   id="bookmark"
                   onClick={handleSaveClick}>
            </input>
            {fill % 2 === 0 ? <BsBookmarksFill size={20}/> : <BsBookmarks size={20}/>}
        </label>
    )
}


export default function Post(info) {


    const [image, setImage] = useState(0); //image scroll state
    const [viewDetails, setViewDetails] = useState(false); //image scroll state

    const handleForwardClick = () => {
        return setImage(count => (count + 1 === info.listing_img.length) ? 0 : count + 1)
    }

    const handleBackwardClick = () => {
        return setImage(count => (count - 1 === -1) ? info.listing_img.length - 1 : count - 1)
    }

    /*
    const handleViewDetails = () => {
      if (info.listing_details) {
        return setViewDetails(true)
      } else {
        return ""
      }
    }
    */


    return (
        <div className="listing">
            <div className="postBox">
                <div className="image">
                    <img src={info.listing_img[image]} alt="A Listing"/>
                    <div id="functionality">
                        <div id="save">
                            <Bookmark/>
                        </div>

                        <label id="back">
                            <button
                                id="backButton"
                                type="button"
                                onClick={handleBackwardClick}>
                            </button>
                            < IoIosArrowDropleftCircle size={30} color={"white"}/>
                        </label>
                        <label id="forward">
                            <button
                                id="forwardButton"
                                type="button"
                                onClick={handleForwardClick}>
                            </button>
                            <IoIosArrowDroprightCircle size={30} color={"white"}/>
                        </label>
                        <label className="slide">
                            {[...Array(info.listing_img.length)].map((slide, i) => {
                                return (
                                    <>
                                        {/* why doesn't this code work??????
                <input type="button"
                  value={i}
                  onCLick={() => setImage(i)} />
                */}
                                        < BsFillCircleFill
                                            className="dots"
                                            key={i}
                                            size={image === i ? 12 : 9}
                                            onClick={() => setImage(i)}
                                            color={image === i ? 'aqua' : 'white'}
                                        />
                                    </>
                                )
                            })}

                        </label>

                    </div>
                </div>
                <div className="keyInfo">
                    <div style={{padding: '10px'}}>
                        <Typography color="text.primary" variant="h4"
                                    style={{fontWeight: 600, fontSize: '30px',}}>${info.price}</Typography>
                        <Typography color="text.secondary" variant="h6">{info.address}</Typography>
                        <Typography color="text.primary" variant="h6"
                                    style={{fontSize: '17px'}}> Baths: {info.num_bathrooms} |
                            Beds: {info.num_bedrooms}</Typography>
                        <Typography color="text.primary" variant="h6"
                                    style={{fontSize: '17px'}}>Available: {info.date_available}</Typography>
                    </div>
                    <label id="message">
                        <Link to={"/l1Details"} state={info} style={{textDecoration: 'none', color: 'white'}}>
                            <button style={{display: "none"}}></button>
                            <h3>View Details</h3>
                        </Link>
                        {/*
            <Modal flexibleContainer open={viewDetails} onClose={() => setViewDetails(false)} content={<ListingViewer data={info} />} cardTitle={"Property Details"} />
            */}
                    </label>
                </div>
            </div>
            <div className="Amenities">
                {info.tags?.map((tag, i) => {
                    return (<Typography variant="h6" id="tags" key={i}>{tag}</Typography>);
                })
                }
            </div>
        </div>

    )
}
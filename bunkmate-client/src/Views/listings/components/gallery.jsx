import React, { useEffect, useState } from "react"
import { Card, CardMedia, CardContent, Typography, CardActionArea, Divider, IconButton } from "@mui/material"
import Modal from "../../../Components/Utils/Modal.jsx";
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";

/**
 * @function Gallery
 *
 * @brief A functional UI component that displays a photo gallery of the property used in both L1 and L2 listings
 *
 * @details The gallery displays the top 4 photos of gallery with the 1st photo taking up the most space
 * @param {object} data stores listing info that will be used to populate the listing details page
 * @param {string} orientation determines the orientation that the gallery will be displayed in (vertical or horizontal)
 * @returns {React.ReactElement} a react element that contains gallery photos of the property
 */
export default function Gallery({ data, orientation }) {

    //style used in L1 listings
    const galleryHorizontalStyles = {
        container: {
            display: 'flex', justifyContent: 'center', height: '100%',
            innerContainer: {
                display: 'flex',
                width: '100%',
                flexDirection: 'row',
                margin: '20px',
                borderRadius: '10px',
                padding: '0%',
                overflow: 'hidden',
                maxHeight: '65vh'
            },
        },
        smallImagesContainer: {
            display: 'flex',
            flexFlow: "column nowrap",
            flex: 1,
            marginLeft: '10px',
            maxHeight: '100%',
            overflow: 'scroll',
            justifyContent: 'space-between'
        },
        largeImage: { flex: 2.5, },
        smallImage: { marginBottom: '10px', },

    }

    //style used in L2 listings
    const galleryVerticalStyles = {
        container: {
            display: 'flex', justifyContent: 'center', height: '100%', width: '65%',
            innerContainer: {
                display: 'flex',
                width: '100%',
                borderRadius: '10px',
                flexDirection: 'column',
                padding: '0%',
                overflow: 'scroll',
            },
        },
        smallImagesContainer: {
            display: 'flex',
            flexFlow: "row wrap",
            justifyContent: 'space-between',
            marginTop: '10px'
        },
        largeImage: {},
        smallImage: { maxWidth: '49%', marginBottom: '15px' },
    }

    //Define the state variable for managing which style is displayed
    const [galleryStyles, setGalleryStyles] = useState(galleryHorizontalStyles)
    //Define the state variable for managing the open and close state for viewing the gallery (modal window)
    const [viewGallery, setViewGallery] = useState(false)
    //Define the state variable for managing the indexed photo within the ModalGalleryViewer
    const [galleryIndex, setGalleryIndex] = useState(0)

    //useEffect hook used on initial render to determine the style of the gallery
    useEffect(() => {
        if (orientation === "horizontal") {
            setGalleryStyles(galleryHorizontalStyles)
        } else if (orientation === "vertical") {
            setGalleryStyles(galleryVerticalStyles)
        }
    }, [])

    /**
     * @brief event handler for opening the photo gallery
     * @param {number} index the index of the image retrieved from storage
     * @details
     * - How viewGallery is handled
     * - if viewGallery is false then set to true
     * - How galleryIndex is handled
     * - if user clicks on an image galleryIndex is set to that index
     * - if user clicks the forward and backward navigation buttons then index is increased and decreased respectively
     * - cyclic gallery viewer
     * @see setGalleryIndex sets galleryIndex to a certain index depending on situation
     * @see setViewGallery sets viewGallery to true
     */
    const handleOpenGallery = (index) => {
        setGalleryIndex(index + 1)
        setViewGallery(true)
    }

    /**
     * @brief event handler for opening the photo gallery
     *
     * @details if viewGallery is false then set to true
     * @see setViewGallery sets viewGallery to true
     */
    const handleCloseGallery = () => {
        setViewGallery(false)
    }


    return (
        <div style={galleryStyles.container}>
            <CardContent style={galleryStyles.container.innerContainer}>
                <CardActionArea sx={galleryStyles.largeImage} onClick={() => handleOpenGallery(-1)}>
                    <CardMedia component="img" image={data.listing_img[0]} />
                </CardActionArea>
                <div style={galleryStyles.smallImagesContainer}>
                    {data.listing_img.slice(1).map((image, index) => (
                        <CardActionArea sx={galleryStyles.smallImage} onClick={() => handleOpenGallery(index)}>
                            <CardMedia component="img" image={image} />
                        </CardActionArea>
                    ))}
                </div>
            </CardContent>
            <Modal
                flexibleContainer
                open={viewGallery}
                onClose={handleCloseGallery}
                content={<ModalGalleryViewer data={data} galleryIndex={galleryIndex}
                    setGalleryIndex={setGalleryIndex} />}
                cardTitle={"Photo Gallery"}
            />
        </div>
    )
}

/**
 * @brief This functional UI component showcases to the end user a slideshow gallery of labelled property photos in a modal window
 *
 * @details How the modal gallery viewer is structured
 * 1. Gallery of photos
 * 2. forward and backward navigation buttons
 * 3. Information on the picture:
 * - The current image
 * - How many images are left
 * - label (What part of the unit the picture is from)
 * @returns {React.ReactElement} a react element that contains the index of the photo and the photo's label
 */
export function ModalGalleryViewer({ data, galleryIndex, setGalleryIndex }) {

    const modalGalleryViewerStyles = {
        bodyContainer: { display: 'flex', alignItems: 'center', flexDirection: 'column' },
        backwardButton: { display: 'flex', position: 'absolute', top: '50%', left: '0px' },
        forwardButton: { display: 'flex', position: 'absolute', top: '50%', right: '0px' },
        photographContainer: { display: 'flex', flexDirection: 'row', width: '100%', height: '70vh' },
        photograph: { borderRadius: '10px', margin: '10px', height: '70vh', },
    }


    /**
     * @brief This functional UI component showcases to the end user the index of the photo within the gallery and the label of the photo as well
     *
     * @details This card component is located at the bottom of the modal gallery viewer
     * @returns {React.ReactElement} a react element that contains the index of the photo and the photo's label
     */
    const ImageInfo = () => {
        const imageInfoStyles = {
            infoContainer: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                padding: '10px',
                borderRadius: '10px'
            },
            divider: { height: '25px', margin: '10px' },
        }
        return (
            <Card raised sx={imageInfoStyles.infoContainer}>
                <Typography color="text.primar" variant="h6" sx={{ fontWeight: '550' }}>
                    {data.listing_img_labels[galleryIndex]}
                </Typography>
                <Divider orientation="vertical" sx={imageInfoStyles.divider} />
                <Typography color="text.secondary" variant="h6">
                    {`${galleryIndex + 1} / ${data.listing_img.length}`}
                </Typography>
            </Card>
        )
    }


    /**
     * @brief This functional UI component showcases to the end user the index of the photo within the gallery and the label of the photo as well
     *
     * @details
     * - How Slideshow is structured
     * - Forward and backward navigation buttons
     * - Currently Selected Image
     * @returns {React.ReactElement} a react element that contains navigation buttons and the currently selected image
     */
    const SlideShow = () => {

        /**
         * @brief event handler for viewing the next image in the gallery
         *
         * @details increases gallery index by 1, if galleryIndex has reached the length of the gallery array then set to 0 else continue to add 1
         * @see setGalleryIndex sets galleryIndex to add one to old index
         */
        const handleForwardClick = () => {
            setGalleryIndex(galleryIndex + 1 === data.listing_img.length ? 0 : galleryIndex + 1)
        }

        /**
         * @brief event handler for viewing the previous image in the gallery
         *
         * @details decreases gallery index by 1, if galleryIndex has reached the beginning of the gallery then set to the length of the gallery array
         * @see setGalleryIndex sets galleryIndex to subtract one from old index
         */
        const handleBackwardClick = () => {
            setGalleryIndex(galleryIndex - 1 === -1 ? data.listing_img.length - 1 : galleryIndex - 1)
        }


        //This useEffect hook allows the arrow keys to be used to navigate the images
        useEffect(() => {
            function handleKeyDown(event) {
                if (event.key === 'ArrowLeft') {
                    setGalleryIndex(galleryIndex - 1 === -1 ? data.listing_img.length - 1 : galleryIndex - 1)
                } else if (event.key === 'ArrowRight') {
                    setGalleryIndex(galleryIndex + 1 === data.listing_img.length ? 0 : galleryIndex + 1)
                }
            }

            window.addEventListener('keydown', handleKeyDown);
            return () => {
                window.removeEventListener('keydown', handleKeyDown);
            };
        }, [galleryIndex]);

        return (
            <>
                <IconButton onClick={handleBackwardClick} sx={modalGalleryViewerStyles.backwardButton}>
                    <IoIosArrowDropleftCircle size={30} colkor={"black"} />
                </IconButton>
                <CardContent sx={modalGalleryViewerStyles.photographContainer}>
                    <CardMedia component="img" src={data.listing_img[galleryIndex]}
                        sx={modalGalleryViewerStyles.photograph} />
                </CardContent>
                <IconButton onClick={handleForwardClick} sx={modalGalleryViewerStyles.forwardButton}>
                    <IoIosArrowDroprightCircle size={30} color={"black"} />
                </IconButton>
            </>
        )
    }

    return (
        <div style={modalGalleryViewerStyles.bodyContainer}>
            <SlideShow />
            <ImageInfo />
        </div>
    )
}

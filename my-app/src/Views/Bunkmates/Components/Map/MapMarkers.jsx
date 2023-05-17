import { useState } from "react";
import { Typography, useScrollTrigger } from "@mui/material";
import { RiMapPin5Fill } from 'react-icons/ri'
import { FaGraduationCap } from 'react-icons/fa'
import { IconButton } from "@mui/material";

export function MapRequestMarker(props) {
    //if the user requests as their selves the marker background will be black and the border will be aqua
    //if the user requests as a group the marker will be completely aqua
    return (
        props.request.request !== "As myself" ?
            <div style={{ display: "flex", flexDirection: "row", zIndex: '2' }} onClick={e => { props.handleClick(e, props.index); e.stopPropagation() }} id={props.request?.user}>
                <img style={{ zIndex: '2', right: '7px', top: '-2.6px', position: 'absolute', width: '45px', height: '45px', border: '3px solid #2ACDDD', objectFit: "cover", borderRadius: "50%" }} src={props.request?.profile[0]?.picture} />
                <Typography style={{ minWidth: '90px', position: 'absolute', right: '-68px', display: "flex", height: "40px", padding: "10px", fontWeight: '500', color: "white", backgroundColor: '#2ACDDD', justifyContent: "center", alignItems: 'center', fontSize: "17.5px", borderRadius: "5px", cursor: "hover" }}>
                    {`$${props.request.rentBudget}`}
                </Typography>
                {props.icon}
            </div> :
            <div style={{ display: "flex", flexDirection: "row", zIndex: '2' }} onClick={e => { props.handleClick(e, props.index); e.stopPropagation() }} id={props.request?.user}>
                <img style={{ zIndex: '2', right: '7px', top: '-2.6px', position: 'absolute', width: '45px', height: '45px', border: '3px solid aqua', objectFit: "cover", borderRadius: "50%" }} src={props.request?.profile[0]?.picture} />
                <Typography style={{ minWidth: '90px', position: 'absolute', right: '-68px', display: "flex", height: "40px", padding: "10px", fontWeight: '500', color: "aqua", backgroundColor: 'black', border: '3px solid aqua', justifyContent: "center", alignItems: 'center', fontSize: "17.5px", borderRadius: "5px", cursor: "hover" }} variant="h6" color="text.secondary">
                    {`$${props.request.rentBudget}`}
                </Typography>
                {props.icon}
            </div >
    )
}

export function MapEducationMarker({ onMouseEnter, onMouseLeave }) {

    //controls the color state of the icons
    const [gradCapColor, setGradCapColor] = useState('white')
    const [mapPinColor, setMapPinColor] = useState('#24AEC0')

    return (
        <IconButton sx={{ color: "grey" }}
            onMouseEnter={() => { onMouseEnter(); setGradCapColor('#24AEC0'); setMapPinColor('white') }}
            onMouseLeave={() => { setGradCapColor('white'); setMapPinColor('#24AEC0') }}
        >
            <FaGraduationCap color={gradCapColor} size="17" style={{ position: 'absolute', right: '16px', bottom: '18.5px' }} />
            <RiMapPin5Fill color={mapPinColor} size="35" />
        </IconButton>
    )
}
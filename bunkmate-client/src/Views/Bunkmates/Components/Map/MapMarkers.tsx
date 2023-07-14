import React from "react";
import {Typography} from "@mui/material";
import {Request} from 'MapTypes'

interface MapRequestMarkerProps {
    request: Request
    handleClick: Function
    index: number
    icon: React.ReactNode
}

/**
 * @brief Markers displayed on the map
 *
 * @param {MapRequestMarkerProps} props - the props object
 */
export const MapRequestMarker = (props: MapRequestMarkerProps): React.ReactElement => {
    //if the user requests as their selves the marker background will be black and the border will be aqua
    //if the user requests as a group the marker will be completely aqua
    return (
        props.request.request !== "As myself" ?
            <div style={{display: "flex", flexDirection: "row", zIndex: '2'}} onClick={e => {
                props.handleClick(e, props.index);
                e.stopPropagation()
            }} id={props.request?.user}>
                <img alt="User's profile picture" style={{
                    zIndex: '2',
                    right: '7px',
                    top: '-2.6px',
                    position: 'absolute',
                    width: '45px',
                    height: '45px',
                    border: '3px solid #2ACDDD',
                    objectFit: "cover",
                    borderRadius: "50%"
                }} src={props.request?.profile[0]?.picture}/>
                <Typography style={{
                    minWidth: '90px',
                    position: 'absolute',
                    right: '-68px',
                    display: "flex",
                    height: "40px",
                    padding: "10px",
                    fontWeight: '500',
                    color: "white",
                    backgroundColor: '#2ACDDD',
                    justifyContent: "center",
                    alignItems: 'center',
                    fontSize: "17.5px",
                    borderRadius: "5px",
                    cursor: "hover"
                }}>
                    {`$${props.request.rentBudget}`}
                </Typography>
                {props.icon}
            </div> :
            <div style={{display: "flex", flexDirection: "row", zIndex: '2'}} onClick={e => {
                props.handleClick(e, props.index);
                e.stopPropagation()
            }} id={props.request?.user}>
                <img style={{
                    zIndex: '2',
                    right: '7px',
                    top: '-2.6px',
                    position: 'absolute',
                    width: '45px',
                    height: '45px',
                    border: '3px solid aqua',
                    objectFit: "cover",
                    borderRadius: "50%"
                }}
                     alt={"User's profile picture"}
                     src={props.request?.profile[0]?.picture}/>
                <Typography style={{
                    minWidth: '90px',
                    position: 'absolute',
                    right: '-68px',
                    display: "flex",
                    height: "40px",
                    padding: "10px",
                    fontWeight: '500',
                    color: "aqua",
                    backgroundColor: 'black',
                    border: '3px solid aqua',
                    justifyContent: "center",
                    alignItems: 'center',
                    fontSize: "17.5px",
                    borderRadius: "5px",
                    cursor: "hover"
                }} variant="h6" color="text.secondary">
                    {`$${props.request.rentBudget}`}
                </Typography>
                {props.icon}
            </div>
    )
}

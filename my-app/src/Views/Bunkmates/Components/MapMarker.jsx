function MapMarker(props) {
    //if the user requests as their selves the marker background will be black and the border will be aqua
    //if the user requests as a group the marker will be completely aqua
    return (
        props.request.request !== "As myself" ?
            <div style={{ display: "flex", flexDirection: "row", }} onClick={e => { props.handleClick(e, props.index); e.stopPropagation() }} id={props.request?.user}>
                <img style={{ zIndex: '2', right: '7px', top: '-2.6px', position: 'absolute', width: '45px', height: '45px', border: '3px solid #2ACDDD', objectFit: "cover", borderRadius: "50%" }} src={props.request?.profile[0]?.picture} />
                <span style={{ minWidth: '90px', position: 'absolute', right: '-65px', display: "flex", height: "40px", padding: "10px", fontWeight: '500', color: "white", backgroundColor: '#2ACDDD', justifyContent: "center", alignItems: 'center', fontSize: "15px", borderRadius: "5px", cursor: "hover" }} >
                    {`$${props.request.rentBudget}`}
                </span>
                {props.icon}
            </div> :
            <div style={{ display: "flex", flexDirection: "row", }} onClick={e => { props.handleClick(e, props.index); e.stopPropagation() }} id={props.request?.user}>
                <img style={{ zIndex: '2', right: '7px', top: '-2.6px', position: 'absolute', width: '45px', height: '45px', border: '3px solid aqua', objectFit: "cover", borderRadius: "50%" }} src={props.request?.profile[0]?.picture} />
                <span style={{ minWidth: '90px', position: 'absolute', right: '-65px', display: "flex", height: "40px", padding: "10px", fontWeight: '500', color: "aqua", backgroundColor: 'black', border: '3px solid aqua', justifyContent: "center", alignItems: 'center', fontSize: "15px", borderRadius: "5px", cursor: "hover" }} >
                    {`$${props.request.rentBudget}`}
                </span>
                {props.icon}
            </div>
    )
}
export default MapMarker
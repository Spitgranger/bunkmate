import React from "react"
import { Typography } from "@mui/material"
import { IoBedSharp } from "react-icons/io5";
import { MdVilla } from "react-icons/md";
import { AiFillDollarCircle, } from "react-icons/ai";
import { BsPeopleFill } from "react-icons/bs";

/**
 * @function Overview
 *
 * @brief A functional UI component that displays an overview section with multiple overview points and takes no props.
 * 
 * @returns {React.ReactElement} A React element representing the overview section UI component.
 */
export default function Overview() {

    const overviewStyles = {
        container: { margin: '20px 0px 20px 0px' },
        title: { padding: '10px 0px 10px 0px ', fontWeight: 600, },
    }

    return (
        <div style={overviewStyles.container}>
            <Typography color="text.primary" variant="h5" sx={overviewStyles.title}>
                Overview
            </Typography>
            <OverviewPoint
                icon={<MdVilla size={30} />}
                advantage="Room In Villa"
                explanation={"Your own room in a home, plus access to shared spaces"} />
            <OverviewPoint
                icon={<IoBedSharp size={30} />}
                advantage="Private rooms for rent"
                explanation={"You can rent one of the bedrooms in the shared home"} />
            <OverviewPoint
                icon={<BsPeopleFill size={30} />}
                advantage="Roommates Allowed"
                explanation={"This Landlord allows you to invite your own roommates"} />
        </div>
    )
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
export function OverviewPoint({ icon, advantage, explanation }) {

    const overviewPointStyles = {
        overviewContainer: {
            display: 'flex', flexDirection: 'row', padding: '10px 5px 10px 5px',
        },
        text: {
            container: { padding: '0px 10px 0px 10px' },
            advantage: { fontWeight: 600, fontSize: '17px', padding: '2px' },
            explanation: { padding: '10px 0px 10px 0px ', fontWeight: 600, fontSize: '15px' }
        }
    }

    return (
        <div style={overviewPointStyles.overviewContainer}>
            {icon}
            <div style={overviewPointStyles.text.container}>
                <Typography color="text.primary" variant="h5" sx={overviewPointStyles.text.advantage}>
                    {advantage}
                </Typography>
                <Typography color="text.secondary" variant="h5" sx={overviewPointStyles.text.explanation}>
                    {explanation}
                </Typography>
            </div>
        </div>
    )
}
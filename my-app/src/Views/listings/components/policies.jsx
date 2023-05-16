import React from "react"
import { Typography } from "@mui/material"
import { MdCircle } from "react-icons/md";
/**
 * @function Policies 
 * 
 * @brief This functional UI component returns the policies imposed by the property managers
 * 
 * @returns {React.ReactElement} a react element that contains the policies set by the property managers
 */
export default function Policies() {

    const policiesStyles = {
        container: { margin: '20px 0px 20px 0px' },
        title: { marginTop: '20px', padding: '10px 0px 10px 0px', fontWeight: 600, },
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
 * @brief A UI component that displays a single policy as a bullet point.
 *
 * @param {string} policy - The policy to display as a bullet point.
 * @returns {React.ReactElement} A React element representing one of the policies.
 *
 * @example 
 * <Policy policy="No smoking on or around the premise" />
 */
function Policy({ policy }) {

    const policyStyles = {
        policy: {
            container: {display: 'flex', flexDirection: 'row', alignItems: 'center'},
            bulletPoint: { margin: '10px', fontSize: '18px' },
            policyPoint: { fontWeight: 600, fontSize: '16px' },
        },
    }

    return (
        <div style={policyStyles.policy.container}>
            <MdCircle style={policyStyles.policy.bulletPoint} />
            <Typography color="text.secondary" variant="h5" sx={policyStyles.policy.policyPoint} >
                {policy}
            </Typography>
        </div>
    )
}


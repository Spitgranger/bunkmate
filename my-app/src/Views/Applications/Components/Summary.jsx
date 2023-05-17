import { CardContent, Typography, } from '@mui/material';
import Overview from "../../listings/components/overview";
import Policies from "../../listings/components/policies";
import UnitInfoCard from './UnitInfoCard';

/**
 * @brief A functional UI component that's reviews the details of the unit and is the first step in the application process 
 * 
 * @details 
 * - How Summary is structured 
    * Left Side: Overview, Policies (Perks offered by the unit and rules set by landlord)
    * Right Side: UnitInfoCard, (key details on the unit and a section for making last minute changes)
 * @returns {React.ReactElement} a react element that contains information on the unit as well as an interactive portion
 */
export default function Summary() {

    const summaryStyles = {
        container: { display: 'flex', justifyContent: 'center', padding: '3vh' },
        innerContainer: { display: 'flex', justifyContent: 'space-around', flexDirection: 'row' },
        leftSideContainer: { display: 'flex', flexDirection: 'column' },
        title: { fontWeight: 550 },
    }

    return (

        <div style={summaryStyles.container}>
            <CardContent sx={summaryStyles.innerContainer}>
                <div style={summaryStyles.leftSideContainer}>
                    <Typography variant="h4" color="text.secondary" sx={summaryStyles.title}>
                        Summary
                    </Typography>
                    <Overview />
                    <Policies />
                </div>
            </CardContent>
        </div >
    )
}
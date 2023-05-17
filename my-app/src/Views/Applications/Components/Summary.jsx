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

    return (

        <div style={{ display: 'flex', width: '100%', justifyContent: 'center', padding: '3vh' }}>
            <CardContent
                sx={{ display: 'flex', width: '65vw', justifyContent: 'space-around', flexDirection: 'row' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h4" color="text.secondary" sx={{ fontWeight: '550' }}>
                        Summary
                    </Typography>
                    <Overview />
                    <Policies />
                </div>
                <UnitInfoCard />
            </CardContent>
        </div >
    )
}
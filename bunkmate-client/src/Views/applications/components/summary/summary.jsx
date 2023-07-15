import {CardContent, Typography,} from '@mui/material';
import Overview from "../../../listings/components/overview";
import Policies from "../../../listings/components/policies";
import {ActionButton} from "../../../../Utils/form.tsx";
import {useSelector, useDispatch} from "react-redux";

/**
 * @function Summary
 *
 * @brief A functional UI component that's reviews the details of the unit and is the first step in the application process
 *
 * @details
 * - How Summary is structured
 * Left Side: Overview, Policies (Perks offered by the unit and rules set by landlord)
 * Right Side: UnitInfoCard, (key details on the unit and a section for making last minute changes)
 *  Can also display addBunkmatesCard and addPetsCard depending on the situation
 *  Continue Button: continue button will only be enabled if bunkmate count is 0 or unalloacted rent is 0
 * @returns {React.ReactElement} a react element that contains information on the unit as well as an interactive portion
 */
export default function Summary() {

    const summaryStyles = {
        container: {display: 'flex', justifyContent: 'center', padding: '3vh'},
        innerContainer: {display: 'flex', justifyContent: 'space-around', flexDirection: 'row'},
        leftSideContainer: {display: 'flex', flexDirection: 'column'},
        title: {fontWeight: 550},
    }

    //global state for managing enabled/disabled state of the continue button
    //will only be enabled if...
    // bunkmateCount is 0
    // or
    // all fields are filled out and unallocatedRent is 0
    const continueDisabled = useSelector(state => state.applications.continueDisabled);

    return (

        <div style={summaryStyles.container}>
            <CardContent sx={summaryStyles.innerContainer}>
                <div style={summaryStyles.leftSideContainer}>
                    <Typography variant="h4" color="text.secondary" sx={summaryStyles.title}>
                        Summary
                    </Typography>
                    <Overview/>
                    <Policies/>
                    <ActionButton
                        title={`Agree & Continue`}
                        disabled={continueDisabled}
                        helperText={continueDisabled ? "Please make sure the unallocated monthly rent is $0 and that all required fields are filled out" : null}
                    />
                </div>
            </CardContent>
        </div>
    )
}
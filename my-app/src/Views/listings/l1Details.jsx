import React from "react"
import {useLocation} from "react-router-dom"
import Overview from './components/overview'
import Gallery from './components/gallery'
import Property from './components/property'
import Amenities from './components/amenities'
import Policies from './components/policies'
import TopInfoBar from './components/topInfoBar'
import UnitCard from './components/unitCard'


/**
 * @function L1Details
 *
 * @brief Renders the L1Details component, which displays information about the highest level of a property listing (building).
 *
 * @details
 * How the page is organized
 * 1. Navbar
 * 2. TopInfoBar
 * 3. Gallery
 * 4. Overview
 * 5. Property
 * 6. Amenities
 * 7. Policies
 * 8. UnitCard
 * @returns {React.ReactElement} a react element that contains a wealth of information about the property
 */

export default function L1Details() {

    const pageStyles = {
        page: {display: 'flex', alignItems: 'center', width: '100%', flexDirection: 'column', padding: '20px'},
        top: {minWidth: '1200px', maxWidth: '60%'},
        body: {
            container: {display: 'flex', flexDirection: 'row',},
            leftSide: {
                margin: '10px',
                padding: '10px',
                width: '55%',
                display: 'flex',
                alignItems: 'flex-start',
                flexDirection: 'column',
            },
            rightSide: {
                width: '45%',
                display: 'flex',
                alignItems: 'flex-end',
                flexDirection: 'column',
                padding: '20px 0px 20px 0px'
            }
        }
    }


    const {state} = useLocation();
    const data = state

    return (
        <>
            <div style={{height: '9vh'}}/>
            <div style={pageStyles.page}>
                <div style={pageStyles.top}>
                    <TopInfoBar data={data}/>
                    <Gallery data={data} orientation={"horizontal"}/>
                    <div style={pageStyles.body.container}>
                        <div style={pageStyles.body.leftSide}>
                            <Overview/>
                            <Property data={data}/>
                            <Amenities/>
                            <Policies/>
                        </div>
                        <div style={pageStyles.body.rightSide}>
                            <UnitCard data={data}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

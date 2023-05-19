import './Applications.css';
import Navbar from '../../Components/Navbar';
import { useState } from 'react'
import Summary from './Components/Summary';
import UploadsForm from '../../Components/UploadsForm'
import UnitInfoCard from './Components/UnitInfoCard';

/**
 *
 * @brief
 *
 * @param {object} data
 * @param {number} index
 * @returns {JSX.Element}
 */
function Applications() {

    /* sets the subpage of the form that you're on also controls progress bar*/
    const [page, setpage] = useState(0);

    function handleContinueClick() {
        setpage(() => page + 1)
    }

    return (
        <>
            <div style={{ height: '9vh' }} />
            <Navbar />
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
                <Summary />
                <UnitInfoCard />
            </div>
        </>
    )
}

export default Applications;
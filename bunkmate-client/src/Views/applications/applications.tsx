import './styles/applications.css';
import {JSX, useEffect, useState} from 'react'
import Summary from './components/summary/summary';
import UnitInfoCard from './components/infoCards/unitInfoCard';
import {useLocation} from 'react-router';
import {useDispatch, useSelector} from 'react-redux';
import {setUnitIndex} from '../../features/applications/applicationsSlice';
import AddBunkmatesCard from './components/infoCards/addBunkmatesCard.jsx';
import AddPetsCard from './components/infoCards/addPetsCard';

/**
 * @function Applications
 *
 * @brief this functional UI component allows users to go through an application process to send to a landlord
 *
 * @details
 * How Applications is structured
 * - Application (review details)
 * - Upload files
 * - Pay Application Fee
 *
 * @returns {React.ReactElement} a react element that contains the UI pages needed for the application process
 */
function Applications(): JSX.Element {

    const dispatch = useDispatch();
    const {state} = useLocation()
    const data = state.data
    const index = state.index

    //retrieved from global state store
    const unitIndex = useSelector(state => state.applications.unitIndex)

    //useEffect hook used to synchronize index with unitIndex state in global store
    useEffect(() => {
        dispatch(setUnitIndex(index))
    }, [])

    /* sets the subpage of the form that you're on also controls progress bar*/
    const [page, setPage] = useState(0);

    function handleContinueClick() {
        setPage(() => page + 1)
    }

    return (
        <>
            <div style={{height: '9vh'}}/>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%'}}>
                <Summary/>
                <div style={{marginTop: '3vw', display: 'flex', flexDirection: 'column'}}>
                    <UnitInfoCard data={data} index={unitIndex}/>
                    <AddPetsCard data={data} index={unitIndex}/>
                    <AddBunkmatesCard data={data} index={unitIndex}/>
                </div>
            </div>
        </>
    )
}

export default Applications;
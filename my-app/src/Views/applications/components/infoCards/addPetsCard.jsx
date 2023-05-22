import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Divider, Card, TextField, InputAdornment, Typography, Avatar, Tooltip, tooltipClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import { getProfile } from '../../../../api';
import { AiFillQuestionCircle } from 'react-icons/ai';

/**
 * @function AddPetsCard
 * 
 * @brief this functional UI component allows users to link bunkmates and divide up the rent cost amongst everyone
 * 
 * @param {object} data this object stores data on the unit
 * @param {number} index this number represents the index within the listings page
 * @details
 * How this component is structured
    * - TopInfoContainer (contains information about the remaining rent cost that needs to be allocated)
    * - UserOwnAllocation (contains the user's profile information and an input field to enter the desired amount of rent to be distributed)
    * - BunkmateAllocation (contaisn an input field for linking roommates and another to enter the desired amount of rent to be distributed)
 * @returns {React.ReactElement} a react element that contains the ability to assign rent costs to your roommates
 */
export default function AddPetsCard({ data, index }) {


    const styles = {
        container: { padding: '10px 25px 10px 25px', margin: '2%', borderRadius: '20px', display: 'flex', flexDirection: 'column', minWidth: '350px' },
        row: { display: 'flex', justifyContent: 'space-between' },
        title: { fontSize: '18px' },
        fee: { fontWeight: 600, fontSize: '17px' },
    }

    //retrieve state from global store
    const petCount = useSelector(state => state.applications.petCount)

    {/* Only display the card if petCount is 1 or greater */ }
    return (
        petCount >= 1
            ?
            <Card sx={styles.container} raised>
                <div style={styles.row}>
                    <Typography color="text.secondary" variant="h6" sx={styles.title}>
                        Pet Fee:
                    </Typography>
                    <Typography color="text.primary" variant="h6" sx={styles.fee}>
                        {`$${data.listing_details.units[index].petFee}`}
                    </Typography>
                </div>
            </Card >
            : null
    );
};

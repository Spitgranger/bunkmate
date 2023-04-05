import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import { Paper, TextField } from "@mui/material";

const PlacesAutocomplete = (props) => {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            componentRestrictions: { country: "ca" },
        },
        debounce: 300,

    });

    const handleInput = (e) => {
        // Update the keyword of the input element
        setValue(e.target.value);
    };

    const handleSelect =
        ({ description }) =>
            () => {
                // When user selects a place, we can replace the keyword without request data from API
                // by setting the second parameter to "false"
                setValue(description, false);
                clearSuggestions();

                // Get latitude and longitude via utility functions
                getGeocode({ address: description }).then((results) => {
                    const { lat, lng } = getLatLng(results[0]);
                    console.log("📍 Coordinates: ", { lat, lng });
                    props.setSelected({ lat, lng });
                    props.setCenter({ lat, lng });
                });
            };

    const renderSuggestions = () =>
        data.map((suggestion) => {
            const {
                place_id,
                structured_formatting: { main_text, secondary_text },
            } = suggestion;

            return (
                <div className="autocomplete-result-wrapper" key={place_id}>
                    <li key={place_id} onClick={handleSelect(suggestion)}>
                        <strong>{main_text}</strong> <small>{secondary_text}</small>
                    </li>
                </div>

            );
        });

    return (
        <div className="search-container">
            <TextField
                value={value}
                onChange={handleInput}
                variant="filled"
                disabled={!ready}
                placeholder="Travel to a new location..."
                sx={{
                    boxSizing: 'border-box',
                    width: '100%',
                    backgroundColor: 'black',
                    borderRadius: '10px 10px 0px 0px',
                    color: 'white',
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                }}

                InputProps={{
                    style: {
                        paddingBottom: '15px',
                        paddingLeft: '10px',
                        fontSize: '15px',
                        fontWeight: 600,
                        color: 'white',
                    }
                }}

            />
            {/* We can use the "status" to decide whether we should display the dropdown or not */}
            {status === "OK" && <Paper sx={{
                padding: '0px',
                minWidth: "100%",
                backgroundColor: 'black',
                color: 'white',
                boxSizing: 'border-box',
                opacity: 0.8,

            }}><ul style={{ cursor: 'pointer' }}>{renderSuggestions()}</ul></Paper>}
        </div>
    );
};

export default PlacesAutocomplete;
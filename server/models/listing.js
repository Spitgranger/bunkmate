import mongoose from 'mongoose';

const reqString = {
    type: String,
    required: true,
}
const listingSchema = mongoose.Schema({
    dateCreated: {
        type: Date,
        required: true,
    },
    managementCompany: {
        type: mongoose.SchemaTypes.objectId,
        required: true,
    },
    units: {
        type: [mongoose.SchemaTypes.objectId],
        required: false,
    },
    address: reqString,
    coordinates: Object,
})

const listing = mongoose.model('listing',listingSchema);

export default listing;
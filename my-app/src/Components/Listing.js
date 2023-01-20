import './Listing.css';
import apartment from './Assets/apartment.jpg'

function Listing(keyinfo) {

  return (
    <div className="Listing">

      <section className="Image">
        <div className="Profile-Pic"></div>
        <img className="apartment" src={apartment} alt="apartment complex"></img>
      </section>

      <section className="Keyinfo">
        <div className="Keyinfo-row1">
          <h3 id="Price">${keyinfo.price}</h3>
          <h4 id="Divider">|</h4>
          <h4 id="Address">{keyinfo.address}</h4>
        </div>
        <div className="Keyinfo-row2">
          {/* determines if the listing has roomataes already */}
          <h5 id="Roomates">{keyinfo.num_roomates > 0 ? `Roomates: ${keyinfo.num_roomates}` : "No Roomates"}</h5>
          <h5 id="Divider">|</h5>
          <h5 id="Bed">Bedrooms: {keyinfo.num_bedrooms}</h5>
          <h5 id="Divider">|</h5>
          <h5 id="Bath">Bathrooms: {keyinfo.num_bathrooms}</h5>
        </div>
      </section>

    </div>
  );
}

export default Listing;

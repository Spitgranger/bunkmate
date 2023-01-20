import './App.css';
import Navbar from './Components/Navbar';
import Post from './Components/Post';
import { Rating } from './Components/Feedback';
import { Like } from './Components/Feedback';


import Apartment2 from "./Components/Assets/apartment.jpg"
import Apartment from "./Components/Assets/apartment2.jpg"
import Room from "./Components/Assets/living_space.jpg"
import Room2 from "./Components/Assets/living_space2.jpg"

function App() {
  const keyinfo = [
    {
      profile: "1",
      listing_img: "?",
      price: "800",
      address: "3452 winchester drive",
      num_roomates: "2",
      num_bedrooms: "4",
      num_bathrooms: "6",
      tags: [
        "Fitness Room",
        "Pool",
      ],
      date_available: "Jan 8th 2023",
      listing_img: [Apartment,Apartment2,Room, Room2],
    },
    {
      profile: "2",
      listing_img: "?",
      price: "645",
      address: "2451 sherway gardens",
      num_roomates: "4",
      num_bedrooms: "3",
      num_bathrooms: "2",
      tags: [
        "Concierge",
        "Study Room",
        "Fitness Room",
        "Rooftop lounge",
      ],
      date_available: "May 9th 2024",
      listing_img: [Apartment2,Apartment,Room, Room2],
    },
    {
      profile: "3",
      listing_img: "?",
      price: "1100",
      address: "300 21 west street",
      num_roomates: "2",
      num_bedrooms: "4",
      num_bathrooms: "2",
      date_available: "Oct 12th 2023",
      tags: [
        "Balcony",
        "Rooftop",
        "Laundry",
        "Parking",
      ],
      listing_img: [Room, Apartment2,Apartment, Room2],
    },
    {
      profile: "4",
      listing_img: "?",
      price: "2190",
      address: "2639 Maud Street",
      num_roomates: "2",
      num_bedrooms: "4",
      num_bathrooms: "2",
      tags: [
        "fitness roomates",
        "Outdoor Pool",
        "Games Room",
        "Party Room",
        "Party Room",
        "Party Room",
      ],
      date_available: "Feb 29th 2023",
      listing_img: [Room2, Apartment2,Apartment, Room],
      

    },
    {
      profile: "2",
      listing_img: "?",
      price: "645",
      address: "2451 sherway gardens",
      num_roomates: "4",
      num_bedrooms: "3",
      num_bathrooms: "2",
      tags: [
        "Concierge",
        "Study Room",
        "Fitness Room",
        "Rooftop lounge",
      ],
      date_available: "May 9th 2024",
      listing_img: [Apartment2,Apartment,Room, Room2],
    },
    {
      profile: "2",
      listing_img: "?",
      price: "645",
      address: "2451 sherway gardens",
      num_roomates: "4",
      num_bedrooms: "3",
      num_bathrooms: "2",
      tags: [
        "Concierge",
        "Study Room",
        "Fitness Room",
        "Rooftop lounge",
      ],
      date_available: "May 9th 2024",
      listing_img: [Apartment2,Apartment,Room, Room2],
    },
    {
      profile: "2",
      listing_img: "?",
      price: "645",
      address: "2451 sherway gardens",
      num_roomates: "4",
      num_bedrooms: "3",
      num_bathrooms: "2",
      tags: [
        "Concierge",
        "Study Room",
        "Fitness Room",
        "Rooftop lounge",
      ],
      date_available: "May 9th 2024",
      listing_img: [Apartment2,Apartment,Room, Room2],
    },
    {
      profile: "2",
      listing_img: "?",
      price: "645",
      address: "2451 sherway gardens",
      num_roomates: "4",
      num_bedrooms: "3",
      num_bathrooms: "2",
      tags: [
        "Concierge",
        "Study Room",
        "Fitness Room",
        "Rooftop lounge",
      ],
      date_available: "May 9th 2024",
      listing_img: [Apartment2,Apartment,Room, Room2],
    },
    {
      profile: "2",
      listing_img: "?",
      price: "645",
      address: "2451 sherway gardens",
      num_roomates: "4",
      num_bedrooms: "3",
      num_bathrooms: "2",
      tags: [
        "Concierge",
        "Study Room",
        "Fitness Room",
        "Rooftop lounge",
      ],
      date_available: "May 9th 2024",
      listing_img: [Apartment2,Apartment,Room, Room2],
    },
    {
      profile: "2",
      listing_img: "?",
      price: "645",
      address: "2451 sherway gardens",
      num_roomates: "4",
      num_bedrooms: "3",
      num_bathrooms: "2",
      tags: [
        "Concierge",
        "Study Room",
        "Fitness Room",
        "Rooftop lounge",
      ],
      date_available: "May 9th 2024",
      listing_img: [Apartment2,Apartment,Room, Room2],
    },
    {
      profile: "2",
      listing_img: "?",
      price: "645",
      address: "2451 sherway gardens",
      num_roomates: "4",
      num_bedrooms: "3",
      num_bathrooms: "2",
      tags: [
        "Concierge",
        "Study Room",
        "Fitness Room",
        "Rooftop lounge",
      ],
      date_available: "May 9th 2024",
      listing_img: [Apartment2,Apartment,Room, Room2],
    },
    {
      profile: "2",
      listing_img: "?",
      price: "645",
      address: "2451 sherway gardens",
      num_roomates: "4",
      num_bedrooms: "3",
      num_bathrooms: "2",
      tags: [
        "Concierge",
        "Study Room",
        "Fitness Room",
        "Rooftop lounge",
      ],
      date_available: "May 9th 2024",
      listing_img: [Apartment2,Apartment,Room, Room2],
    },
    {
      profile: "2",
      listing_img: "?",
      price: "645",
      address: "2451 sherway gardens",
      num_roomates: "4",
      num_bedrooms: "3",
      num_bathrooms: "2",
      tags: [
        "Concierge",
        "Study Room",
        "Fitness Room",
        "Rooftop lounge",
      ],
      date_available: "May 9th 2024",
      listing_img: [Apartment2,Apartment,Room, Room2],
    },
    {
      profile: "2",
      listing_img: "?",
      price: "645",
      address: "2451 sherway gardens",
      num_roomates: "4",
      num_bedrooms: "3",
      num_bathrooms: "2",
      tags: [
        "Concierge",
        "Study Room",
        "Fitness Room",
        "Rooftop lounge",
      ],
      date_available: "May 9th 2024",
      listing_img: [Apartment2,Apartment,Room, Room2],
    },
    {
      profile: "2",
      listing_img: "?",
      price: "645",
      address: "2451 sherway gardens",
      num_roomates: "4",
      num_bedrooms: "3",
      num_bathrooms: "2",
      tags: [
        "Concierge",
        "Study Room",
        "Fitness Room",
        "Rooftop lounge",
      ],
      date_available: "May 9th 2024",
      listing_img: [Apartment2,Apartment,Room, Room2],
    },
    {
      profile: "2",
      listing_img: "?",
      price: "645",
      address: "2451 sherway gardens",
      num_roomates: "4",
      num_bedrooms: "3",
      num_bathrooms: "2",
      tags: [
        "Concierge",
        "Study Room",
        "Fitness Room",
        "Rooftop lounge",
      ],
      date_available: "May 9th 2024",
      listing_img: [Apartment2,Apartment,Room, Room2],
    },
  ]


  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>
      <body>
        <section className="Listings">
          {keyinfo.map((info, i) => (
            <Post key={i} {...info} />
          ))}


        </section>
        {/* TODO */}
        <section className="map">
          <Rating />
          <Like />
          <section className="login">
            <label >
              <input value="username" className="username" type="text" ></input>
              <input value="password" className="password" type="password" ></input>
              <input className="submit" type="button" value="Submit"></input>
            </label>
            
          </section>
        </section>
      </body>
    </div>
  );
}

export default App;

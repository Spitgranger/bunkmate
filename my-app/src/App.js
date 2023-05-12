import './App.css';
import Navbar from './Components/Navbar';
import Post from './Components/Post';


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
      listing_img: [Apartment, Apartment2, Room, Room2, Room],
      listing_img_labels: ["Apartment", "Apartment", "Living Room", "Lounge", "Living Room"],
      listing_details: {
        developerName: 'Marshalls Place Condos',
        address: "81 Bay Street Toronto Ontario",
        priceRange: [1150, 2500],
        sqftRange: [486, 2523],
        overview: "Marshall Place Condos is located in beautiful Toronto, Ontario. Strategically established near Interstates 71, 77, 90, and 480, we are easily accessible from anywhere in the state.We are in proximity to an abundance of fine dining, superb shopping, and thrilling entertainment.Parents will be excited to learn we are zoned for the prestigious Cleveland Metropolitan School District. Choose from spacious one, two, and three bedroom floor plans for rent.Enjoy fully- equipped kitchens, spacious closets, expansive windows, and vaulted ceilings. We offer residents a lifestyle of comfort and convenience.Be sure to bring home your pets as we are a pet- friendly community. Marshall Place offers stellar community amenities that are sure to impress.Enjoy working out in our fitness center or relax at the community space.Our welcoming community provides something for everyone.Schedule a tour today and discover why our address is among the most desired in Cleveland, OH.",
        units: [
          {
            coverImage: 'https://i.pinimg.com/170x/20/1a/05/201a057fe462c3b77c1efbcf4b8e8e12.jpg',
            title: 'Unit 405',
            price: 1450,
            currency: 'CAD',
            beds: 0,
            baths: 1,
            sqft: 526,
            dateAvailable: 'July 24th 2023',
            type: 'Studio',
            numUnitsAvailable: 3,
            listing_img: [Room, Room2, Room, Room, Room2, Room],
            listing_img_labels: ["Living Room", "Lounge", "Living Room", "Lounge", "Living Room", "Lounge"],
          },
          {
            coverImage: 'https://www.houseplanshelper.com/images/how-to-read-floor-plans-full-floor-plan.jpg',
            title: 'Unit 425',
            price: 1150,
            currency: 'CAD',
            beds: 1,
            baths: 1,
            sqft: 486,
            dateAvailable: 'July 18th 2024',
            type: 'Single Bed',
            numUnitsAvailable: 1,
            listing_img: [Room, Room2,],
            listing_img_labels: ["Living Room", "Lounge"],
          },
          {
            coverImage: 'https://assets-news.housing.com/news/wp-content/uploads/2022/01/29113344/Home-plan-Know-how-to-read-a-floor-plan-or-house-plan-drawing-06.jpg',
            title: 'Unit 245',
            price: 1850,
            currency: 'USD',
            beds: 2,
            baths: 2,
            sqft: 786,
            dateAvailable: 'August 18th 2024',
            type: 'Double Bed',
            numUnitsAvailable: 3,
            listing_img: [Room],
            listing_img_labels: ["Living Room",],
          },
        ]
      }
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
      listing_img: [Apartment2, Apartment, Room, Room2],
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
      listing_img: [Room, Apartment2, Apartment, Room2],
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
      listing_img: [Room2, Apartment2, Apartment, Room],


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
      listing_img: [Apartment2, Apartment, Room, Room2],
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
      listing_img: [Apartment2, Apartment, Room, Room2],
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
      listing_img: [Apartment2, Apartment, Room, Room2],
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
      listing_img: [Apartment2, Apartment, Room, Room2],
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
      listing_img: [Apartment2, Apartment, Room, Room2],
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
      listing_img: [Apartment2, Apartment, Room, Room2],
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
      listing_img: [Apartment2, Apartment, Room, Room2],
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
      listing_img: [Apartment2, Apartment, Room, Room2],
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
      listing_img: [Apartment2, Apartment, Room, Room2],
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
      listing_img: [Apartment2, Apartment, Room, Room2],
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
      listing_img: [Apartment2, Apartment, Room, Room2],
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
      listing_img: [Apartment2, Apartment, Room, Room2],
    },
  ]


  return (
    <div className="App">
      <header className="App-header">
        <div style={{ height: '9vh' }} />
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
        </section>
      </body>
    </div >
  );
}

export default App;

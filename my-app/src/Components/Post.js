import "./Post.css"
import { BsBook, BsBookmarks } from 'react-icons/bs'
import { BsBookmarksFill } from 'react-icons/bs'
import { IoIosArrowDroprightCircle } from 'react-icons/io'
import { IoIosArrowDropleftCircle } from 'react-icons/io'
import { BsFillCircleFill } from 'react-icons/bs'
import { useState } from 'react'

export function Bookmark() {

  const [fill, setFill] = useState(() => count()); //save button state (avoids being re-rendered every time it's called, only renders first time)

  function count(number = 1) {
    return (number++);
 
  }
  
  function handleSaveClick () {
      return setFill(() => fill + 1)

  }

  return (
    <label>
      <input type="check"
        id="bookmark"
        onClick={handleSaveClick}>
      </input>
      {fill % 2 === 0 ? <BsBookmarksFill size={20} /> : <BsBookmarks size={20} />}
    </label>
  )
}

export default function Post(info) {

  const [current, setCurrent] = useState(0); //image scroll state

  function handleForwardClick () {
      return setCurrent(count => (count + 1 === info.listing_img.length) ? 0: count + 1)
  }

  function handleBackwardClick () {
      return setCurrent(count => (count - 1 === -1) ? info.listing_img.length - 1: count - 1)

  }

  return (
    <div className="listing">
      <div className="postBox">
        <div className="image">
          <img src={info.listing_img[current]} alt="A Listing" />
          <div id="functionality">
            <div id="save" >
              <Bookmark />
            </div>

            <label id="back">
              <button
                id="backButton"
                type="button"
                onClick={handleBackwardClick} >
              </button>
              < IoIosArrowDropleftCircle size={30} color={"white"} />
            </label>
            <label id="forward" >
              <button
                id="forwardButton"
                type="button"
                onClick={handleForwardClick} >
              </button>
              < IoIosArrowDroprightCircle size={30} color={"white"} />
            </label>
            <label className="slide">
              {[...Array(info.listing_img.length)].map((slide, i) => {
                return (
                  <>
                    {/* why doesn't this code work??????
                <input type="button"
                  value={i}
                  onCLick={() => setCurrent(i)} />
                */}
                    < BsFillCircleFill 
                      className="dots"
                      size={current === i ? 12 : 9}
                      onClick={() => setCurrent(i)}
                      color={current === i ? 'aqua' : 'white'}
                    />
                  </>
                )
              })}

            </label>

          </div>
        </div>
        <div className="keyInfo">
          <h2>${info.price}</h2>
          <h4>{info.address}</h4>
          <h5>| Baths: {info.num_bathrooms} | Beds: {info.num_bedrooms} | Roomates: {info.num_roomates} |</h5>

          <h5>Available After: {info.date_available}</h5>
          <div id="message">
            <h3>Message</h3>
          </div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div className="Ammenities">
        {info.tags?.map((tag, i) => {
          return (<div id="tags" key={i}>{tag}</div>);
        })
        }
      </div>
    </div >

  )
}
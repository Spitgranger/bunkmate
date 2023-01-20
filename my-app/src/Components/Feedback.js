import './Feedback.css'
import { FaStar } from 'react-icons/fa';
import { useState } from 'react';


export function Rating() {

  /* TODO change default state of rating to average rating of all users */
  const [rating, setRating] = useState(4);
  const [hover, setHover] = useState(null)

  return (
    <>
      {[...Array(5)].map((star, i) => {
        const index = i + 1; //index starts at 1
        const width = 20; //size starts at 20
        return (
          <label className="starRating">
            <FaStar
              onClick={() => setRating(index)} //event listener
              className="star"
              onMouseEnter={() => setHover(index)} //event listener
              onMouseLeave={() => setHover(null)} //event listener
              size={index === hover ? width + 5 : width}
              color={index <= (hover || rating) ? '#00FFFF' : '#000000'}
            />
          </label>
        );
      })}
    </>
  );
}



export function Like() {
  const [initialText, setText] = useState(() => initial())

  function initial() {
    return 14
  }
  const clicked = () => {
    setText(() => initial() + 1)
  }

  return (
    <>
      <label>
        <button className='Like' onClick={clicked}>Saves:
          <span>{initialText}</span>
        </button>
      </label>
    </>
  );
}


export default Like;

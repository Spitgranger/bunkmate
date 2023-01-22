import Navbar from '../Components/Navbar';
import React, { useState } from 'react';
import FormInput from '../Components/FormInput';
import './CreatePost.css';

function CreatePost() {
  const [formData, setFormData] = useState({
    address: "",
    price: 0,
    number_of_bedrooms: 0,
    number_of_roommates: 0,
    tags: [],
    date_available: "",
  });
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  }
  console.log(formData);
  const inputs = [
    {
      id: 1,
      name: 'Address',
      placeholder: 'Enter an Address',
      keyname: 'address',
      errormessage: "",
      required: true,
    },
    {
      id: 2,
      name: 'Price',
      placeholder: 'Monthly Price',
      keyname: 'price',
      errormessage: "Price Must be greater then 0",
      required: true,
      pattern: "^[1-9]*$",
    },
    {
      id: 3,
      name: 'Number of Bedrooms',
      placeholder: 'Number of Bedrooms',
      keyname: 'number_of_bedrooms',
      errormessage: "Bedrooms must be greater than 0",
      required: true,
      pattern: "^[1-9]*$"
    },
    {
      id: 4,
      name: 'Number of roommates',
      placeholder: 'Number of allowed Roommates',
      keyname: 'number_of_roommates',
      errormessage: "Roommates must be greater than 0",
      required: true,
      pattern: "^[1-9]*$"
    },
    {
      id: 5,
      name: 'Tags',
      placeholder: 'Tags, each separated with a comma',
      keyname: 'tags',
      errormessage: "Tags are in an invalid format",
      required: true,
    },
    {
      id: 6,
      name: 'Date Available',
      placeholder: 'Date Available',
      keyname: 'date_available',
      errormessage: "",
      required: true,
      type: "date",
      pattern: "^[1-9]*$"
    },
  ]

  return (
    <div className='formPage'>
      <Navbar />
      <div className='formInput'>
        <h2>Create a Listing</h2>
        <form onSubmit={handleSubmit}>
          {inputs.map((input) => {
            return <FormInput key={input.id} {...input} value={formData[input.name]} onChange={onChange} />
          })}
          <button>Submit</button>
        </form>
      </div>
    </div>
  )
}
export default CreatePost;
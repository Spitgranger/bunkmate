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
    number_of_bathrooms: 0,
    tags: [],
    date_available: "",
  });
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    }).then(response => response.json())
      .then(response => console.log(JSON.stringify(response)))
  }
  console.log(formData);
  const inputs = [
    {
      name: 'Address',
      placeholder: 'Enter an Address',
      keyname: 'address',
      errormessage: "",
      required: true,
    },
    {
      name: 'Price',
      placeholder: 'Monthly Price',
      keyname: 'price',
      errormessage: "Price Must be greater then 0",
      required: true,
      pattern: "^[1-9]*$",
    },
    {
      name: 'Number of Bedrooms',
      placeholder: 'Number of Bedrooms',
      keyname: 'number_of_bedrooms',
      errormessage: "Bedrooms must be greater than 0",
      required: true,
      pattern: "^[1-9]*$"
    },
    {
      name: 'Number of roommates',
      placeholder: 'Number of allowed Roommates',
      keyname: 'number_of_roommates',
      errormessage: "Roommates must be greater than 0",
      required: true,
      pattern: "^[1-9]*$"
    },
    {
      name: 'Tags',
      placeholder: 'Tags, each separated with a comma',
      keyname: 'tags',
      errormessage: "Tags are in an invalid format",
      required: true,
    },
    {
      name: 'Date Available',
      placeholder: 'Date Available',
      keyname: 'date_available',
      errormessage: "",
      required: true,
      type: "date",
      pattern: "^[1-9]*$"
    },
    {
      name: 'Number of bathrooms',
      placeholder: 'Number of bathrooms',
      keyname: 'number_of_bathrooms',
      errormessage: "Roommates must be greater than 0",
      required: true,
      pattern: "^[1-9]*$"
    },
  ]

  return (
    <div className='formPage'>
      <Navbar />
      <div className='formInput'>
        <h2>Create a Listing</h2>
        <form onSubmit={handleSubmit}>
          {inputs.map((input, i) => {
            return <FormInput key={i} {...input} value={formData[input.name]} onChange={onChange} />
          })}
          <button>Submit</button>
        </form>
      </div>
    </div>
  )
}
export default CreatePost;
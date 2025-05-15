import React, { useState } from 'react'
import Title from '../../components/Title'
import { assets } from '../../assets/assets'

const AddRoom = () => {

  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  })

  const [input, setInput] = useState({
    roomType: '',
    pricePerNight: 0,
    
    amenities: {
      'Free Wi-Fi': false,
      'Free Breakfast': false,
      'Parking': false,
      'Swimming Pool': false,
      'Gym': false,
      'Spa': false,
      'Air Conditioning': false,
      'Room Service': false,
      'Laundry Service': false,
      'Pet Friendly': false,
      'Non-Smoking': false,
    },
  })
  return (
    <form >
      <Title align='left' font='outfit' title='Add Room' subTitle='Fill in the details carefully and accurate room details, pricing, and amenities, to enchance the user booking experiecne.' />
      {/* Upload Area For Images */}
      <p className='text-gray-800 mt-10'>Images</p>
      <div className='gird grid-cols-2 sm:flex gap-4 my-2 flex-wrap'>
       {Object.keys(images).map((key)=>(
         <label htmlFor={`roomImgage${key}`} key={key}>
             <img className='max-h-13 cursor-pointer opacity-80'
             src={images[key] ? URL.createObjectURL(images[key]) : assets.uploadArea} alt="" />
            <input  onChange={e => setImages({...images, [key]: e.target.files[0]})}
            type="file" accept='image/*' id={`roomImgage${key}`} hidden/>
         </label>
            ))}
      </div>
    </form>
  )
}

export default AddRoom
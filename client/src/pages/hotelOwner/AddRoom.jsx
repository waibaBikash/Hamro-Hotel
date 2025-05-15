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

       <div className='w-full flex max-sm:flex-col sm:gap-4 mt-4'>
           <div className='flex-1 max-w-48'>
            <p className='text-gray-800 mt-4'>Room Type</p>
              <select value={input.roomType} onChange={e => setInput({...input, roomType: e.target.value})}
              className='border opacity-70 border-gray-300 mt-1 rounded p-2 w-full'>
                  <option value="">Select Room Type</option>
                  <option value="single">Single</option>
                  <option value="double">Double</option>
                  <option value="suite">Suite</option>
                  <option value="deluxe">Deluxe</option>
                  <option value="family">Family</option>
                  <option value="presidential">Presidential</option>
                  <option value="super-deluxe">Super Deluxe</option>
                  <option value="studio">Studio</option>
                  <option value="penthouse">Penthouse</option>
                  <option value="villa">Villa</option>
                  <option value="cottage">Cottage</option>

              </select>
           </div>
             <div>
               <p className='mt-4 text-gray-800'>
                  Price <span className='text-xs'>/night</span>
               </p>
               <input value={input.pricePerNight} onChange={e => setInput({...input, pricePerNight: e.target.value})}
                type="number" placeholder='0' className='border border-gray-300 mt-1 rounded p-2 w-24' />
             </div>
       </div>
        <p className='text-gray-800 mt-4'>Amenities</p>
         <div className='flex flex-col flex-wrap mt-1 text-gray-400 max-w-sm'>
            {Object.keys(input.amenities).map((amenity, index) => (
              <div key={index} className='flex items-center gap-2'>
                <input type="checkbox" id={`amenities${index+1}`} checked={input.amenities[amenity]} onChange={e => setInput({...input, amenities: {...input.amenities, [amenity]: !input.amenities[amenity]}})} />
                <label htmlFor={`amenities${index+1}`} className='text-gray-800'>{amenity}</label>
              </div>
            ))}
           
         </div>
          <button className='bg-primary text-white px-8 rounded mt-8 cursor-pointer'>Add Room</button>
    </form>
  )
}

export default AddRoom
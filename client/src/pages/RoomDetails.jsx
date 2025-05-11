import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets, facilityIcons, roomsDummyData } from '../assets/assets';
import StarRating from '../components/StarRating';

const RoomDetails = () => {

  const {id} = useParams();

  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  useEffect(()=>{
    const room = roomsDummyData.find(room => room._id === id)
    room && setRoom(room)
    room && setMainImage(room.images[0])
  }, [])
  return  room &&(
    <div className='py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32'>
      {/* Room Details */}
      <div className='flex flex-col md:flex-row items-start md:items-center gap-2'>
         <h1 className='text-3xl md:text-4xl font-playfair'>{room.hotel.name} <span className='font-inter text-sm'>({room.roomType})</span></h1>
         <p className='text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full'>20% OFF</p>
      </div>
          {/* Room Rating */}
          <div className='flex items-center gap-1 mt-2'>
            <StarRating />
            <p className='ml-2'>200+ reviews</p>
          </div>
          {/* Room Address */}
          <div className='flex items-center gap-1 text-gray-500 mt-2'>
             <img src={assets.locationIcon} alt="location-icon" />
             <span>{room.hotel.address}</span>
          </div>
          {/* Room Images */}
           <div className='flex flex-col lg:flex-row mt-6 gap-6'>
                <div className='lg:w-1/2 w-full'>
                   <img src={mainImage} alt="Room Image" className='w-full rounded-xl shadow-lg object-cover' />
                </div>
                 <div className='grid grid-cols-2 gap-4 lg:w-1/2 w-full'>
                   {room?.images.length > 1 && room.images.map((image, index)=>(
                    <img onClick={()=> setMainImage(image)} key={index} src={image} alt='Room Image' className={`w-full rounded-xl shadow-md object-cover cursor-pointer ${mainImage === image && 'outline-3 outline-orange-500'}`} />
                   ))}
                 </div>
           </div>
             {/* Room Highlight */}
              <div className='flex flex-col md:flex-row md:justify-between mt-10'>
                  <div className='flex flex-col'>
                     <h1 className='text-3xl md:text-4xl font-playfair'>Experience Luxury Like Never Before</h1>
                       <div className='flex flex-wrap items-center mt-3 mb-6 gap-4'>
                         {room.amenities.map((item, index)=>(
                          <div key={index} className='flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100'>
                            <img src={facilityIcons[item]} alt={item} className='w-5 h-5' />
                            <p className='text-xs'>{item}</p>
                          </div>
                         ))}
                       </div>
                  </div>
                  {/* Room Price */}
                    <p className='text-2xl font-medium'>${room.pricePerNight} /night</p>
              </div>
               {/* CheckIn CheckOut Form */}
               <form className='flex flex-col md:flex-row items-start md:text-center justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-s-xl mask-auto mt-16 max-w-6xl'>
                 <div className='flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-500'>
                   <div className='flex flex-col'>
                     <label htmlFor="checkInDate">Check-In</label>
                     <input type="date" id='checkInDate' placeholder='Check-In' className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required />
                   </div>
                   <div className='w-px h-15 bg-gray-300/70 max-md:hidden'></div>
                   <div className='flex flex-col'>
                     <label htmlFor="checkOutDate">Check-Out</label>
                     <input type="date" id='checkOutDate' placeholder='Check-Out' className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required />
                   </div>
                    <div className='w-px h-15 bg-gray-300/70 max-md:hidden'></div>

                   <div className='flex flex-col'>
                     <label htmlFor="guests">Guests</label>
                     <input type="number" id='guests' placeholder='0' className='max-w-20 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required />
                   </div>
                     
                 </div>
                  <button type='submit' className='bg-primary hover:bg-primary-dull active:scale-95 transition-all text-white rounded-md max-md:w-full max-md:pt-6 md:px-25 md:py-3 text-base cursor-pointer'>
                    Book Now
                  </button>
               </form>
    </div>
  )
}

export default RoomDetails
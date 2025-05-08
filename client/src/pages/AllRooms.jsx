import React from 'react'
import { assets, roomsDummyData } from '../assets/assets'
import { useNavigate } from 'react-router-dom';
import StarRating from '../components/StarRating';

const AllRooms = () => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col-reverse lg:flex-row items-start justify-between pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32'>
       <div>
         <div className='flex flex-col items-start text-left'>
           <h1 className='font-plafair text-4xl md:test-[40px]'>Hotel Rooms</h1>
           <p className='text-sm md:text-base text-gray-500/90 mt-2 max-w-174'>Take advantage of our limited-time offers and special packages to enchanace your stay and create unforgetable memories.</p>
         </div>
          
          {roomsDummyData.map((room)=>(
            <div key={room._id} className='flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300 last:pb-30 last:border-0'>
              <img onClick={()=> {navigate(`/rooms/${room._id}`); scrollTo(0,0)}}
               src={room.images[0]} alt="Hotel-img" title='View Room Details'  className='max-h-65 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer' />
                <div className='md:w-1/2 flex flex-col gap-2'>
                   <p className='text-gray-500'>{room.hotel.city}</p>
                   <p onClick={()=> {navigate(`/rooms/${room._id}`); scrollTo(0,0)}}
                   className='text-gray-800 text-3xl font-playfair cursor-pointer' >{room.hotel.name}</p>
                    <div className='flex items-center'>
                       <StarRating />
                       <p className='ml-2'>200+ reviews</p>
                    </div>
                     <div className='flex items-center gap-1 text-gray-500 mt-2 text-sm'>
                       <img src={assets.locationIcon} alt="locaiton-icon" />
                       <span>{room.hotel.address}</span>
                     </div>
                </div>
            </div>
          ))}
       </div>
       {/* Filters */}
       <div>

       </div>
    </div>
  )
}

export default AllRooms
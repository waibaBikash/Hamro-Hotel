import React, { useState } from 'react'
import Title from '../../components/Title'
import { assets, dashboardDummyData } from '../../assets/assets'

const Dashboard = () => {

  const [dashboardData, setdashboardData] = useState(dashboardDummyData)
  return (
    <div>
      <Title align='left' font='outfit' title='Dashboard' subTitle='Monitor your room listings, track bookings and analyze revenue-all in one place. Stay updated with real-time insights to ensure smooth operaiton.' />
        <div className='flex gap-4 my-8'>
          {/* Total Bookings */}
           <div className='bg-primary/3 border border-primary/10 rounded flex p-4 pr-8'>
               <img src={assets.totalBookingIcon} alt="" className='max-sm:hidden h-10' />
                <div className='felx flex-col sm:ml-4 font-medium'>
                   <p className='text-blue-500 text-lg'>Total Bookings</p>
                   <p className='text-neutral-400 text-base'>{dashboardData.totalBookings}</p>
                </div>
           </div>
           {/* Total Revenue */}
           <div className='bg-primary/3 border border-primary/10 rounded flex p-4 pr-8'>
               <img src={assets.totalRevenueIcon} alt="" className='max-sm:hidden h-10' />
                <div className='felx flex-col sm:ml-4 font-medium'>
                   <p className='text-blue-500 text-lg'>Total Revinue</p>
                   <p className='text-neutral-400 text-base'>$ {dashboardData.totalRevenue}</p>
                </div>
           </div>
           
        </div>

              {/* Recent Bookings */}
              <h2 className='text-xl text-blue-950/70 font-medium mb-5'>Recnet Bookings</h2>
            <div className='w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll'>

               <table className='w-full'>
                <thead className='bg-gray-50'>
                 <tr>
                     <th className='py-3 px-4 text-gray-800 font-medium'>User Name</th>
                     <th className='py-3 px-4 text-gray-800 font-medium max-sm:hidden'>Room Name</th>
                     <th className='py-3 px-4 text-gray-800 font-medium text-center'>Total Amount</th>
                     <th className='py-3 px-4 text-gray-800 font-medium text-center'>Payment Status</th>
                 </tr>
               </thead>

                <tbody className='text-sm'>
                  {dashboardData.bookings.map((tiem, index)=>(
                    <tr key={index} className='border-b border-gray-200'>
                       <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>
                         {item.user.userName}
                       </td>
                       <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>
                         {item.room.rootType}
                       </td>
                       <td className='py-3 px-4 text-gray-700 border-t border-gray-300 text-center'>
                         $ {item.totalPrice}
                       </td>
                        <td className='py-3 px-4 border-t border-gray-300 flex'>
                             <button className={`py-1 px-3 text-xs rounded-full mx-auto ${item.isPaid ? 'bg-green-200 text-green-600' : 'bg-amber-100 text-yellow-600'}`}>
                              {item.isPaid ? 'Completed' : 'Pending' }
                             </button>
                        </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
    </div>
  )
}

export default Dashboard
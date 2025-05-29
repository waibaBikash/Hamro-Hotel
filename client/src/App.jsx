
import { Route,
   Routes,
   useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import AllRooms from './pages/AllRooms';
import RoomDetails from './pages/RoomDetails';
import MyBookings from './pages/MyBookings';
import HotelReg from './components/HotelReg';
import Layout from './pages/hotelOwner/Layout';
import Dashboard from './pages/hotelOwner/Dashboard';
import AddRoom from './pages/hotelOwner/AddRoom';
import ListRoom from './pages/hotelOwner/ListRoom';
import {Toaster} from 'react-hot-toast';
import { useAppcontext } from './context/AppContext';


const App = () => {

  const isOwnerPath = useLocation().pathname.includes('owner');
  
  const {showHotelReg} = useAppcontext();

  return (
    <div>
      <Toaster />
      { !isOwnerPath && <Navbar /> }
      { showHotelReg && <HotelReg />}
        <div className='min-h-[70vh]'>
           <Routes>
             <Route path='/' element={<Home />} />
             <Route path='/rooms' element={<AllRooms />} />
             <Route path='/rooms/:id' element={<RoomDetails />} />
             <Route path='/my-bookings' element={<MyBookings />} />
               <Route path='/owner' element={<Layout/>}>
                  <Route index element ={<Dashboard/>} />
                  <Route path='add-room' element ={<AddRoom/>} />
                  <Route path='list-room' element ={<ListRoom/>} />
               </Route>
             <Route />
           </Routes>
        </div>
        <Footer />
    </div>
  )
}

export default App;
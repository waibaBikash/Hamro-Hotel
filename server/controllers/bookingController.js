
import Booking from "../models/Booking.js"
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

// Function to Check Ability of Room

const checkAvailability = async ({checkInDate, checkOutDate, room}) => {
  try {
    const bookings = await Booking.find({
      room,
      checkInDate: { $lte: checkOutDate },
      checkOutDate: { $gte: checkInDate}
    });
    const isAbailable =  bookings.length === 0;
    return isAbailable;
  } catch (error) {
    console.error(error.message);
  }
}

// Api to check room availability
// POST /api/booking/check-availability

export const checkAvailabilityAPI = async (req, res) => {
  try {
    const { checkInDate, checkOutDate, room } = req.body;
    const isAvailable = await checkAvailability({ checkInDate, checkOutDate, room });
    res.json({ success: true, isAvailable });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

// Api to create a  new booking
// POST /api/bookings/book

export const createBooking = async (req, res) => {
  try {
    const { room, checkInDate, checkOutDate, guests} = req.body;

    const user = req.user._id;

    // Check if the room is available
    const isAvailable = await checkAvailability({ checkInDate, checkOutDate, room });
    if (!isAvailable) {
      return res.json({ success: false, message: "Room is not available for the selected dates." });
    }

    // Get Totla Price of Room
    const roomData = await Room.find(room).populate("hotel");
    let totalPrice = roomData.pricePerNight;


    // Calculate total price based on number of nights
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const timeDiff = checkOut.getTime() - checkIn.getTime();
    const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
    totalPrice *= nights;
    // Create a new booking
    const booking = await Booking.create({
      user,
      room,
      hotel: roomData.hotel._id,
      guests: +guests,
      checkInDate,
      checkOutDate,
      totalPrice,
    });

    res.json({ success: true, message: "Booking created successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Failed to create booking" });
  }
}

// Api to get all bookings of a user
// GET /api/bookings/user


const getUserBookings = async (req, res) => {
  try {
    const user = req.user._id;
    const bookings = await Booking.find({ user })
      .populate("room hotel")
      .sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  }
  catch (error) {
    res.json({ success: false, message: "Failed to fetch bookings" });
  }
}
// Api to get all bookings of a hotel

export const getHotelBookings = async (req, res) => {
  try {
    
    const hotel = await Hotel.findOne({ owner: req.auth.userId });
    if (!hotel) {
      return res.json({ success: false, message: "Hotel not found" });
    }
    const bookings = await Booking.find({ hotel: hotel._id })
      .populate("room hotel user")
      .sort({ createdAt: -1 });
    
   // Total Bookings
    const totalBookings = bookings.length;

    //Totla Revenue
    const totalRevenue = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0);
    
    res.json({ success: true, dashboardData: {totalBookings, totalRevenue, bookings}});
  } catch (error) {
    res.json({ success: false, message: "Failed to fetch hotel bookings" });
  }
}

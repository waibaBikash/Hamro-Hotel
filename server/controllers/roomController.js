import Hotel from "../models/Hotel";

// Api to create a ner room for a hotel
export const createRoom = async (req, res) => {
  try {
    const { roomType, pricePerNight, aminities} = req.body;
    const hotel = await Hotel.findById(owner: req.auth.userId);

    if(!hotel){
      return res.json({success: false, message: "Hotel not found"});
    }
    
  } catch (error) {
    
  }
}

// Api to get all rooms for a hotel

export const getRooms = async (req, res) => {
  try {
    
  } catch (error) {
    
  }
}

// Api to get all rooms for a specific hotel
export const getOwnerRooms = async (req, res) => {
  try {
    
  } catch (error) {
    
  }
}

// Api to toggle abailability of a room
export const toggleAvailability = async (req, res) => {
  try {
    
  } catch (error) {
    
  }
}
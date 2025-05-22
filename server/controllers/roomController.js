import Hotel from "../models/Hotel.js";
import { v2 as cloudinary } from "cloudinary";
import Room from "../models/Room.js";
// Api to create a ner room for a hotel
export const createRoom = async (req, res) => {
  try {
    const { roomType, pricePerNight, aminities} = req.body;
    const hotel = await Hotel.findById({owner: req.auth.userId});

    if(!hotel)
      return res.json({success: false, message: "Hotel not found"});

      // upload image to cloudinary

      const uploadImages = req.files.map(async (file) => {
      const response = await cloudinary.uploader.upload(file.path);
      return response.secure_url;
      })

      // wait for all images to be uploaded
      const images = await Promise.all(uploadImages);

      await Room.create({
        hotel: hotel._id,
        roomType,
        pricePerNight: +pricePerNight,
        aminities: JSON.parse(aminities),
        images
      })
  res.json({success: true, message: "Room created successfully"});
  } catch (error) {
    res.json({success: false, message: error.message});
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
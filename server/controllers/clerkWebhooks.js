
import User from "../models/User.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
  try {
    // create a Svix instance with the webhook secret 
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Getting Headers
    const headers = {
"svix-id": req.headers["svix-id"],
"svix-signature": req.headers["svix-signature"],
"svix-timestamp": req.headers["svix-timestamp"],
    };

    // Verifying Headers

    await whook.verify(JSON.stringify(req.body), headers);

    // Getting Data from request body

    const { type, data } = req.body;

    const userData = {
      _id: data.id,
      email: data.email_addresses[0].email_address,
      username: data.fist_name + " " + data.last_name,
      image: data.image_url,
    }
    // Switch case to handle different webhook events
    switch (type) {
      case "user.created":
        // Create a new user in the database
        await User.create(userData);
        break;
      case "user.updated":
        // Update the user in the database
        await User.findByIdAndUpdate(data.id, userData);
        break;
      case "user.deleted":
        // Delete the user from the database
        await User.findByIdAndDelete(data.id);
        break;
      default:
        break;
    }
    res.json({success: true, message: "Webhook received"});
  } catch (error) {
    console.log(error.message);
    res.json({success: false, message: error.message});
  }
}

export default clerkWebhooks;


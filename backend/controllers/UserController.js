import webhook from "svix";
import userModel from "../models/userModel.js";

// API Controller function to manage clerk user with database
// http://localhost:4000/api/user/webhooks

const clearkWebHooks = async (req, res) => {
  
  try {
    const whook = new webhook(process.env.CLERK_WEBHOOK_SECRET);

    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    }); // ena mate j clerk vaparyu che

    const { data, type } = req.body;


    switch (type) {
      case "user.created": {
        const userData = {
          clerkId: data.id,
          email: data.email_addresses[0].email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url,
        };

        let newUser = new userModel(userData);
        await newUser.save();
        res.json({});

        break;
      }
      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url,
        };

        await userModel.findOneAndUpdate({ clerkId: data.id }, userData);
        res.json({});

        break;
      }
      case "user.deleted": {
        await userModel.findOneAndDelete({ clerkId: data.id });
        res.json({});

        break;
      }

      default:
        break;
    }
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// API contoller function to get user available credit data
const userCredit = async (req, res) => {
  try {
    
    const { clerkId } = req.body;

    const user = await userModel.findOne({ clerkId });

    res.json({ success: true, credits: userData.creditBalance })
    
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
}

export { clearkWebHooks, userCredit };
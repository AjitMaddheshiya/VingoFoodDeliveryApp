import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/user.model.js";
import Order from "../models/order.model.js";
import Shop from "../models/shop.model.js";
import Item from "../models/item.model.js";
import DeliveryAssignment from "../models/deliveryAssignment.model.js";

dotenv.config();

const resetDatabase = async () => {
    try {
        // Connect to database
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to database");

        // Delete all data from all collections
        await User.deleteMany({});
        await Order.deleteMany({});
        await Shop.deleteMany({});
        await Item.deleteMany({});
        await DeliveryAssignment.deleteMany({});

        console.log("✅ Database reset successfully!");
        console.log("🗑️ All users, orders, shops, items, and delivery assignments deleted");
        console.log("🆕 Ready for fresh user registration and orders");

        process.exit(0);
    } catch (error) {
        console.error("❌ Error resetting database:", error);
        process.exit(1);
    }
};

resetDatabase();

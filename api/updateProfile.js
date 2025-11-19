import connectDB from "./db.js";
import auth from "./auth.js";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).json({ message: "POST only" });

    const user = auth(req);
    if (!user) return res.json({ success: false, message: "Unauthorized" });

    const { name, number } = req.body;

    const db = await connectDB();
    const users = db.collection("users");

    await users.updateOne(
        { _id: new ObjectId(user.id) },
        { $set: { name, number } }
    );

    res.json({ success: true });
}

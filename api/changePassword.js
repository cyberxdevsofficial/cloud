import connectDB from "./db.js";
import auth from "./auth.js";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    const user = auth(req);
    if (!user) return res.json({ success: false, message: "Unauthorized" });

    const { oldPass, newPass } = req.body;

    const db = await connectDB();
    const users = db.collection("users");

    const me = await users.findOne({ _id: new ObjectId(user.id) });

    const match = await bcrypt.compare(oldPass, me.password);
    if (!match) return res.json({ success: false, message: "Incorrect old password" });

    const hashed = await bcrypt.hash(newPass, 10);

    await users.updateOne(
        { _id: new ObjectId(user.id) },
        { $set: { password: hashed } }
    );

    res.json({ success: true });
}

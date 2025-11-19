import connectDB from "./db.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).json({ message: "POST only" });

    const { name, number, email, password } = req.body;

    const db = await connectDB();
    const users = db.collection("users");

    const exists = await users.findOne({ email });
    if (exists) return res.json({ success: false, message: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);

    await users.insertOne({
        name,
        number,
        email,
        password: hashed,
        role: "user",
        createdAt: new Date()
    });

    res.json({ success: true });
}

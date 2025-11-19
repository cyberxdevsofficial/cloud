import connectDB from "./db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).json({ message: "POST only" });

    const { email, password } = req.body;

    const db = await connectDB();
    const users = db.collection("users");

    const user = await users.findOne({ email });
    if (!user) return res.json({ success: false, message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.json({ success: false, message: "Wrong password" });

    const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
            role: user.role
        },
        "SECRETKEY123456",  
        { expiresIn: "7d" }
    );

    res.json({ success: true, token });
}

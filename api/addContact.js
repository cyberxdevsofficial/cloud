import connectDB from "./db.js";
import auth from "./auth.js";

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).json({ message: "POST only" });

    const user = auth(req);
    if (!user) return res.json({ success: false, message: "Unauthorized" });

    const { name, number } = req.body;

    const db = await connectDB();
    const contacts = db.collection("contacts");

    await contacts.insertOne({
        userId: user.id,
        name,
        number,
        createdAt: new Date()
    });

    res.json({ success: true });
}

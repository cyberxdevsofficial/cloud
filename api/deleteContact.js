import connectDB from "./db.js";
import auth from "./auth.js";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    if (req.method !== "DELETE") return res.status(405).json({ message: "DELETE only" });

    const user = auth(req);
    if (!user) return res.json({ success: false, message: "Unauthorized" });

    const id = req.query.id;

    const db = await connectDB();
    const contacts = db.collection("contacts");

    await contacts.deleteOne({ _id: new ObjectId(id), userId: user.id });

    res.json({ success: true });
}

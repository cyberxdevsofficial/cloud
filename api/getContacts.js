import connectDB from "./db.js";
import auth from "./auth.js";

export default async function handler(req, res) {
    const user = auth(req);
    if (!user) return res.json({ success: false, message: "Unauthorized" });

    const db = await connectDB();
    const contacts = db.collection("contacts");

    const list = await contacts.find({ userId: user.id }).toArray();

    res.json({ success: true, contacts: list });
}

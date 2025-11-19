import connectDB from "./db.js";
import auth from "./auth.js";

export default async function handler(req, res) {
    const user = auth(req);
    if (!user || user.email !== "root") return res.status(401).send("Forbidden");

    const db = await connectDB();
    const contacts = db.collection("contacts");

    const list = await contacts.find().toArray();

    let vcf = "";
    list.forEach(c => {
        vcf += `BEGIN:VCARD
VERSION:3.0
FN:${c.name}
TEL:${c.number}
END:VCARD
`;
    });

    res.setHeader("Content-Type", "text/vcard");
    res.send(vcf);
}

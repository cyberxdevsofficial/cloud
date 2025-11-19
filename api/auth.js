import jwt from "jsonwebtoken";

export default function auth(req) {
    try {
        const token = req.headers.authorization;
        if (!token) return null;

        return jwt.verify(token, "SECRETKEY123456");
    } catch (e) {
        return null;
    }
}

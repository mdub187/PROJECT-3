// import jwt from "jsonwebtoken";
// import { GraphQLError } from "graphql";
// import dotenv from "dotenv";
// dotenv.config();
// interface JwtPayload {
//   _id: unknown;
//   username: string;
//   email: string;
// }
// const getJwtSecret = () => {
//   const secret = process.env.JWT_SECRET_KEY;
//   if (!secret) {
//     console.error("JWT_SECRET_KEY not found in environment variables");
//     throw new Error("JWT_SECRET_KEY must be defined");
//   }
//   return secret;
// };
// export const authenticateToken = ({ req }: any) => {
//   let token = req.body.token || req.query.token || req.headers.authorization;
//   if (req.headers.authorization) {
//     token = token.split(" ").pop().trim();
//   }
//   if (!token) {
//     console.log("No token provided in request");
//     return { user: null };
//   }
//   try {
//     const secretKey = getJwtSecret();
//     const payload = jwt.verify(token, secretKey) as JwtPayload;
//     console.log("Token verified successfully for user:", payload.username);
//     req.user = payload;
//     return { user: payload };
//   } catch (err) {
//     console.error("Token verification failed:", err);
//     return { user: null };
//   }
// };
// export const signToken = (username: string, email: string, _id: unknown) => {
//   const payload = { username, email, _id };
//   const secretKey = getJwtSecret();
//   return jwt.sign(payload, secretKey, { expiresIn: "1h" });
// };
// export class AuthenticationError extends GraphQLError {
//   constructor(message: string) {
//     super(message, undefined, undefined, undefined, ["UNAUTHENTICATED"]);
//     Object.defineProperty(this, "name", { value: "AuthenticationError" });
//   }
// }
import jwt from "jsonwebtoken";
import { GraphQLError } from "graphql";
import dotenv from "dotenv";
dotenv.config();
export const authenticateToken = ({ req }) => {
    let token = req.body.token || req.query.token || req.headers.authorization;
    if (req.headers.authorization) {
        token = token.split(" ").pop().trim();
    }
    if (!token) {
        return req;
    }
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY || "", {
            maxAge: "2hr",
        });
        req.user = payload;
    }
    catch (err) {
        console.log("Invalid token");
    }
    return req;
};
export const signToken = (username, email, _id) => {
    const payload = { username, email, _id };
    const secretKey = process.env.JWT_SECRET_KEY || "";
    return jwt.sign(payload, secretKey, { expiresIn: "1h" });
};
export class AuthenticationError extends GraphQLError {
    constructor(message) {
        super(message, undefined, undefined, undefined, ["UNAUTHENTICATED"]);
        Object.defineProperty(this, "name", { value: "AuthenticationError" });
    }
}

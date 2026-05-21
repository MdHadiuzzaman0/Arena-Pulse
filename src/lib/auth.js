import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins" 
import dns from "node:dns/promises";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("ArenaPulse");

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL,
    database: mongodbAdapter(db, {
        client
    }),
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
    },
    emailAndPassword: {
        enabled: true,
        autoSignIn: false,
    },
    session : {
        cookieCache:{
            enabled: true, 
            strategy: "jwt",
            maxAge: 30 * 60 * 60 * 24,
        }
    },
    plugins: [
        jwt(), 
    ],
    // user: {
    //     changeEmail: {
    //         enabled: true,
    //         updateEmailWithoutVerification: true
    //     }
    // },
});
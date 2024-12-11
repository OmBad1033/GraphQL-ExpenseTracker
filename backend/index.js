import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { buildContext } from 'graphql-passport';

import passport from 'passport';
import session from 'express-session';
import connectMongo from 'connect-mongodb-session';

import mergedResolvers from "./resolvers/index.js";
import mergedtypeDefs from "./typeDefs/index.js";

import { connectDB } from "./db/connectDB.js";
import { configurePassport } from './passport/passport.config.js';
import job from './cron.js';

dotenv.config();
configurePassport();
job.start();

const app = express();
const httpServer = http.createServer(app);
const __dirname = path.resolve();

const MongoDBStore = connectMongo(session);
const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: 'sessions',
});
store.on('error', (error) => {
  console.log(error);
})

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false, //this option specifies that the session should not be saved back to the session store until the session 'uninitialized' option is 'false'.
  saveUninitialized: false, //this option specifies that the session should not be saved back to the session store until the session 'initialized' option is 'true'.
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    httpOnly: true,// this option specifies that the cookie should not be accessible by the client-side JavaScript
  },
  store: store
}));

app.use(passport.initialize());
app.use(passport.session());

const server = new ApolloServer({
  typeDefs: mergedtypeDefs,
  resolvers: mergedResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

// Use cors and express.json middleware
app.use(
  '/gql',
  cors({
    origin: 'http://localhost:3000', 
    credentials: true,
  }
  ),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req, res }) => buildContext({req, res}),
  }),
);

app.use(express.static(path.join(__dirname, "frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend/dist", "index.html"));
});




// Start the server
await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
await connectDB();
console.log(`🚀 Server ready at http://localhost:4000/`);

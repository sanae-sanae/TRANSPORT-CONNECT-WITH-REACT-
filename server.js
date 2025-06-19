import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import connectDB from './config/db.js';
import router from './routes/index.js';
import './config/passport.js';

dotenv.config();
const app = express();
const server = http.createServer(app);
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
connectDB();
app.use('/api', router);
const io = new Server(server, { cors: { origin: '*' } });

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
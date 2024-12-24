import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import api from './api';
import MessageResponse from './interfaces/MessageResponse';
import * as middlewares from './middleware/errors';
// import cookieParser from ''
import cookieParser from 'cookie-parser';

require('dotenv').config();

const app = express();

app.use(cookieParser());

app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`Incoming Request app.ts: ${req.method} ${req.url}`);
  // console.log('CORS Headers:', res.getHeaders());
  next();
});

const corsOptions = {
  origin: 'http://localhost:3000',
  allowedHeaders: 'Content-Type,Authorization',
  methods: 'POST,GET,HEAD,PUT,PATCH,DELETE,OPTIONS', // Ensure OPTIONS is included
  credentials: true,
};

// Apply CORS middleware before any routes
app.use(cors(corsOptions));

// app.options('*', cors(corsOptions)); // Handle preflight requests for all routes

app.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'Hello! 🚀🦄🌈✨👋🌎✨🌈🦄🚀',
  });
});

app.use('/api/v2', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;

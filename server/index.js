// ES Modules in Node >= 14 no longer have require by default.
// If you want to add it, put this code at the top of your file:
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
////////

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';


const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: '100mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(cors());

app.use('/posts', postRoutes);


const MONGO_USERNAME =  process.env.MONGO_USERNAME || "power_user_27";
const MONGO_PASSWORD =  process.env.MONGO_PASSWORD || "BestAccessGuy53";
const MONGO_DATABASE_NAME =  process.env.MONGO_DATABASE_NAME || "pdfReaderProject";

const MONGO_CONNECTION_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.n59lu.mongodb.net/${MONGO_DATABASE_NAME}?retryWrites=true&w=majority`;
const PORT = process.env.PORT;

// Connect to mongo database and set app to listen on the specified PORT
mongoose.connect(MONGO_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);

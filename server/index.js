import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';
// practice new
const app = express();

app.use(cors());  // Place the CORS middleware at the beginning
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

app.use('/posts', postRoutes);

// The following CORS headers are redundant and not needed here
// Remove the next() call as it will never be reached in this context
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://memo-frontend-4dikebkaj-karans-projects-f5cecbc1.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
});

const CONNECTION_URL = 'mongodb+srv://karanyelgulwar:1nEv1EuKVVj93S4W@cluster0.wcoomx0.mongodb.net/memories?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);

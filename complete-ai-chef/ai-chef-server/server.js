import express from 'express';
import { aiApiRoute } from './routes/aiApiRoute.js';
import cors from 'cors';

const app = express();
const PORT = 8080;

const corsOption = {
  origin: ['http://localhost:5173']
};
app.use(cors(corsOption))

app.use(express.json()); // Parse JSON
app.use('/api', aiApiRoute);

app.listen(PORT, () => {
  console.log(`Proxy Server running on http://localhost:${PORT}`)
})

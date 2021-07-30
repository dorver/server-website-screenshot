import express from 'express';
import cors from 'cors';
import videoRoutes from './routes/videoRoutes.js';

const app = express();
app.use(cors());

app.use(express.json());

app.use('/api/videos', videoRoutes);

app.listen(5000, console.log('Server running on port 5000'));

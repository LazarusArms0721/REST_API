import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import dotenv from 'dotenv/config.js';




import songsRoutes from './routes/songs.js';

const app = express();
const PORT = 5001;


mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected to your MongoDB!');
});


app.use(bodyParser.json());

app.use('/songs', songsRoutes);

app.get('/', (req,res) => res.send('Hello from homepage.'));

app.listen(PORT, () => {
    console.log(`Server running on port: http//:localhost:${PORT}`);

});
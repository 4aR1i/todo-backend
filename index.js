import express from 'express';
import mongoose from 'mongoose';
import config from 'config';
import projectRouter from './routes/project.routes.js';
import corsMiddleware from './middleware/cors.middleware.js';

const app = express();
const PORT = process.env.PORT || config.get('serverPort');

app.use(corsMiddleware);
app.use(express.json());
app.use('/api', projectRouter);

const start = async () => {
  try {
    await mongoose.connect(config.get('dbUrl'));
    app.listen(PORT, () => {
      console.log('Server started on port', PORT);
    });
  } catch (e) {
    console.log(e);
  }
};

start();

module.exports = app;

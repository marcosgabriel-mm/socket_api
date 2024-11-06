import express from 'express';
import log from './routes/routes.js';

const app = express();

app.use(express.json());
app.use(log);

export default app;
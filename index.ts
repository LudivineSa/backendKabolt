import express from 'express';
import cors from 'cors'; 
import mainRouter from './routes/index';
import './db';

const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:5173'
}))
app.use('/api', mainRouter);

app.listen(port, () => {
  console.log(`listening on port ${port}!`);
});
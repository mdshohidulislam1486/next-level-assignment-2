import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRoutes } from './modules/users/user.route';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Api is working ');
});

app.use('/api', userRoutes);

export default app;

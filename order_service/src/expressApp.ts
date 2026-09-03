import express, { Request, Response, NextFunction } from "express";
import cors from "cors";

import CartRouter from './api/cart.routes';
import OrderRouter from './api/order.routes';

const app = express();
app.use(cors());
app.use(express.json());

app.use(CartRouter);
app.use(OrderRouter);


app.use('/',(req: Request, res: Response, _next: NextFunction) => {
    console.log(req.body);
    return res.status(200).json('I am Healthly');
})

export default app;
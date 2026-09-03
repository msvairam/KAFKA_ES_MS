import Express, {Request, Response, NextFunction} from 'express';

const router = Express.Router();

router.get('/order',
    async (req: Request, res: Response, next: NextFunction ) => {
        res.status(200).json('Order Items');
    }
);

router.post('/order:id',
    async (req: Request, res: Response, next: NextFunction ) => {
        res.status(200).json('Order Items');
    }
);

router.delete('/order:id',
    async (req: Request, res: Response, next: NextFunction ) => {
        res.status(200).json('Order Items');
    }
);

export default router;
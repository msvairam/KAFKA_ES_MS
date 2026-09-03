import Express, {Request, Response, NextFunction} from 'express';
import * as cartService from '../services/cart.service';
import { cartRepository } from '../repository/cart.repository';
import { CartRepositoryType } from '../types/repository.type';

const router = Express.Router();

const repo: CartRepositoryType = cartRepository;

router.get('/cart',
    async (req: Request, res: Response, next: NextFunction ) => {
        console.log(req.body);
        const response = await cartService.GetCart(req.body, repo);
        res.status(200).json(response);
    }
);

router.post('/cart',
    async (req: Request, res: Response, next: NextFunction ) => {
        console.log(req.body);
        const response = await cartService.CreateCart(req.body, repo);
        res.status(200).json(response);
    }
)

router.patch('/cart',
    async (req: Request, res: Response, next: NextFunction ) => {
         const response = await cartService.UpdateCart(req.body, repo);
        res.status(200).json(response);
    }
)

router.delete('/cart',
    async (req: Request, res: Response, next: NextFunction ) => {
        const response = await cartService.DeleteCart(req.body, repo);
        res.status(200).json(response);
    }
)

export default router;
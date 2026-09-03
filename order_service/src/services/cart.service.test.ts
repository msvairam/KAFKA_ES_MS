import { CartRepositoryType } from '../types/repository.type'
import { cartRepository } from '../repository/cart.repository';
import { CreateCart } from './cart.service';

describe('cart Service', () => {

    let _repository: CartRepositoryType;

    beforeEach(() => {
        _repository = cartRepository
    });

    it('create cart validation', async () => {

        const mockData = {
            "item": "Smart Phone",
            "price": 1200,
        }

        const result = {
            message: 'fake Response while create',
            input: mockData,
        }

        jest.spyOn(_repository, 'create').mockImplementation(() => Promise.resolve(result));

        const service = await CreateCart(mockData, _repository);

        expect(service).toEqual(result);
    });
})
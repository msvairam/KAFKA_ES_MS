import { ICatalogRepository } from '../interface/catalogRespository.interface';
import { Product } from '../models/product.model';
import { productFactory  } from '../utils/fixtures/products';

export class MockCatalogRepository implements ICatalogRepository {
    create(data: Product): Promise<Product> {
        const mockedData = {
            ...data,
            id: 323,
        } as Product;
        return Promise.resolve(mockedData);
    }
    update(data: Product): Promise<Product> {
        return Promise.resolve(data);
    }
    delete(id: number): Promise<Product> {
       return Promise.resolve({id} as unknown as Product);
    }
    find(limit: number, offset: number): Promise<Product[]> {
        return Promise.resolve(productFactory.buildList);
    }
    findOne(id: number): Promise<Product> {
       return Promise.resolve(productFactory.build);
    }
    
}
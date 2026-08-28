import { injectable, inject } from 'inversify';

import { INTERFACE_TYPE } from '../utils/appConst';
import { ICatalogRepository } from '../interface/catalogRespository.interface'
import { ICatalogService } from '../interface/catalogService.interface';
import { Product } from '../models/product.model';

@injectable()
export class CatalogService implements ICatalogService {

    private _repository: ICatalogRepository

    constructor(@inject(INTERFACE_TYPE.CatalogRepository) repository: ICatalogRepository) {
        this._repository = repository;
    }

    async createProduct(data: Product): Promise<Product> {
        const product = await this._repository.create(data);
        if(!product?.id) {
            throw new Error("Unable to create product, Please try again");
        }
        return product;
    }

    async updateProduct(data: Product): Promise<Product>  {
        const product = await this._repository.update(data);
        if(!product.id) {
            throw new Error('product not exist');
        }
        return product;
    }

    async getProducts(limit: number, offset: number): Promise<Product[]> {
        const products = await this._repository.find(limit, offset);
        return products;
    }

    async getProduct(id: number): Promise<Product> {
        const product = await this._repository.findOne(id);
        return product;
    }

    async deleteProduct(id: number): Promise<Product> {
        if(id) {
            const deletedId = await this._repository.delete(id);
            return deletedId;
        } else {
            throw new Error('Product not exist');
        }
    }
}
import { injectable } from 'inversify';

import { ICatalogRepository } from "../interface/catalogRespository.interface";
import { Product } from "../models/product.model";

@injectable()
export class CatalogRepository implements ICatalogRepository  {
    create(data: Product): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    update(data: Product): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    find(limit: number, offset: number): Promise<Product[]> {
        throw new Error("Method not implemented.");
    }
    findOne(id: number): Promise<Product> {
        throw new Error("Method not implemented.");
    }
}
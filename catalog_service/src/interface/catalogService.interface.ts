import { Product } from '../models/product.model';
export interface ICatalogService {
    createProduct(data: Product): Promise<Product>;
    updateProduct(data: Product): Promise<Product>;
    getProducts(limit: number, offset: number): Promise<Product[]>;
    getProduct(id: number): Promise<Product>;
    deleteProduct(id: number): Promise<Product>;

}
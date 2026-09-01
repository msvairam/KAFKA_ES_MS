import express, {Request, Response, NextFunction} from "express";
import { Container } from 'inversify';

import { INTERFACE_TYPE } from '../utils/appConst';
import { CatalogService } from '../services/catalog.service';
import { CatalogRepository } from '../repository/catalog.repository';
import { validationRequest } from '../utils/request-validator';
import { createProductSchema, updateProductSchema } from '../dto/product.schema';
import { ProductController } from '../controllers/productController';

const router = express.Router();

const container = new Container();

container.bind(INTERFACE_TYPE.ProductController).to(ProductController);

container.bind(INTERFACE_TYPE.CatalogService).to(CatalogService);
container.bind(INTERFACE_TYPE.CatalogRepository).to(CatalogRepository);

const controller: ProductController = container.get(INTERFACE_TYPE.ProductController);

export const catalogService: CatalogService = container.get(INTERFACE_TYPE.CatalogService);
/*
export const catalogService = new CatalogService(new CatalogRepository());
const controller = new ProductController(catalogService);
*/

router.post("/product",
    validationRequest(createProductSchema),
    controller.onCreateProduct.bind(controller),
);

router.patch("/product/:id",
    validationRequest(updateProductSchema),
    controller.onUpdateProduct.bind(controller),
);

router.get("/product",
    controller.onGetProducts.bind(controller),
);

router.get("/product/:id",
    controller.onGetProduct.bind(controller),
);

router.delete('/product/:id',
  controller.onDeleteProduct.bind(controller),
);

export default router;
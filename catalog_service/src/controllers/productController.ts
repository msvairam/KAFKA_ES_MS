import { injectable, inject } from "inversify";

import { INTERFACE_TYPE } from '../utils/appConst';
import { ICatalogService } from "../interface/catalogService.interface";
import { Request, Response, NextFunction } from "express";

@injectable()
export class ProductController {
  catalogService: ICatalogService;
  constructor(
    @inject(INTERFACE_TYPE.CatalogService) catalogService: ICatalogService) {
    this.catalogService = catalogService;
  }

  async onCreateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const responseBody = await this.catalogService.createProduct(req.body);
      return res.status(201).json(responseBody);
    } catch (e) {
      const err = e as Error;
      return res.status(500).json(err.message);
    }
  }

  async onUpdateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params["id"] || 0;

      const responseBody = await this.catalogService.updateProduct({
        id,
        ...req.body,
      });
      return res.status(201).json(responseBody);
    } catch (e) {
      const err = e as Error;
      return res.status(500).json(err.message);
    }
  }

  async onGetProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const offset = Number(req.query['offset']); 
      const limit = Number(req.query['limit']);
      const responseBody = await this.catalogService.getProducts(limit, offset);
      return res.status(200).json(responseBody);
    } catch(e) {
      const err = e as Error;
      return res.status(500).json(err.message);
    }
  }

  async onGetProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params["id"]);
      const responseBody = await this.catalogService.getProduct(id);
      return res.status(200).json(responseBody);
    } catch (e) {
      const err = e as Error;
      return res.status(500).json(err.message);
    }
  }

  async onDeleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params["id"] || 0);

      const responseBody = await this.catalogService.deleteProduct(id);
      res.status(200).json(responseBody);
    } catch (e) {
      const err = e as Error;
      res.status(500).json(err.message);
    }
  }
}

import express from "express";
import request from "supertest";
import CatalogRoutes from "../catalog.routes";
import { productFactory } from "../../utils/fixtures/products";
import { catalogService } from "../catalog.routes";

const app = express();
app.use(express.json());
app.use(CatalogRoutes);

describe("Catalog Services", () => {
  describe("Catalog create product validation", () => {
    test("should be create product", async () => {
      jest
        .spyOn(catalogService, "createProduct")
        .mockImplementationOnce(() => Promise.resolve(productFactory.build));

      const response = await request(app)
        .post("/product")
        .send(productFactory.build)
        .set("Accept", "application/json");

      expect(response.status).toBe(201);
      expect(response.body).toEqual(productFactory.build);
    });

    test("should be create product provide error 400", async () => {
      const response = await request(app)
        .post("/product")
        .send({ ...productFactory.build, name: "" })
        .set("Accept", "application/json");
      expect(response.status).toBe(400);
      expect(response.body.errors).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            field: "name",
            message: "Too small: expected string to have >=5 characters",
          }),
        ]),
      );
    });

    test("should response with an internal error code 500", async () => {
      jest
        .spyOn(catalogService, "createProduct")
        .mockImplementationOnce(() =>
          Promise.reject(new Error("Unable to create product")),
        );

      const response = await request(app)
        .post("/product")
        .send(productFactory.build)
        .set("Accept", "application/json");

      expect(response.status).toBe(500);
      expect(response.body).toEqual("Unable to create product");
    });
  });

  describe("PATCH /products/:id", () => {
    test("should be product update", async () => {
      const product = productFactory.build;
      const requestProduct = {
        name: product.name,
        price: product.price,
        stock: product.stock,
      };

      jest
        .spyOn(catalogService, "updateProduct")
        .mockImplementationOnce(() => Promise.resolve(product));

      const response = await request(app)
        .patch(`/product/${product.id}`)
        .send(requestProduct)
        .set("Accept", "application/json");

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(product);
    });

    test("should be validate Error 400", async () => {
      const product = productFactory.build;
      const requestProduct = {
        name: product.name,
        price: product.price,
        stock: -1,
      };
      const response = await request(app)
        .patch(`/product/${product.id}`)
        .send(requestProduct)
        .set("Accept", "application/json");
      expect(response.status).toBe(400);
      expect(response.body.errors).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ field: 'stock', message: "field should be minimum 1" }),
        ]),
      );
    });
    
    test("should be validate Error 500", async () => {
        const productDetails = productFactory.build;
        jest
            .spyOn(catalogService, 'updateProduct')
            .mockImplementationOnce(() => Promise.reject(new Error('Unable update the product')));

        const response = await request(app)
          .patch(`/product/${productDetails.id}`)
          .send(productDetails)
          .set('Accept', 'application/json');

        expect(response.status).toBe(500);
        expect(response.body).toEqual('Unable update the product');

    })
  });

  describe("GET /product/:id", () => {
      test('should be return product by id', async () => {
          const product = productFactory.build;
          jest
            .spyOn(catalogService, 'getProduct')
            .mockImplementationOnce(() => Promise.resolve(product));
          
          const response = await request(app)
            .get(`/product/${product.id}`)
            .send(product)
            .set('Accept', 'application/json');

            expect(response.status).toBe(200);
            expect(response.body).toStrictEqual(product);
      })
  });

  describe('DELETE post/:id', () => {
    test('should be delete by id', async () => {
      const product = productFactory.build;

      jest
        .spyOn(catalogService, 'deleteProduct')
        .mockImplementationOnce(() => Promise.resolve(product));

        const response = await request(app)
          .delete(`/product/${product.id}`)
          .set('Accept', 'application/json');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(product)
    });
  })
});

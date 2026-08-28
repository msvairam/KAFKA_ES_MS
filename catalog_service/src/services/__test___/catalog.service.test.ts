import { CatalogService } from "../catalog.service";
import { MockCatalogRepository } from "../../repository/mockCatalog.repository";
import { Product } from "../../models/product.model";
import { ICatalogRepository } from "../../interface/catalogRespository.interface";
import { productFactory } from '../../utils/fixtures/products';
/*const { faker } = require('@faker-js/faker');

const mockedProduct  = (rest: any) => ({
    name: faker.commerce.productName,
    description: faker.commerce.productDescription,
    stock: faker.number,
    ...rest,
});*/

const mockedProduct = (rest: any) => ({
  name: "Product Name",
  description: "Product Description",
  stock: 10,
  ...rest,
});

describe("Create Product", () => {
  let repository: ICatalogRepository;

  beforeEach(() => {
    repository = new MockCatalogRepository();
  });

  afterEach(() => {
    repository = {} as MockCatalogRepository;
  });

  test("should be create product", async () => {
    const catalogService = new CatalogService(repository);
    // const reqBody = mockedProduct({price: +faker.commerce.price});
    const reqBody = mockedProduct({ price: 234 });
    const result = await catalogService.createProduct(reqBody);
    expect(result).toMatchObject({
      id: expect.any(Number),
      name: expect.any(String),
      description: expect.any(String),
      stock: expect.any(Number),
      price: expect.any(Number),
    });
  });

  test("should throw error with unable to create product", async () => {
    const catalogService = new CatalogService(repository);
    jest
      .spyOn(repository, "create")
      .mockImplementationOnce(() => Promise.resolve({} as Product));
    const reqBody = mockedProduct({ price: 234 });

    await expect(catalogService.createProduct(reqBody)).rejects.toThrow(
      "Unable to create product, Please try again",
    );
  });

  test("should throw error with product already exist", async () => {
    const catalogService = new CatalogService(repository);

    jest
      .spyOn(repository, "create")
      .mockImplementationOnce(() =>
        Promise.reject(new Error("Product already exist")),
      );
    const reqBody = mockedProduct({ price: 234 });
    await expect(catalogService.createProduct(reqBody)).rejects.toThrow(
      "Product already exist",
    );
  });
});

describe("Update Product", () => {
    let repository: ICatalogRepository;

    beforeEach(() => {
        repository = new MockCatalogRepository();
    });

    afterEach(() => {
        repository = {} as ICatalogRepository;
    });

    test('update the product', async () => {
        const catalogService = new CatalogService(repository);

        const reqBody = mockedProduct({price: 50, id: 123});
        const result = await catalogService.updateProduct(reqBody);
        expect(result).toStrictEqual(reqBody);
    });

    test("should throw error with product does not exist", async () => {
        const catalogService = new CatalogService(repository);

        jest
            .spyOn(repository, 'update')
            .mockImplementationOnce(() => Promise.reject(new Error('product not exist')));
        await expect(catalogService.updateProduct({} as Product)).rejects.toThrow('product not exist')
    });
});

describe("Get Products", () => {
  let repository: ICatalogRepository;
  
  beforeEach(() => {
    repository = new MockCatalogRepository();
  });

  afterEach(() => {
    repository = {} as ICatalogRepository;
  });

   test("should get products by offset and limit", async () => {
      const catalogService = new CatalogService(repository);

      const result = await catalogService.getProducts(1, 3);

      expect(result).toStrictEqual(productFactory.buildList);
  });

    test("should throw error with products does not exist", async () => {
      const service = new CatalogService(repository);

      jest
        .spyOn(repository, 'find')
        .mockImplementationOnce(() => Promise.reject(new Error('products not exist')));

        await expect(service.getProducts(3,4)).rejects.toThrow('products not exist');
    });
});

describe("Get Product", () => {
  let repository: ICatalogRepository;
  
  beforeEach(() => {
    repository = new MockCatalogRepository();
  });

  test('should get product' , async () => {
    const catalogService = new CatalogService(repository);
    const result = await catalogService.getProduct(123);
    expect(result).toMatchObject(productFactory.build);
  });

  test('should throw error product', async () => {
    const catalogService = new CatalogService(repository);

    jest
      .spyOn(repository, 'findOne')
      .mockImplementationOnce(() => Promise.reject(new Error('Unable to fetch product')));

      await expect(catalogService.getProduct(234)).rejects.toThrow('Unable to fetch product');
  });

  test('should deleted product', async () => {
    const catalogService = new CatalogService(repository);
    const result = await catalogService.deleteProduct(23);

    expect(result).toEqual({id: 23});
  })

  afterEach(() => {
    repository = {} as ICatalogRepository;
  });
})

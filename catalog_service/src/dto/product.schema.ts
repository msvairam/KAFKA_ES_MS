import { z } from 'zod';

const stockSchema =  z.number().min(1, 'field should be minimum 1');
const priceSchema = z.number().min(1, 'field should be minimum 1');

export const createProductSchema = {
    body: z.object({
        name: z.string().min(5),
        description: z.string(),
        price: priceSchema,
        stock: stockSchema,
    })
};

export const updateProductSchema = {
    body: z.object({
        name: z.string().min(5),
        description: z.string().optional(),
        price: priceSchema,
        stock: stockSchema
    })
}
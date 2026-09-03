import { CartRepositoryType } from '../types/repository.type';

const createCart = async (input: any): Promise<{}> => {
    return Promise.resolve({mesasge: 'created Cart', input});
}

const findCart = async (input: any): Promise<{}> => {
    return Promise.resolve({mesasge: 'finded Cart'});
}

const updateCart = async (input: any): Promise<{}> => {
    return Promise.resolve({mesasge: 'created Cart'});
}

const deleteCart = async (input: any): Promise<{}> => {
    return Promise.resolve({mesasge: 'created Cart'});
}

export const cartRepository: CartRepositoryType  = {
    create: createCart,
    find: findCart,
    update: updateCart,
    delete: deleteCart,
}
// @flow

export type stuffItem = {
    image: string,
    name: string,
    price: number,
    id: number
};

export type cartItem = {
    stuff: stuffItem,
    quantity: number

};
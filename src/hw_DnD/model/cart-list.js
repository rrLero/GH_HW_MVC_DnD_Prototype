// @flow
import type {cartItem} from "../common/typeDef";

const cartList = {

    cartList: [],
    callbacks: [],

    get: (index: number) => {
        console.log(this);
        return cartList.cartList.filter((el: cartItem) => el.stuff.id === index)[0]
    },

    addQuantity: (index: number, quantity: number) => {
        const currentStuffInCart = cartList.get(index);
        currentStuffInCart.quantity = +currentStuffInCart.quantity + quantity;
        cartList.trigger('update');
    },

    remove: (index: number) => {
        const currentStuffInCart = cartList.get(index);
        cartList.cartList.splice(cartList.cartList.indexOf(currentStuffInCart), 1);

        cartList.trigger('remove');
    },

    add: (stuff: cartItem) => {
        cartList.cartList.push(stuff);
        cartList.trigger('add', [stuff]);
        return cartList.cartList
    },

    on: (event: string, callback: Function) => {
        cartList.callbacks.push({
            event: event,
            callback: callback
        })
    },

    trigger: (event: string, args: Array<any> = []) => {
        cartList.callbacks.forEach((item) => {
            if (item.event === event) {
                item.callback.apply(this, args)
            }
        })
    }

};

export {cartList};
// @flow

import {cartView} from "../view/cart-view";
import {cartList} from "../model/cart-list";

const cartController = () => {
    cartView('#cart-table', cartList)
};

export {cartController};
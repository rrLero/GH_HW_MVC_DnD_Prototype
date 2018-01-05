// @flow

import typeof {cartList} from "../model/cart-list";
import type {cartItem} from "../common/typeDef";

const cartView = (selector: string, cartList: cartList) => {
    const tableBody = document.querySelector(selector);
    if (tableBody) {
        const template = tableBody.querySelector('[data-item]');
        if (template && template.parentNode) {
            template.parentNode.removeChild(template);
            const add = (stuff: cartItem) => {
                const stuffElement = template.cloneNode(true);
                const price = stuffElement.querySelector('[data-price]');
                const title = stuffElement.querySelector('[data-title]');
                const quantity = stuffElement.querySelector('[data-quantity]');
                if (price && title && quantity) {
                    price.innerText = stuff.stuff.price.toString();
                    title.innerText = stuff.stuff.name;
                    quantity.innerText = stuff.quantity.toString();
                }
                stuffElement.setAttribute('data-item', stuff.stuff.id.toString());
                tableBody.appendChild(stuffElement);
                const number = stuffElement.querySelector('[data-number]');
                const button = stuffElement.querySelector('[data-delete] > button');
                if (number && button && stuffElement instanceof HTMLTableRowElement) {
                    number.innerText = stuffElement.rowIndex.toString();
                    button.addEventListener('click', (event: MouseEvent) => {
                        const target = event.target;
                        if (target instanceof HTMLElement) {
                            const closest = target.closest('[data-item]');
                            if (closest) {
                                cartList.remove(+closest.getAttribute('data-item'));
                            }
                        }
                    });
                }
            };

            const remove = () => {
                tableBody.innerHTML = '';
                cartList.cartList.forEach(add);
            };

            const update = () => {
                tableBody.innerHTML = '';
                cartList.cartList.forEach(add);
            };

            cartList.cartList.forEach(add);
            cartList.on('add', add);
            cartList.on('remove', remove);
            cartList.on('update', update);
        }
    }
};

export {cartView};
// @flow
import {cartList} from "../model/cart-list";
import {stuffList} from "../model/stuff-list";

const setTopLeftCords = (helperOffsetTop: number, helperOffsetLeft: number, event: MouseEvent, clone: HTMLElement) => {
    clone.style.left = event.pageX - helperOffsetLeft + 'px';
    clone.style.top = event.pageY - helperOffsetTop + 'px';
};

const overlaps = (rect1, rect2) => !(rect1.right < rect2.left || rect1.left > rect2.right || rect1.bottom < rect2.top || rect1.top > rect2.bottom);


const draggable = (event: MouseEvent) => {
    event.preventDefault();
    const helper = event.currentTarget;
    const clone = (helper instanceof HTMLElement) ? helper.cloneNode(true) : document.createElement('span');
    const stuff = (helper instanceof HTMLElement) ? helper.closest('[data-stuff]') : document.createElement('span');
    (stuff) ? stuff.classList.add('stuff_draggable') : '';
    const helperOffsetLeft = (helper instanceof HTMLElement) ? event.pageX - helper.offsetLeft : 0;
    const helperOffsetTop = (helper instanceof HTMLElement) ? event.pageY - helper.offsetTop : 0;
    setTopLeftCords(helperOffsetTop, helperOffsetLeft, event, clone);

    clone.classList.add('draggable');
    clone.style.width = (helper instanceof HTMLElement) ? helper.offsetWidth + 'px' : '0px';
    clone.style.height = (helper instanceof HTMLElement) ? helper.offsetHeight + 'px' : '0px';
    (document.body) ? document.body.appendChild(clone) : '';

    const carts = [...document.querySelectorAll('[data-cart]')].map((cart) => {
        const rect = {};
        rect.left = cart.offsetLeft;
        rect.top = cart.offsetTop;
        rect.right = rect.left + cart.offsetWidth;
        rect.bottom = rect.top + cart.offsetHeight;
        return {
            node: cart,
            rect: rect
        };
    });

    let prevCart;

    const mousemoveHandler = (event: MouseEvent) => {
        clone.classList.add('draggable_move');
        setTopLeftCords(helperOffsetTop, helperOffsetLeft, event, clone);

        const cart = carts.find((cart) => {
            return overlaps(cart.rect, clone.getBoundingClientRect())
        });

        if (cart && cart !== prevCart) {
            if (prevCart) {
                prevCart.node.classList.remove('overlaps');
            }
            cart.node.classList.add('overlaps');
            prevCart = cart;
        }
        if (!cart && prevCart) {
            prevCart.node.classList.remove('overlaps');
            prevCart = null;
        }
    };
    (document.body) ? document.body.addEventListener('mousemove', mousemoveHandler) : '';

    const mouseupHandler = () => {
        const currentStuff = (stuff) ? stuffList[+stuff.getAttribute('data-id') - 1] : stuffList[0];
        if (prevCart) {
            if (cartList.get(currentStuff.id)) {
                cartList.addQuantity(currentStuff.id, 1)
            } else {
                cartList.add({
                    stuff: currentStuff,
                    quantity: 1
                });
            }
            prevCart.node.classList.remove('overlaps');
            prevCart = null;
        }

        (clone && clone.parentNode) ? clone.parentNode.removeChild(clone) : '';
        (stuff) ? stuff.classList.remove('stuff_draggable') : '';

        (document.body) ? document.body.removeEventListener('mousemove', mousemoveHandler) : false;
        (document.body) ? document.body.removeEventListener('mouseup', mouseupHandler) : false;
    };
    (document.body) ? document.body.addEventListener('mouseup', mouseupHandler) : false;
};

export {draggable};
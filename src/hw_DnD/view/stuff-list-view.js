// @flow

import typeof {stuffList} from "../model/stuff-list";
import {draggable} from "../common/draggable";
import type {stuffItem} from "../common/typeDef";

const stuffListView = (selector: string, stuffList: stuffList) => {
    const list = document.querySelector(selector);
    if (list) {
        const template = list.querySelector('[data-stuff]');
        if (template && template.parentNode) {
            template.parentNode.removeChild(template);
            stuffList.forEach((stuff: stuffItem) => {
                const stuffElement = template.cloneNode(true);
                const src = stuffElement.querySelector('[data-stuff-img]');
                const name = stuffElement.querySelector('[data-stuff-name]');
                const price = stuffElement.querySelector('[data-stuff-price]');
                const img = stuffElement.querySelector('[data-stuff-img]');
                if (src instanceof HTMLImageElement && name && price && img) {
                    src.src = stuff.image;
                    name.innerText = stuff.name;
                    price.innerText = stuff.price.toString();
                    img.addEventListener('mousedown', draggable);
                }
                stuffElement.setAttribute('data-id', stuff.id.toString());
                list.appendChild(stuffElement)
            })
        }
    }
};

export {stuffListView};
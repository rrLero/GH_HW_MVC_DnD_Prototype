// @flow

import {stuffList} from "../model/stuff-list";
import {stuffListView} from "../view/stuff-list-view";

const stuffController = () => {

    stuffListView('#stuff-list', stuffList);

};

export {stuffController};
import {drawSmall} from './draw.js';
import { closeError, errorServerMessage } from './util.js';

fetch('https://29.javascript.pages.academy/kekstagram/data')
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error();
  })
  .then((data) => {
    drawSmall(data);
  })
  .catch(() => {
    errorServerMessage('Не получили ответ от сервера');
    setTimeout(() => {closeError();}, 2000);
  });

export {};

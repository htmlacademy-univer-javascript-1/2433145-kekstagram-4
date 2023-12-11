import './formLogic.js';
import './photoFilters.js';
import { getData } from './api.js';
import { drawSmall } from './draw.js';
import { errorServerMessage, closeError } from './util.js';

getData()
  .then((data) => {
    drawSmall(data);
  })
  .catch(() => {
    errorServerMessage('Не получили ответ от сервера');
    setTimeout(() => {closeError();}, 2000);
  });

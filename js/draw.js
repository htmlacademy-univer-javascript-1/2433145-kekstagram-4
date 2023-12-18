import {openFullPhoto} from './openFullPhoto.js';
import {sortPhotos} from './photosSort.js';
import { debounce } from './util.js';

const RERENDER_DELAY = 500;

const pictureTemplate = document.querySelector('#picture').content;
const newPictureTemplate = pictureTemplate.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

function drawSmall (photos) {
  photos.forEach((photo) => {
    const newElem = newPictureTemplate.cloneNode(true);
    newElem.querySelector('.picture__img').src = photo.url;
    newElem.querySelector('.picture__img').alt = photo.description;
    newElem.querySelector('.picture__comments').textContent = photo.comments.length;
    newElem.querySelector('.picture__likes').textContent = photo.likes;
    picturesContainer.append(newElem);
    openFullPhoto(photo, newElem);
  });
  sortPhotos(debounce(renderNewPhotos, RERENDER_DELAY));
}

function renderNewPhotos (newPhotos) {
  newPhotos.forEach((pic) => {
    picturesContainer.appendChild(pic);
  });
}

export {drawSmall};


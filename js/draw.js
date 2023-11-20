import {createPhoto} from './generate.js';
import {openFullPhoto} from './openFullPhoto.js';

const photos = createPhoto();
const pictureTemplate = document.querySelector('#picture').content;
const newPictureTemplate = pictureTemplate.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

function drawSmall () {
  photos.forEach((photo) => {
    const newElem = newPictureTemplate.cloneNode(true);
    newElem.querySelector('.picture__img').src = photo.url;
    newElem.querySelector('.picture__img').alt = photo.description;
    newElem.querySelector('.picture__comments').textContent = photo.comments.length;
    newElem.querySelector('.picture__likes').textContent = photo.likes;
    picturesContainer.append(newElem);
    openFullPhoto(photo, newElem);
  });
}

export {drawSmall};


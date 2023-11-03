import {createPhoto} from './generate.js';

const photos = createPhoto();
const pictureTemplate = document.querySelector('#picture').content;
const newPictureTemplate = pictureTemplate.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

function drawSmall () {
  photos.forEach((photo) => {
    const newElem = newPictureTemplate.cloneNode(true);
    newElem.children[0].src = photo.url;
    newElem.children[0].alt = photo.description;
    const photoDescription = newElem.querySelector('.picture__info');
    photoDescription.children[0].textContent = photo.comments.length;
    photoDescription.children[1].textContent = photo.likes;

    picturesContainer.append(newElem);
  });
}

drawSmall();


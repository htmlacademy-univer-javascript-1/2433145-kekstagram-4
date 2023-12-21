import { closeFullPhoto, isEscapeKey } from './util.js';

const STACK_OF_COMMENTS = 5;

const bigPicture = document.querySelector('.big-picture');
const comments = bigPicture.querySelector('.social__comments');
const closeBtn = document.querySelector('.big-picture__cancel');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const loadCommentsBtn = bigPicture.querySelector('.comments-loader');
const likesCount = bigPicture.querySelector('.likes-count');
const fullImg = bigPicture.querySelector('.big-picture__img');
const commentsCount = bigPicture.querySelector('.comments-count');
const openedCount = bigPicture.querySelector('.comments-count-now');
const descriptionImg = bigPicture.querySelector('.social__caption');

function openFullPhoto (photoInfo, photo) {
  photo.addEventListener('click', () => {
    bigPicture.classList.remove('hidden');
    fullImg.querySelector('img').src = photo.querySelector('.picture__img').src;
    likesCount.textContent = photo.querySelector('.picture__likes').textContent;
    commentsCount.textContent = photo.querySelector('.picture__comments').textContent;
    openedCount.textContent = 5;
    loadComments(photoInfo);
    descriptionImg.textContent = photo.querySelector('.picture__img').alt;
    document.body.classList.add('modal-open');

    closeBtn.addEventListener('click', closeFullPhotoHandler);
    document.addEventListener('keydown', closeFullPhotoEscHandler);
    loadCommentsBtn.addEventListener('click', loadCommentsHandler);
  });
}

function loadComments(photoInfo) {
  comments.innerHTML = '';
  loadCommentsBtn.classList.remove('hidden');
  photoInfo.comments.forEach((comment) => {
    const newComment = commentTemplate.cloneNode(true);
    newComment.querySelector('.social__picture').src = comment.avatar;
    newComment.querySelector('.social__picture').alt = comment.name;
    newComment.querySelector('.social__text').textContent = comment.message;
    newComment.classList.add('hidden');
    comments.append(newComment);
  });
  if (photoInfo.comments.length < STACK_OF_COMMENTS) {
    for (let i = 0; i < photoInfo.comments.length; i++) {
      comments.children[i].classList.remove('hidden');
    }
    openedCount.textContent = photoInfo.comments.length;
    loadCommentsBtn.classList.add('hidden');
  }
  else {
    for (let i = 0; i < STACK_OF_COMMENTS; i++) {
      comments.children[i].classList.remove('hidden');
    }
  }
}

function loadCommentsHandler () {
  const needComments = +bigPicture.querySelector('.comments-count-now').textContent;
  const photosCount = +commentsCount.textContent;
  if (needComments + STACK_OF_COMMENTS < photosCount) {
    for (let i = needComments; i < needComments + STACK_OF_COMMENTS; i++) {
      comments.children[i].classList.remove('hidden');
    }
    openedCount.textContent = needComments + STACK_OF_COMMENTS;
    loadCommentsBtn.classList.remove('hidden');
  }
  else {
    for (let i = needComments; i < photosCount; i++) {
      comments.children[i].classList.remove('hidden');
    }
    openedCount.textContent = photosCount;
    loadCommentsBtn.classList.add('hidden');
  }
}

function closeFullPhotoHandler () {
  closeFullPhoto(bigPicture);
  closeBtn.removeEventListener('click', closeFullPhotoHandler);
  document.removeEventListener('keydown', closeFullPhotoEscHandler);
  loadCommentsBtn.removeEventListener('click', loadCommentsHandler);
}

function closeFullPhotoEscHandler (evt) {
  if(isEscapeKey(evt)) {
    closeFullPhoto(bigPicture);
    closeBtn.removeEventListener('click', closeFullPhotoHandler);
    document.removeEventListener('keydown', closeFullPhotoEscHandler);
    loadCommentsBtn.removeEventListener('click', loadCommentsHandler);
  }
}

export {openFullPhoto};

import { closeFullPhoto } from './util.js';

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
const stackOfComments = 5;

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
  if (photoInfo.comments.length < stackOfComments) {
    for (let i = 0; i < photoInfo.comments.length; i++) {
      comments.children[i].classList.remove('hidden');
    }
    openedCount.textContent = photoInfo.comments.length;
    loadCommentsBtn.classList.add('hidden');
  }
  else {
    for (let i = 0; i < stackOfComments; i++) {
      comments.children[i].classList.remove('hidden');
    }
  }
}

loadCommentsBtn.addEventListener('click', () => {
  const needComments = +bigPicture.querySelector('.comments-count-now').textContent;
  const photosCount = +commentsCount.textContent;
  if (needComments + stackOfComments < photosCount) {
    for (let i = needComments; i < needComments + stackOfComments; i++) {
      comments.children[i].classList.remove('hidden');
    }
    openedCount.textContent = needComments + stackOfComments;
    loadCommentsBtn.classList.remove('hidden');
  }
  else {
    for (let i = needComments; i < photosCount; i++) {
      comments.children[i].classList.remove('hidden');
    }
    openedCount.textContent = photosCount;
    loadCommentsBtn.classList.add('hidden');
  }
});

closeBtn.addEventListener('click', () => {
  closeFullPhoto(bigPicture);
});

document.addEventListener('keydown', (evt) => {
  if(evt.keyCode === 27) {
    closeFullPhoto(bigPicture);
  }
});

export {openFullPhoto};

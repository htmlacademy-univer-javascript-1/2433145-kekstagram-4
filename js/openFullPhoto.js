const bigPicture = document.querySelector('.big-picture');
const comments = bigPicture.querySelector('.social__comments');
const closeBtn = document.querySelector('.big-picture__cancel');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

function openFullPhoto (photoInfo, photo) {
  photo.addEventListener('click', () => {
    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.big-picture__img').querySelector('img').src = photo.querySelector('.picture__img').src;
    bigPicture.querySelector('.likes-count').textContent = photo.querySelector('.picture__likes').textContent;
    bigPicture.querySelector('.comments-count').textContent = photo.querySelector('.picture__comments').textContent;
    loadComments(photoInfo);
    bigPicture.querySelector('.social__caption').textContent = photo.querySelector('.picture__img').alt;
    bigPicture.querySelector('.social__comment-count').classList.add('hidden');
    bigPicture.querySelector('.comments-loader').classList.add('hidden');
    document.body.classList.add('modal-open');
  });
}

function loadComments(photoInfo) {
  comments.innerHTML = '';
  photoInfo.comments.forEach((comment) => {
    const newComment = commentTemplate.cloneNode(true);
    newComment.querySelector('.social__picture').src = comment.avatar;
    newComment.querySelector('.social__picture').alt = comment.name;
    newComment.querySelector('.social__text').textContent = comment.message;
    comments.append(newComment);
  });
}

closeBtn.addEventListener('click', () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
});

document.addEventListener('keydown', (evt) => {
  if(evt.keyCode === 27) {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
});

export {openFullPhoto};

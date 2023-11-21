import { closeFullPhoto } from './util.js';

const form = document.querySelector('.img-upload__form');
const uploadingImgInput = form.querySelector('.img-upload__input');
const closeBtn = form.querySelector('.img-upload__cancel');
const overlayImg = form.querySelector('.img-upload__overlay');
const commentsField = form.querySelector('.text__description');
const hashtagField = form.querySelector('.text__hashtags');

uploadingImgInput.addEventListener('change', () => {
  overlayImg.classList.remove('hidden');
  document.body.classList.add('modal-open');
});

closeBtn.addEventListener('click', () => {
  closeFullPhoto(overlayImg);
  uploadingImgInput.removeAttribute('wft-id');
});

document.addEventListener('keydown', (evt) => {
  if(evt.keyCode === 27) {
    const activeElement = document.activeElement.attributes.type;
    if (typeof(activeElement) === 'undefined'){
      closeFullPhoto(overlayImg);
      uploadingImgInput.removeAttribute('wft-id');
    }
    else {
      if (activeElement.value === 'text') {
        evt.stopPropagation();
      }
      else {
        closeFullPhoto(overlayImg);
        uploadingImgInput.removeAttribute('wft-id');
      }
    }
  }
});

const hashtag = /^#[a-zа-яё0-9]{1,19}$/i;
const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper'
}, true);

function validateComment (value) {
  return value.length <= 140;
}
pristine.addValidator(commentsField, validateComment, 'Комментарий до 140 символов');

function validateHashtag (value) {
  let res = true;
  if (value === ''){
    res = true;
  }
  else {
    value.trim();
    const arr = value.split(' ');
    const tempArr = [];
    if (arr.length > 5) {
      res = false;
    }
    for (let i = 0; i < arr.length; i++){
      if(hashtag.test(arr[i]) === false){
        res = false;
      }
      if(tempArr.includes(arr[i])){
        res = false;
      }
      else {
        tempArr.push(arr[i]);
      }
    }
  }
  return res;
}
pristine.addValidator(hashtagField, validateHashtag, 'Ошибка');

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    closeFullPhoto(overlayImg);
  }
});

// commentsField.addEventListener('focus', (evt) => {
//   console.log('ok');
//   evt.stopPropagation();
// });

// hashtagField.addEventListener('focus', (evt) => {
//   evt.stopPropagation();
// });


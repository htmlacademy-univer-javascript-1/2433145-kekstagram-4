import { closeFullPhoto, isEscapeKey, blockButton, unblockButton, sendSuccessMessage, sendErrorMessage } from './util.js';
import { resetFilters } from './util.js';
import { sendData } from './api.js';

const form = document.querySelector('.img-upload__form');
const uploadingImgInput = form.querySelector('.img-upload__input');
const closeBtn = form.querySelector('.img-upload__cancel');
const overlayImg = form.querySelector('.img-upload__overlay');
const commentsField = form.querySelector('.text__description');
const hashtagField = form.querySelector('.text__hashtags');
const containerPreview = document.querySelector('.img-upload__preview');
const imgPreview = containerPreview.querySelector('img');
const sliderContainer = document.querySelector('.effect-level__slider');
const HASHTAGCOUNT = 5;
const MAXLENGTH = 140;

uploadingImgInput.addEventListener('change', () => {
  overlayImg.classList.remove('hidden');
  document.body.classList.add('modal-open');
});

closeBtn.addEventListener('click', () => {
  closeFullPhoto(overlayImg);
  uploadingImgInput.value = '';
  resetFilters (imgPreview, sliderContainer);
});

document.addEventListener('keydown', (evt) => {
  if(isEscapeKey(evt)) {
    const activeElement = document.activeElement.attributes.type;
    if (typeof(activeElement) === 'undefined'){
      closeFullPhoto(overlayImg);
      uploadingImgInput.value = '';
    }
    else {
      if (activeElement.value === 'text') {
        evt.stopPropagation();
      }
      else {
        closeFullPhoto(overlayImg);
        uploadingImgInput.value = '';
      }
    }
  }
});

const hashtag = /^#[a-zа-яё0-9]{1,19}$/i;
const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
}, true);

function validateComment (value) {
  return value.length <= MAXLENGTH;
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
    if (arr.length > HASHTAGCOUNT) {
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

function getErrorMessage() {
  let errorMessage = '';
  const arr = hashtagField.value.toLowerCase().trim().split(/\s+/);
  const tempArr = [];
  if (arr.length > HASHTAGCOUNT) {
    errorMessage = 'Можно указать максимум 5 хэштегов';
  }
  for (let i = 0; i < arr.length; i++){
    if(hashtag.test(arr[i]) === false){
      errorMessage = 'Хэштег должен начинаться с решетки, не иметь заглавных букв и быть не более 20 символов';
    }
    if(tempArr.includes(arr[i])){
      errorMessage = 'Хэштеги не могут повторяться';
    }
    else {
      tempArr.push(arr[i]);
    }
  }
  return errorMessage;
}

pristine.addValidator(hashtagField, validateHashtag, getErrorMessage);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    blockButton();
    sendData(new FormData(evt.target))
      .then((response) => {
        if(response.ok) {
          sendSuccessMessage();
          resetFilters(imgPreview, sliderContainer);
          return response.json();
        }
        throw new Error();
      })
      .catch(() => {
        uploadingImgInput.value = '';
        sendErrorMessage();
      })
      .finally(unblockButton());
    closeFullPhoto(overlayImg);
  }
});

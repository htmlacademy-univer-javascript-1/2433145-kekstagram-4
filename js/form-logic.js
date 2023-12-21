import { closeFullPhoto, isEscapeKey, blockButton, unblockButton, sendSuccessMessage, sendErrorMessage } from './util.js';
import { resetFilters } from './util.js';
import { sendData } from './api.js';

const HASHTAG_COUNT = 5;
const MAX_LENGTH = 140;
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const form = document.querySelector('.img-upload__form');
const uploadingImgInput = form.querySelector('.img-upload__input');
const closeBtn = form.querySelector('.img-upload__cancel');
const overlayImg = form.querySelector('.img-upload__overlay');
const commentsField = form.querySelector('.text__description');
const hashtagField = form.querySelector('.text__hashtags');
const containerPreview = document.querySelector('.img-upload__preview');
const imgPreview = containerPreview.querySelector('img');
const sliderContainer = document.querySelector('.effect-level__slider');
const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');

const resetCloseByEscape = (evt) => evt.stopPropagation();

const closeForm = () => {
  overlayImg.classList.add('hidden');
  document.body.classList.remove('modal-open');

  form.removeEventListener('submit', formHandler);
  closeBtn.removeEventListener('click', closeForm);
  document.removeEventListener('keydown', closeFormByEscape);
  hashtagInput.removeEventListener('keydown', resetCloseByEscape);
  commentInput.removeEventListener('keydown', resetCloseByEscape);

  resetFilters(imgPreview, sliderContainer);
};

function closeFormByEscape (evt) {
  if (isEscapeKey(evt)) {
    closeForm();
  }
}

uploadingImgInput.addEventListener('change', () => {
  overlayImg.classList.remove('hidden');
  document.body.classList.add('modal-open');

  form.addEventListener('submit', formHandler);
  closeBtn.addEventListener('click', closeForm);
  document.addEventListener('keydown', closeFormByEscape);
  hashtagInput.addEventListener('keydown', resetCloseByEscape);
  commentInput.addEventListener('keydown', resetCloseByEscape);
});

const hashtag = /^#[a-zа-яё0-9]{1,19}$/i;
const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
}, true);

function validateComment (value) {
  return value.length <= MAX_LENGTH;
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
    if (arr.length > HASHTAG_COUNT) {
      res = false;
    }
    for (let i = 0; i < arr.length; i++){
      if(hashtag.test(arr[i]) === false || tempArr.includes(arr[i].toLowerCase())){
        res = false;
      }
      else {
        tempArr.push(arr[i].toLowerCase());
      }
    }
  }
  return res;
}

function getErrorMessage() {
  let errorMessage = '';
  const arr = hashtagField.value.toLowerCase().trim().split(/\s+/);
  const tempArr = [];
  if (arr.length > HASHTAG_COUNT) {
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

function formHandler (evt) {
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
}

uploadingImgInput.addEventListener('change', uploadFileHandler);

function uploadFileHandler() {
  const file = uploadingImgInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((extention) => fileName.endsWith(extention));

  if (matches) {
    imgPreview.src = URL.createObjectURL(file);
  }
}

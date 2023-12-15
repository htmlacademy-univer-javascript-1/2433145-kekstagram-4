function getRandomNumber (max, min){
  return Math.round(Math.random() * (+max - +min + 1) + min);
}

function getUniqRandomNumber (max, min, arr) {
  let current = Math.random() * (+max - +min + 1) + min;
  while (arr.includes(current)){
    current = Math.random() * (+max - +min + 1) + min;
  }
  arr.push(current);
  return Math.round(current);
}

function closeFullPhoto(openedWindow) {
  openedWindow.classList.add('hidden');
  document.body.classList.remove('modal-open');
}

function isEscapeKey(evt){
  if(evt.keyCode === 27){
    return true;
  }
  else {
    return false;
  }
}

function resetFilters (imgPreview, sliderContainer) {
  const scaleInput = document.querySelector('.scale__control--value');
  const form = document.querySelector('.img-upload__form');
  const uploadingImgInput = form.querySelector('.img-upload__input');
  const commentsField = form.querySelector('.text__description');
  const hashtagField = form.querySelector('.text__hashtags');
  const filterOrigin = document.querySelector('.effects__item');

  sliderContainer.noUiSlider.updateOptions({
    start: 1,
    connect: 'lower',
    step: 0.1,
    range: {
      'min': 0,
      'max': 1
    }
  });
  imgPreview.style.removeProperty('transform');
  imgPreview.style.removeProperty('filter');
  scaleInput.value = '100%';
  uploadingImgInput.value = '';
  commentsField.value ='';
  hashtagField.value = '';
  filterOrigin.querySelector('.effects__radio').checked = 'true';
  sliderContainer.parentNode.classList.add('hidden');
}

function errorServerMessage (text) {
  const errorBlock = document.querySelector('#serverError').content.querySelector('.error');
  errorBlock.classList.add('serverError');
  const errorText = errorBlock.querySelector('h2');
  errorText.textContent = text;
  document.body.append(errorBlock);
}

function closeError () {
  const errorBlock = document.querySelector('.serverError');
  errorBlock.classList.add('hidden');
}

function blockButton() {
  const button = document.querySelector('.img-upload__submit');
  button.textContent = 'В публикации...';
  button.disabled = 'true';
}

function unblockButton() {
  const button = document.querySelector('.img-upload__submit');
  button.textContent = 'Опубликовать';
  button.removeAttribute('disabled');
}

const successMsg = document.querySelector('#success').content.querySelector('.success');
const newSuccessMsg = successMsg.cloneNode(true);
const successBtn = newSuccessMsg.querySelector('.success__button');
const errorMsg = document.querySelector('#error').content.querySelector('.error');
const newErrorMsg = errorMsg.cloneNode(true);
const errorBtn = newErrorMsg.querySelector('.error__button');

function sendSuccessMessage() {
  document.body.append(newSuccessMsg);

  successBtn.addEventListener('click', clickBtnHandler);
  document.addEventListener('keydown', escOnMsgHandler);
  document.addEventListener('click', outOfSpaceHandler);
}

function outOfSpaceHandler (evt) {
  const emptySpaceSuccess = newSuccessMsg.querySelector('.success__inner');
  const emptySpaceError = newErrorMsg.querySelector('.error__inner');
  if (!emptySpaceSuccess.contains(evt.target) || !emptySpaceError.contains(evt.target)){
    closeMessage(newSuccessMsg);
    closeMessage(newErrorMsg);
  }
}

function escOnMsgHandler (evt) {
  if(isEscapeKey(evt)) {
    closeMessage(newSuccessMsg);
    closeMessage(newErrorMsg);
  }
}

function clickBtnHandler () {
  closeMessage(newSuccessMsg);
  closeMessage(newErrorMsg);
}

function closeMessage (newMsg) {
  newMsg.remove();
  document.removeEventListener('click', outOfSpaceHandler);
  document.removeEventListener('keydown', escOnMsgHandler);
  successBtn.removeEventListener('click', clickBtnHandler);
  errorBtn.removeEventListener('click', clickBtnHandler);
}

function sendErrorMessage () {
  document.body.append(newErrorMsg);

  errorBtn.addEventListener('click', clickBtnHandler);
  document.addEventListener('keydown', escOnMsgHandler);
  document.addEventListener('click', outOfSpaceHandler);
}

const debounce = (callback, timeoutDelay) => {
  let timeoutID;
  return (...rest) => {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {getRandomNumber, getUniqRandomNumber, closeFullPhoto, isEscapeKey, resetFilters, errorServerMessage, closeError, blockButton, unblockButton, sendSuccessMessage, sendErrorMessage, debounce};

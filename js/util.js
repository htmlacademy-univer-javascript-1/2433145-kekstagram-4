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

function sendSuccessMessage() {
  const successMsg = document.querySelector('#success').content.querySelector('.success');
  const newSuccessMsg = successMsg.cloneNode(true);
  document.body.append(newSuccessMsg);
  const successBtn = newSuccessMsg.querySelector('.success__button');

  successBtn.addEventListener('click', () => {
    newSuccessMsg.remove();
  });

  document.addEventListener('keydown', (evt) => {
    if(isEscapeKey(evt)) {
      newSuccessMsg.remove();
    }
  });

  document.addEventListener('click', (evt) => {
    const emptySpace = newSuccessMsg.querySelector('.success__inner');
    if (!emptySpace.contains(evt.target)){
      newSuccessMsg.remove();
    }
  });
}

function sendErrorMessage () {
  const errorMsg = document.querySelector('#error').content.querySelector('.error');
  const newErrorMsg = errorMsg.cloneNode(true);
  document.body.append(newErrorMsg);
  const errorBtn = newErrorMsg.querySelector('.error__button');

  errorBtn.addEventListener('click', () => {
    newErrorMsg.remove();
  });

  document.addEventListener('keydown', (evt) => {
    if(isEscapeKey(evt)) {
      newErrorMsg.remove();
    }
  });

  document.addEventListener('click', (evt) => {
    const emptySpace = newErrorMsg.querySelector('.error__inner');
    if (!emptySpace.contains(evt.target)){
      newErrorMsg.remove();
    }
  });
}

export {getRandomNumber, getUniqRandomNumber, closeFullPhoto, isEscapeKey, resetFilters, errorServerMessage, closeError, blockButton, unblockButton, sendSuccessMessage, sendErrorMessage};

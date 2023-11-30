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
  sliderContainer.parentNode.classList.add('hidden');
}

export {getRandomNumber, getUniqRandomNumber, closeFullPhoto, isEscapeKey, resetFilters};
